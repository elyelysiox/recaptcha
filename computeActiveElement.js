async function HashToSha256(data) {
  const encoder = new TextEncoder();
  const c = encoder.encode(data);

  const hashBuffer = await crypto.subtle.digest("SHA-256", c);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

function isPurchaseElement(element) {
  const regex = /buy|pay|place|order|donate|purchase/i;

  const id = element.id || "";
  const className = element.className || "";
  const text = element.textContent || "";

  const concatStr = id + className + text;

  console.log(concatStr);
  const found = regex.test(concatStr);

  return found ? "1" : "0";
}

const element = document.activeElement;

HashToSha256(
  element.tagName + (element.id || "") + (element.className || ""),
).then((hashed) => {
  const isPurchase = isPurchaseElement(element);
  const finalValue = `${isPurchase},${element.tagName},${hashed.slice(0, 8)}`;
  console.log(finalValue);
  return finalValue;
});
