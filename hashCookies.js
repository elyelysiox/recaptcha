(function () {
  const cookies = [
    "NEXT_LOCALE",
    "_ga",
    "_clck",
    "twk_idm_key",
    "_ga_ZLYCL8WM6K",
    "_clsk",
    "TawkConnectionTime",
    "twk_uuid_66cea58aea492f34bc0ad19d",
  ];

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

  function createFilledArray(value, size) {
    return Array(size).fill(value);
  }

  function sliceFrom(start, array) {
    if (array.length > start) {
      return array.slice(start);
    }

    return [];
  }

  class BinaryGridHasher {
    constructor(rounds = 2, bitSize = 60, maxEntries = 20) {
      this.remainingEntries = maxEntries;
      this.hashRounds = rounds;
      this.totalBits = bitSize;

      this.rowCount = Math.floor(this.totalBits / 6);

      this.bitGrid = [];

      for (let row = 0; row < this.rowCount; row++) {
        this.bitGrid.push(createFilledArray(0, 6));
      }
    }

    toString() {
      let encoded = "";

      const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

      for (let row = 0; row < this.rowCount; row++) {
        let bits = sliceFrom(0, this.bitGrid[row]);

        bits = [...bits].reverse();

        const binaryString = bits.join("");

        const alphabetIndex = parseInt(binaryString, 2);

        if (alphabetIndex < alphabet.length) {
          encoded += alphabet[alphabetIndex];
        }
      }

      return encoded;
    }

    add(input) {
      if (this.remainingEntries <= 0) {
        return false;
      }

      let changed = false;

      for (let round = 0; round < this.hashRounds; round++) {
        const fingerprint = hashString(input, 0);

        const safeIndex =
          ((fingerprint % this.totalBits) + this.totalBits) % this.totalBits;

        const rowIndex = Math.floor(safeIndex / 6);
        const columnIndex = safeIndex % 6;

        if (this.bitGrid[rowIndex][columnIndex] === 0) {
          this.bitGrid[rowIndex][columnIndex] = 1;
          changed = true;
        }

        input = String(fingerprint);
      }

      if (changed) {
        this.remainingEntries--;
      }

      return true;
    }
  }

  let hasher = new BinaryGridHasher();

  for (let i = 0; i < cookies.length; i++) {
    hasher.add(cookies[i]);
  }

  let hashed = hasher.toString();
  console.log(hashed);
})();
