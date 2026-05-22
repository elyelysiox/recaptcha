(function() {
  let R561 = null;
  {
    const iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const iframeWin    = iframe.contentWindow;
    const Reflect_gopd = iframeWin.Reflect.getOwnPropertyDescriptor;
    const ObjProto     = iframeWin.Object.getPrototypeOf;
    const nativeToStr  = iframeWin.Function.prototype.toString;
    const boundToStr   = iframeWin.Function.prototype.call.bind(nativeToStr);
    const nativeRe     = /function\s+(get\s+)?([a-zA-Z]+)\(\)\s+\{\s+\[native code\]\s+\}/;
    const testNative   = nativeRe.test.bind(nativeRe);

    let target = iframeWin.JSON;
    outer: while (true) {
      const desc = Reflect_gopd(target, "stringify");
      if (desc === undefined) {
        target = ObjProto(target);
        if (target === undefined) break;
        continue;
      }
      const fn = desc.value;
      if (fn != null && testNative(boundToStr(fn))) {
        R561 = iframeWin.Function.prototype.call.bind(fn);
      }
      break;
    }

    document.body.removeChild(iframe);
  }

  const doc   = window.document;
  const UNSET = "".match(" "); 

  const shipRe    = /ship|deliver/i;
  const billingRe = /billing|pay|credit/i;
  const postalRe  = /postal|postcode|post-code|post_code|zip/i;
  const countryRe = /country/i;
  const addrRe    = /addr.*(match|same)|(match|same).*addr/i;

  let candidates   = [];
  let finalValues  = [];

  let shipInput     = UNSET;
  let billingInput  = UNSET;
  let shipSelect    = UNSET;
  let billingSelect = UNSET;
  let sameAddrChecked = false;

  const textInputs = doc.querySelectorAll(
    "input:not([type=radio]):not([type=button]):not([type=checkbox]):not([type=hidden])"
  );
  const textCount = Math.min(textInputs.length, 30);

  for (let i = 0; i < textCount; i++) {
    const el    = textInputs[i];
    const value = el.value;
    const len   = value.length;

    if (len > 15) continue;

    const attrs = "".concat(el.name, el.id, el.autocomplete, el.className);
    if (!postalRe.test(attrs)) continue;
    if (len < 1) continue;

    candidates.push(el);
  }

  if (candidates.length <= 4) {
    for (let i = 0; i < candidates.length; i++) {
      let el    = candidates[i];
      let attrs = "".concat(el.name, el.id, el.autocomplete, el.className);

      let depth = 0;
      while (depth < 20) {
        if (shipInput === UNSET && shipRe.test(attrs)) {
          shipInput = candidates[i]; break;
        }
        if (billingInput === UNSET && billingRe.test(attrs)) {
          billingInput = candidates[i]; break;
        }

        const parent = el.parentElement;
        if (UNSET === parent) break;

        el    = parent;
        depth++;
        attrs = "".concat(
          el.name || "", el.id || "",
          el.getAttribute("autocomplete") || "", el.className || ""
        );
      }

      if (!!(shipInput !== UNSET) && !!(billingInput !== UNSET)) break;
    }
  }

  const selects      = doc.querySelectorAll("SELECT");
  const selectCount  = Math.min(selects.length, 30);
  candidates         = [];

  for (let i = 0; i < selectCount; i++) {
    const el    = selects[i];
    const attrs = "".concat(el.name, el.id, el.autocomplete, el.className);
    if (countryRe.test(attrs)) candidates.push(el);
  }

  if (candidates.length <= 4) {
    for (let i = 0; i < candidates.length; i++) {
      let el    = candidates[i];
      let attrs = "".concat(el.name, el.id, el.autocomplete, el.className);

      let depth = 0;
      while (depth < 20) {
        if (shipSelect === UNSET && shipRe.test(attrs)) {
          shipSelect = candidates[i]; break;
        }
        if (billingSelect === UNSET && billingRe.test(attrs)) {
          billingSelect = candidates[i]; break;
        }

        const parent = el.parentElement;
        if (UNSET === parent) break;

        el    = parent;
        depth++;
        attrs = "".concat(
          el.name || "", el.id || "",
          el.getAttribute("autocomplete") || "", el.className || ""
        );
      }

      if (!!(shipSelect !== UNSET) && !!(billingSelect !== UNSET)) break;
    }
  }

  const checkboxes  = doc.querySelectorAll("input[type=checkbox]");
  const checkCount  = Math.min(checkboxes.length, 30);
  candidates        = [];
  sameAddrChecked   = false;

  for (let i = 0; i < checkCount; i++) {
    const el    = checkboxes[i];
    const attrs = "".concat(el.name, el.id, el.className);
    if (addrRe.test(attrs)) {
      sameAddrChecked = el.checked;
      break;
    }
  }

  // ship postal
  finalValues.push(shipInput    !== UNSET ? shipInput.value    : UNSET);
  // billing postal
  finalValues.push(billingInput !== UNSET ? billingInput.value : UNSET);
  // ship country — options[selectedIndex].text
  finalValues.push(shipSelect   !== UNSET
    ? shipSelect.options[shipSelect.selectedIndex].text   : UNSET);
  // billing country
  finalValues.push(billingSelect !== UNSET
    ? billingSelect.options[billingSelect.selectedIndex].text : UNSET);

  const addrVal = (null === undefined) ? "" : R561(null, sameAddrChecked);
  finalValues.push(addrVal);

  const output = R561(null, finalValues);

  return output;
})();
