function getRecaptchaScriptIndex() {
  let finalNum = 0;

  const pattern = /https:\/\/www\.gstatic\.com\/recaptcha\/releases\/[^/]+\/.*/;

  const scripts = document.scripts;

  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].src;

    if (pattern.test(src)) {
      finalNum = i;
      break;
    }
  }

  return finalNum.toString();
}

console.log(getRecaptchaScriptIndex())
