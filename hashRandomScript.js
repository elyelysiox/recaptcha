function A18(U, b) {
  let result = "";

  for (const c of b) {
    let hex = c.toString(16);

    if (hex.length <= U) {
      hex = "0" + hex;
    }

    result += hex;
  }

  return result;
}

function randNum(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

async function StringToSha256(data) {
  const bytes = [];

  for (const char of data) {
    let v = char.codePointAt(0);

    if (v > 255) {
      v = v % 256;
    }

    bytes.push(v);
  }

  const buffer = new Uint8Array(bytes);

  const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);

  const hashBytes = new Uint8Array(hashBuffer);
  return A18(1, hashBytes).substring(0, 8);
}

function computeString(input) {
  let out = "";
  let inQuote = false;
  let quoteChar = "";

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    if (!inQuote) {
      if (c === '"' || c === "'") {
        inQuote = true;
        quoteChar = c;
        continue;
      }

      out += c;
    } else {
      if (c === "\\" && i + 1 < input.length) {
        i++;
        continue;
      }

      if (c === quoteChar) {
        inQuote = false;
      }
    }
  }

  let filtered = "";

  for (let i = 0; i < out.length; i++) {
    const c = out[i];

    if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
      filtered += c;
    }
  }

  return filtered;
}
let i = [21, 125, 63, 73, 95, 87, 41, 43, 42, 83, 102, 105, 109, 121]];
//let i = [16, 21, 125, 63, 73, 95, 87, 41, 43, 42, 83, 102, 105, 109, 121];


const index = randNum(0, document.scripts.length);
const scriptText = computeString(document.scripts[index].text);
let finalValue = `${index},`;

if (i.includes(16)) {
  const hashed = await StringToSha256(scriptText);
  finalValue += hashed + `,${scriptText}`;
} else {
  const hashed = await StringToSha256(scriptText);
  finalValue += hashed;
}
console.log(finalValue);
