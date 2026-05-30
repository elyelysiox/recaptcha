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

document.addEventListener("pointerdown", () => {
  const element = document.querySelectorAll(":hover");
  const current = element[element.length - 1];

  if (current) {
    HashToSha256(
      current.tagName + (current.id || "") + (current.className || ""),
    ).then((hashed) => {
      const finalValue = `${current.tagName},${hashed.slice(0, 8)}`;
      console.log(finalValue);
    });
  }
});
