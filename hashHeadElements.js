const RECAPTCHA_VERSION = "Br0hYqpfWeFzYCAXLD4UuCIV";

function normalizeModulo(inputValue, moduloBase) {
  let computed = inputValue % moduloBase;

  if (computed < 0) {
    computed += moduloBase;
  }

  return computed;
}

function toSigned32bit(n) {
  n = n >>> 0;

  if (n >= 0x80000000) n -= 0x100000000;
  return n;
}

function hashString(data, numAt = 0) {
  for (let i = 0; i < data.length; i++) {
    const codeAt = data.charCodeAt(i);
    numAt = toSigned32bit(((numAt << 5) - numAt + codeAt) >>> 0);
  }
  return numAt;
}

function countDomElements(rootNode) {
  let amount = 0;

  if (rootNode.nodeType === Node.ELEMENT_NODE) {
    amount++;
  }

  for (
    let nestedNode = rootNode.firstChild;
    nestedNode;
    nestedNode = nestedNode.nextSibling
  ) {
    amount += countDomElements(nestedNode);
  }

  return amount;
}

function serializeStructure(modeFlag, suffixToken, payload) {
  let encoded = "";

  if (Array.isArray(payload)) {
    for (let position = 0; position < payload.length; position++) {
      encoded +=
        "[object:" +
        position +
        serializeStructure(16, "]", payload[position]) +
        suffixToken;
    }
  } else if (typeof payload === "string") {
    encoded += "[string:" + payload + suffixToken;
  } else {
    encoded += "[unknown:" + String(payload) + suffixToken;
  }

  return encoded.replace(/ /g, "").replace(/\n/g, "");
}

class PayloadContainer {
  constructor() {
    this.values = [];
  }
}

function appendPayload(limitSize, bucket, value) {
  if (bucket.values.length >= limitSize) {
    const compressed = hashString(serializeStructure(17, "]", bucket.values));

    bucket.values = [String(compressed)];
  }

  bucket.values.push(value);
}

class BitHash {
  constructor(totalBits, hashRounds, maxChanges) {
    this.capacity = totalBits;
    this.segmentCount = Math.floor(totalBits / 6);
    this.grid = [];
    this.iterations = hashRounds;
    this.remainingChanges = maxChanges;

    for (let rowIndex = 0; rowIndex < this.segmentCount; rowIndex++) {
      this.grid[rowIndex] = [0, 0, 0, 0, 0, 0];
    }
  }

  add(hashSource) {
    if (this.remainingChanges <= 0) {
      return false;
    }

    let stateModified = false;

    for (let cycle = 0; cycle < this.iterations; cycle++) {
      const currentHash = hashString(hashSource);

      const wrappedIndex = normalizeModulo(currentHash, this.capacity);

      const gridRow = Math.floor(wrappedIndex / 6);
      const gridColumn = wrappedIndex % 6;

      if (this.grid[gridRow][gridColumn] === 0) {
        this.grid[gridRow][gridColumn] = 1;
        stateModified = true;
      }

      hashSource = String(currentHash);
    }

    if (stateModified) {
      this.remainingChanges--;
    }

    return true;
  }

  toString() {
    const alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    let finalBuffer = "";

    for (let rowIndex = 0; rowIndex < this.segmentCount; rowIndex++) {
      const binaryRow = this.grid[rowIndex];

      let decimalValue = 0;

      for (let bitIndex = binaryRow.length - 1; bitIndex >= 0; bitIndex--) {
        decimalValue = decimalValue * 2 + binaryRow[bitIndex];
      }

      finalBuffer += alphabet[decimalValue];
    }

    return finalBuffer;
  }
}

function shouldIncludeNode(candidateNode, releaseToken) {
  if (!candidateNode || candidateNode.nodeType === Node.TEXT_NODE) {
    return false;
  }

  const subtreeMarkup = candidateNode.innerHTML || "";

  if (subtreeMarkup !== "") {
    const blockedPatterns = ["uib-"];

    for (const forbidden of blockedPatterns) {
      if (subtreeMarkup.indexOf(forbidden) !== -1) {
        return false;
      }
    }
  }

  if (candidateNode.nodeType === Node.ELEMENT_NODE) {
    const sourceAttribute = candidateNode.getAttribute?.("src");

    if (sourceAttribute) {
      const blockedExpression = new RegExp(
        "^https://www\\.gstatic\\.c..?/recaptcha/releases/" +
          releaseToken +
          "/recaptcha_*",
      );

      if (blockedExpression.test(sourceAttribute)) {
        return false;
      }
    }
  }

  return true;
}

function collectTargetNodes(traversalRoot, filterCallback, releaseToken) {
  const discoveredNodes = [];

  function recursiveWalk(currentNode) {
    for (
      let nestedNode = currentNode.firstChild;
      nestedNode;
      nestedNode = nestedNode.nextSibling
    ) {
      if (filterCallback(nestedNode, releaseToken)) {
        discoveredNodes.push(nestedNode);
      }

      recursiveWalk(nestedNode);
    }
  }

  recursiveWalk(traversalRoot);

  return discoveredNodes;
}

function extractNodeSignature(
  ignoredTag,
  textNodeType,
  includeAttributes,
  activeNode,
  collector,
) {
  if (includeAttributes) {
    if (activeNode.nodeType === Node.ELEMENT_NODE) {
      const normalizedTag = activeNode.tagName.toUpperCase();

      appendPayload(100, collector, normalizedTag);

      if (normalizedTag !== ignoredTag) {
        for (const attribute of activeNode.attributes) {
          appendPayload(100, collector, attribute.name + ":" + attribute.value);
        }
      }
    }
  }

  if (activeNode.nodeType === Node.TEXT_NODE) {
    if (activeNode.textContent !== "") {
      appendPayload(100, collector, activeNode.textContent);
    }
  }

  if (activeNode.nodeType === Node.ELEMENT_NODE) {
    for (
      let nestedNode = activeNode.firstChild;
      nestedNode;
      nestedNode = nestedNode.nextSibling
    ) {
      extractNodeSignature(
        "INPUT",
        3,
        includeAttributes,
        nestedNode,
        collector,
      );
    }
  }
}

function hashHeadElements(releaseVersion = CAPTCHA_RELEASE) {
  const documentHead = document.head;

  if (!documentHead) {
    return "";
  }

  const filteredNodes = collectTargetNodes(
    documentHead,
    shouldIncludeNode,
    releaseVersion,
  );

  const bitHasher = new BitHash(240, 7, 25);

  for (let pointer = 0; pointer < filteredNodes.length; pointer++) {
    const payloadStore = new PayloadContainer();

    extractNodeSignature(
      "INPUT",
      3,
      true,
      filteredNodes[pointer],
      payloadStore,
    );

    const digest = hashString(serializeStructure(25, "]", payloadStore.values));

    bitHasher.add(String(digest));
  }

  return bitHasher.toString();
}

let hashed = hashHeadElements(RECAPTCHA_VERSION);
console.log(hashed);
