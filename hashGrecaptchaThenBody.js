/* Example
grecaptcha.enterprise.ready(function() {
    grecaptcha.enterprise.execute(e, {
        action: "submit"
    }).then(async function(s) { hash body
        j(await (0,
        d.J6)(e, s, "submit").then(e => e.json()))
    })
})*/

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

HashToSha256('j(await(0,d.J6)(e,s,"submit").then(e=>e.json()))').then(
  (hash) => {
    console.log(hash);
  },
);
