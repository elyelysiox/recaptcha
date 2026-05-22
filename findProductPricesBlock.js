(function() {
  const priceRe  = /(?:(?:(?:EUR|USD|€|\$)\s*)?[\d\.,]+\s*(?:EUR|USD|€|\$)|(?:EUR|USD|€|\$)\s*[\d\.,]+)/i;
  const forbidRe = /\bremove\b|\bedit\b|\bcolou?r\b|\bsize\b|\bquantity\b|\bqty\b|\bgift\b|\bid\b|\bsku\b/i;
  const totalRe  = /total|tax|\bfee\b|\bshipping\b|\bdelivery\b/i;

  const R598 = 0;
  const text = document.body.innerText.slice(0, 5000);

  const lines = [];
  for (const l of text.split('\n')) {
    if (l.trim().length > 2) lines.push(l.slice(0, 100));
  }

  const priceFlags = lines.map(l => priceRe.test(l));

  const results = [];
  let hits = 0;

  for (let i = 0; i < lines.length && hits < 3; i++) {
    if (!priceFlags[i]) continue;

    const wForbid = lines.slice(Math.max(0, i - 3), Math.min(lines.length, i + 4));
    const wTotal  = lines.slice(Math.max(0, i - 4), i);

    const hasForbid = wForbid.some(l => forbidRe.test(l));
    const hasTotal  = wTotal.some(l  => totalRe.test(l));

    // BOOL_AND: !!hasForbid && !!(!hasTotal)
    if (!hasForbid || hasTotal) continue;

    const price = priceRe.exec(lines[i])[0];
    const ctx   = lines.slice(Math.max(0, i - 4), i);
    ctx.unshift(price);
    results.push(ctx);
    hits++;
  }

  console.log(JSON.stringify(results, null, 2));
  return results;
})();
