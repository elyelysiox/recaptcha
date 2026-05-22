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

function hashBrowserPrototypes() {
  if (1 === 1) {
    const r1882 = window["Array"]();

    // 0x69400..0x69455: r1999 -> "Object"; r1999 = GET WINDOW PROP "Object"
    const r1999 = window["Object"];

    const r1961 = "getOwnPropertyNames";
    const r1072 = "prototype";
    const r1843 = "push";
    let r1426 = null;

    const checks = [
      ["SpeechSynthesisEvent", 1],
      ["NetworkInformation", 8],
      ["HTMLElement", 125],
      ["SpeechSynthesisUtterance", 0],
      ["SpeechSynthesisErrorEvent", 0],
      ["MediaMetadata", 3],
      ["HTMLMediaElement", 46],
      ["SpeechSynthesisUtterance", 10],
      ["RemotePlayback", 1],
      ["AuthenticatorAttestationResponse", 5],
      ["HTMLMediaElement", 45],
      ["PushManager", 0],
      ["PushSubscription", 2],
      ["SpeechSynthesisErrorEvent", 1],
      ["navigator", 38],
      ["HTMLMediaElement", 48],
      ["USBIsochronousOutTransferResult", 0],
    ];

    for (let i = 0; i < checks.length; i++) {
      const [typeName, pickIndex] = checks[i];

      const r899 = window[typeName];


      const r638 = r899[r1072];

      if (r638 == r1426 || r638 === undefined) {
        r1882[r1843](0);
      }

      let r2035;
      try {
        // Object.getOwnPropertyNames(r638)
        r2035 = r1999[r1961](r638);
      } catch {
        r1882;
        continue;
      }

      const r1712 = r2035[pickIndex];
      console.log(r1712);

      if (r1712 == r1426 || r1712 === undefined) {
        r1882[r1843](0);
        continue;
      }

      const hashed = hashString(String(r1712));
      console.log(hashed);

      // CALL METHOD ..., r1882, "push" args:[hashed]
      r1882[r1843](hashed);
    }

    return r1882;
  }

  return [];
}

const result = hashBrowserPrototypes();
console.log("result:", result);
