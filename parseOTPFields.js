(function() {
  const doc = window.document;

  let inputs = Array.from(doc.querySelectorAll(
    "input:not([type=radio]):not([type=button]):not([type=checkbox]):not([type=hidden])"
  ));

  const otpRe = /otp|code/i;
  const otpInputs = new Array(); 

  for (let i = 0; i < inputs.length; i++) {
    const el    = inputs[i];
    const attrs = (el.name + "" + el.id + el.placeholder + (el.getAttribute("aria-label") || ""))
                  .toLowerCase();
    const matched = attrs.match(otpRe);

    // !!matched → NOT NOT
    if (!!matched) {
      otpInputs.push(el);
    }
  }
  let hasOtpPattern = false;
  let hasOtpText    = false;

  if (otpInputs.length === 0) {
  } else if (otpInputs.length === 1) {
    hasOtpPattern = true;

  } else {
    const firstMaxLen = otpInputs[0].maxLength;
    let allSameMaxLen = true;

    for (let i = 0; i < otpInputs.length; i++) {
      if (otpInputs[i].maxLength !== firstMaxLen) {
        allSameMaxLen = false;
        break;
      }
    }

    // BOOL_OR: false || allSameMaxLen
    hasOtpPattern = allSameMaxLen;
  }

  if (hasOtpPattern) {
    const bodyText = doc.body.innerText;
    const smsRe    = /sms|phone|mobile|enter .* code|verification|verify/i;
    const matched  = bodyText.match(smsRe);

    // NOT NOT → !!matched
    hasOtpText = !!matched;
  }

  // BOOL_AND: !!hasOtpText && !!hasOtpPattern
  const isOtpPage = !!hasOtpText && !!hasOtpPattern;

  // CONCAT R1857, R1859, R587
  const R1857 = "" + isOtpPage;

  console.log("[otp-detector]", R1857);
  return R1857;
})();
