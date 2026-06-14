const recaptchaScriptRegex =
  /^https:\/\/www\.gstatic\.com\/recaptcha\/releases\/ne1iDVwClkE7nKD3uA9Vqsvl\/recaptcha__.*/; // replace release version

const perfEntries = performance.getEntries();

perfEntries.forEach((entry) => {
  if (recaptchaScriptRegex.test(entry.name)) {
    const protocol = entry.nextHopProtocol;
    const durationIsZero = +!entry.duration;
    const finalValue = `${protocol}-${durationIsZero}`;
    
    console.log(finalValue);
  }
});
