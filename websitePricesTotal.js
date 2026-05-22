(function() {
  const text = document.body.innerText.slice(0, 5000);

  // "total[\S\s]{0,20}?" + "(" + price_pattern + ")"
  const pricePattern = "(?:(?:(?:EUR|USD|€|\\$)\\s*)?[\\d\\.,]+\\s*(?:EUR|USD|€|\\$)|(?:EUR|USD|€|\\$)\\s*[\\d\\.,]+)";
  const totalPattern = "total[\\S\\s]{0,20}?";
  const fullRegex    = new RegExp(totalPattern + "(" + pricePattern + ")", "gi");

  const matches = Array.from(text.matchAll(fullRegex)).slice(-1);

  if (matches.length < 1) return null;

  let result = matches[0];
  if (result.length >= 2) {
    result = result[1];
  }

  console.log("[total-extractor]", result);
  return result;
  // → "€426.19" / "$101.18" / etc
})();
