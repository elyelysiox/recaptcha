
## Description

This repository contains a technical analysis of Google's antibot (reCAPTCHA) focusing on:

- Payload Structure and Values
- Fingerprinting Techniques
- Obfuscation Techniques
- Anti-debugging/Tampering Techniques
- Virtual Machines

## Contact

- Discord: `@g_recaptcha`
- Telegram: `@lyxlobyx`

## Obfuscation Techniques

reCAPTCHA is one of the anti-bot systems with the most sophisticated obfuscation techniques, employing a series of transformations that make the code less readable and more difficult to reverse engineer. Most obfuscations can be easily manipulated using the Abstract Syntax Tree (AST), but some are processed at runtime, rendering the AST useless in this case. Polymorphism is also applied to the code to change its structure in each version of the script. For example, the code doesn't perform the action directly. Instead, it uses objects or functions that change shape

- ***Sequence Expressions***
    The code is flattened by converting each block statement into a continuous comma-separated expression, it can appear in if statements, function arguments, and even within objects
  ![seq](https://github.com/elyelysiox/recaptcha/blob/main/photos/32418923412.png)


- ***Mixed Boolean Arithmetic***
    Intertwines arithmetic operations (addition, subtraction, multiplication) with bitwise operations (AND, OR, XOR, NOT) to hide the original logic, for example `-2 * ~(h & H) + -2 + (h ^ H)`

- ***Indirect Function Table***
    Each function is built within a table, and is called using its index, like `functions[index](args)`

- ***Inline Constant Array***
    A local array literal is assigned inline, mid-expression, the array groups constants (numbers, strings) that are reused throughout the function body via index access
    ```javascript
    // b = [14, 1, "call"] assigned inline inside a sequence expression
    function(Y, Q, c, l, G, X, W, J, b, P) {
        (Y & 94) == Y && (b = [14, 1, "call"], ...)
        W[b[2]](J, G)   // W.call(J, G)
        Y >> b[1] & b[0]  // Y >> 1 & 14
    }
    ```

- ***Function Multiplexing***
    Multiple logically distinct functions are merged into one, using a numeric parameter as a block selector. The active block is determined by evaluating the parameter against bitwise conditions. Callers pass a numeric literal as the selector

    ```javascript
    function(N, y, U, Y, h, H, m, C, u) {
        C = [26, 47, 6];
    
        // block 1
        if ((N - 2 ^ 14) < N && (N - C[2] | 28) >= N) {
            // convert value to string logic
        }
    
        // block 2
        if ((N + 4 & 40) >= N && (N + 5 & C[0]) < N) {
            Y = bB();
            throw Error(Y === void 0 ? "unexpected value " + U + y : Y);
        }
    
        return u;
    }
    ```

- ***Logical Operator Branching***
    Replaces if statements and if/else blocks with logical operator short-circuit evaluation, converting control flow into expressions. combined with sequence expressions, multiple branches appear as a single continuous comma-separated expression
    ```javascript
    // if (a) { block }
    a && (block)
    
    // if (!a) { block }
    a || (block)
    
    // if (a) { x } else { y }
    a ? x : y
    
    // combined with CFF and sequence expressions:
    (Y | 1) & 14 || (c = Q.O, J = c.O.length + c.g.length),
    (Y ^ 59) >> 3 == 3 && (Q.classList
        ? Q.classList.add(c)
        : Z[31](31, Q, c) || (l = f[0](84, "string", "", Q), ...)),
    ```
- ***Bind Native Methods Constants***
    Binds native browser methods to their original receivers, storing them as constants to prevent tampering

    ```javascript
    LO = (Tw = self) == null ? void 0 :
     (K9 = Tw.Math) == null ? void 0 :
     (v4 = K9.floor) == null ? void 0 :
     (mF = v4.bind) == null ? void 0 :
     mF.call(v4, Math)  // Math.floor.bind(Math)

    LO(x)           // Math.floor(x)
    U4()            // Math.random()
    Ge(obj, prop)   // Object.defineProperty(obj, prop)
    ```

- ***Dead Code***
    Inaccessible or unused blocks of code are injected throughout the file, increasing its size to over 60,000 lines, this makes static analysis and LLM-based reverse engineering difficult

- ***Control Flow Flattening***
    Transforms each part of the code (declarations and loops) into a flat state machine. It hides the original execution logic by routing all code blocks through a central "dispatcher" block
  
    Dispatchers can change shape; some have 2-3 state variables, and the loop/condition type changes. They look like this

    ![cff1](https://github.com/elyelysiox/recaptcha/blob/main/photos/2814721849.png)

    This is a CFF with 2 state variables, one handles the catch block and the other the try block.

- ***Encrypted String Pool***
    All string literals (DOM APIs, browser properties, CSS values, error messages, etc) are encrypted into a single massive string pool. A decryption function uses a seed and an LCG-based XOR cipher to extract each string at runtime
    
    There are 1990+ call sites spread across the code, the decryption function uses a running key that accumulates decoded codepoints, making each character dependent on all previous ones

    ```javascript
    X = function(J, b, P, F, U) {
        U = ["codePointAt", 127, "char encrypted pool"];
        for (F = (P = 0, b = "", l); P < Q; P++)
            J = (U[2][U[0]](c + P) ^ F) & U[1],  // XOR with running key
            b += String.fromCodePoint(J),
            F += J; // accumulate key
        return G = b;
    }
    
    // call sites pass a seed to locate and decrypt each string
    Z[23](64, 4, 54961, 103)()  // → "lang"
    Z[23](66, 4, 54961, 103)()  // → "addEventListener"
    Z[23](32, 12, 20287, 852)() // → "inline-block"
    ```

    ![decstrings](https://github.com/elyelysiox/recaptcha/blob/main/photos/128093828.png)

- ***Stateful Value Iterator***
    reCAPTCHA uses stateful function that returns a sequence of runtime objects and values (like window, document.body, numeric constants) in a fixed order, each call advances an internal cursor, calling it out of sequence or too many times corrupts all subsequent reads. A timeout mechanism invalidates the state after a fixed interval, returning null for any late reads

    ```javascript
    // sequential calls return different values:
    c()  // → window
    c()  // → document.body
    c()  // → 123
    c()  // → null (timeout expired)
    
    l(c(), G[2], G[W[1]], G[1]) + l(c(), G[2], G[W[1]], 12)
    // ↑ window                     ↑ window

    10 * l(c(), G[2], G[W[1]], G[1]) + l(c(), G[2], G[W[1]], 12))
    
    c().querySelectorAll(a[X[2]](98, X[1], X[1]))
    // ↑ document.body  
    
    ```

- ***Computed Function Table***
    This is similar to `Indirect Function Table`, but here the index of the function to be obtained is calculated at runtime with a seed, using XOR and Modulus
    
    ```javascript
    c = ((Q ^ no | U[1]) >> 5) + no
    A = mN[(c % U[2] + U[2]) % U[2]]  // mN is the function table (50+ functions)
    ```
    ```javascript
    q[29](5, 6977)   // seed=6977  → index resolves to function at mN[X]
    q[29](53, 6187)  // seed=6187  → different index, different function
    ```
    
    ![computed](https://github.com/elyelysiox/recaptcha/blob/main/photos/124898914221.png)

- ***Runtime Value Encryption***
    Some values ​​(captcha configuration parameters, anchor parameters, etc) are never stored in plain text; they are encrypted immediately after collection and decrypted only at the time of use, have a prefix `B` at the beginning

    ![hiddenv](https://github.com/elyelysiox/recaptcha/blob/main/photos/4214879218412.png)

- ***Async Control Flow Obfuscation***
    Synchronous logic is converted into generator-based state machines wrapped in recursive Promise chains, tracing any value through the debugger forces stepping through multiple async handlers, losing the original execution context at each .then() boundary

## Anchor Payload/Response

### Payload Structure

Components to initialize reCAPTCHA
```
ar:         <WidgetInit?>
k:          <Website Key>
co:         <Website URL Base64-Encoded>
hl:         <Browser Main Language>
v:          <Recaptcha Version>
size:       <Type>
sa:         <Site Action>
anchor-ms:  <Widget Load Timeout>
execute-ms: <Execution Timeout>
cb:         <CallBack ID>
```

### Response

The response contains:
- CAPTCHA iframe window design
- Anchor token used for payload validation (/reload)
- The main configuration for initialization, executed in the `recaptcha.anchor.Main.init` method to receive it in recaptcha_en.js

### Structure:

Note: Recaptcha BotGuard was removed `04/01/2026`, You can see some samples [here](https://github.com/elyelysiox/recaptcha-payload/tree/main/botguard_scripts)
```javascript
[
    "ainput",
    [
        "bgdata",
        "",
        "LyogQW50aS1zcGFtLiBXYW50IHRvIHNheSBoZWxsbz8gQ29ud...", // BotGuard Script Base64-Encoded
        "YWVtZ0h5MGNCWXJDQ2lidGh0RW13RmhWdlc3aU5yeVpzSmx6U...", // BotGuard VM Bytecode Double Base64-Encoded 
        "wrB8fsOVU8K0YAzDsyQpw7ZHw6jDnMK1AMO6SRcvw53CsGlQw6/DuMO0wqr" // VM Config Bytecode Base64-Encoded
    ],
    null,
    [
        "conf",
        null,
        "6LfTV4gkAAAAACDVrUvp9_DalxUPvFSU7M2HJDO-", // Website Key
        0,
        null,
        null,
        null,
        1,
        // Indexes for fingerprinting or something else
        [16, 21, 125, 63, 73, 95, 87, 41, 43, 42, 83, 102, 105, 109, 121],
        [-7614991, 137],
        0,
        null,
        null,
        null,
        null,
        0,
        null,
        0,
        null,
        700, // Time Start for Time Variances of Fingerprint Values
        1,
        null,
        0,
        // Encoded metadata for the VM's main bytecode constructs
        "CvsCEg8I8ajhFRgAOgZUOU5CNWISDwjmjuIVGAA6BlFCb29IYxIPCMfm1DgYADoGZHhkTmlkEg8Is4qgOBgBOgZMV0o1a2ISDwiB7OgVGAA6Bkh1dlBqZhIPCK6e6zcYADoGR2JpT1FkEg8I94jmNxgAOgZvaWxlRGQSDwjwzeMVGAE6BmZJVkloYhIPCOLKoDcYAToGZ0xOQ0hjEg8I3r+3NxgBOgZlYXp1NmQSDwjY0oEyGAA6BkFxNzd2ZhIOCLjllDIYAToFUUJPRDASDwio7784GAA6BkdGVU5jZhIPCLWzqzgYAToGb3JZVjZkEg8I0tuVNxgAOgZmZmFXQWUSDwiV2JQyGAE6BlBxNjBuZBIPCKuRyjgYADoGQVo0TmJiEg8IxfOINxgAOgZhWG9pYWMSDwiNyoYyGAE6Bk93TjR0ZhIOCIr9iDcYADoFTWZJSTQaJwgDEiMdJv3NgTUZp4oJGYQKGZzijAIZzPMRGa+VQBnqsCYZ5a8MGQ==",
        0,
        1,
        null,
        null,
        1,
        null,
        null,
        0,
        null,
        null,
        0,
        0,
        "cf5e3c3a6ab6c494c829a7932d9577c1e6de862dd4912e55dc7fe2e40a1f7604"
    ],
    "https://who.clickbait.team:443", // Website URL:Port
    null,
    [
        3,
        1,
        1
    ],
    null,
    null,
    null,
    1,
    3600,
    [
        "https://www.google.com/intl/es/policies/privacy/",
        "https://www.google.com/intl/es/policies/terms/"
    ],
    "vQWNjTpMwdevQPWmE8akDzp8jsOZfa1VqTzVHaPiQ/c=",
    1,
    0,
    null,
    1,
    1777669303203, // Fingerprint Data Encryption Key
    0,
    0,
    [203], // Config Bytecode Key
    null,
    [185], // Config Bytecode Key
    "RC--rg1OSRnOD0ayA",
    null,
    null,
    null,
    null,
    null,
    // Bft Signature, Used in reCAPTCHA V2
    "0dAFcWeA4RepD9zDjeMQE73pAT27pXZ7Nz_419U2K36QNqzHaKtLIDkwZQLi-Ud8OvSZHbDEcxQxusBQnsF5QQErMRpJMcUplaFg",
    1777752103288 
]
```

## Fingerprint
The values ​​are based on the decrypted values ​​from the first sample fingerprint, look [here](https://github.com/elyelysiox/recaptcha-payload/blob/main/fingerprint/decrypted_values.json)

Each subfield of the fingerprint values ​​has a base format:

`[value, key, elapsed]`

Where `key` is the encryption key, and `elapsed` is the time it took the collector to obtain and encrypt the value. This allows reCAPTCHA to detect:
- Excessively fast execution
- Hooks
- Breakpoints and sandboxing

### Collector Execution Order
The system uses an internal scheduler:

```
[42, 45, 53, 30, 28, 54, 29, 31, 32, 33, 34, 35, 37, 36, 38, 39, 43, 40, 41, 46, 48, 57, 58, 60, 61, 62, 63, 64, 66, 68, 69, 71, 72, 79, 55]
```

This represents:

- Execution Order
- Collector Pipeline
- Signal Generation Sequence

### Fingerprint Signals Codes & Key Derivation
Transforms fingerprint signals into deterministic encryption keys through a multi-stage derivation pipeline

Each fingerprint value is:

- Normalized
- Encoded into a compact signal code
- Converted into a numeric encryption key
- Encrypted using the derived key

The process is deterministic, meaning the same input value always generates the same signal code and encryption key

```
Raw Value
   ↓
Signal Code Derivation
   ↓
Compact Signal Code
   ↓
Numeric Key Derivation
   ↓
Encryption Key
   ↓
Value Encryption
```

### Example

***Input Signal***
```
"BUTTON,195a81c9"
```

***Step 1 - Derive Signal Code***
```javascript
deriveSignalCode("BUTTON,195a81c9")
// → "wg"
```

The generated signal code is a compact deterministic identifier for the original value.

***Step 2 - Derive Numeric Key***
```javascript
deriveKey("wg")
// → 3792
```

The signal code is transformed into a numeric encryption key.

***Step 3 — Encrypt Value***

```javascript
encryptValueWithKey(3792, "wgia1z9pwq")
// → "bYVbh6BUsE_5pLA"
```

The next value will be encrypted with the derived key, following the collector order.

### Aggregate Fingerprint Structure

All generated signal codes are aggregated into a compact serialized structure

**Process**
```
value -> "BUTTON,195a81c9" seed code -> wg key -> 3792
value -> "wgia1z9pwq" seed code -> 21 key -> 1599
value -> 1 seed code -> p1 key -> 3521
value -> "8cc68d83" seed code -> ld key -> 3448
value -> "https://nextcaptcha.com/demo..." seed code -> 9p key -> 1879
value -> 4 seed code -> op key -> 3553
value -> false seed code -> 1r key -> 1633
value -> 7 seed code -> qf key -> 3605
value -> "jYAQSHAEAI" seed code -> 1z key -> 1641
value -> "" seed code -> 80 key -> 1784
value -> 2 seed code -> jk key -> 3393
value -> "AAAAAAAAAA" seed code -> 1z key -> 1641
value -> "h3" seed code -> 9p key -> 1879
value -> "0,BUTTON,195a81c9" seed code -> ia key -> 3352
value -> -1 seed code -> 1u key -> 1636
value -> 0 seed code -> wq key -> 3802
value -> "74,fbfbc5b3" seed code -> 6z key -> 1796
value -> 0 seed code -> wq key -> 3802
value -> 0 seed code -> wq key -> 3802
value -> 2 seed code -> jk key -> 3393
value -> 0 seed code -> wq key -> 3802
value -> "-1,-1" seed code -> 1m key -> 1628
value -> "static.cloudflareinsights.co,..." seed code -> 1g key -> 1622
value -> "" seed code -> 80 key -> 1784
value -> "https://nextcaptcha.com,https...." seed code -> pd key -> 3572
value -> "[4,\"CABIBQAggA\",\"BAgAAgAAgA\"]" seed code -> 1n key -> 1629
value -> "Demostración empresarial de reCAPTCHA v3..." seed code -> 1k key -> 1626
value -> "[2,76852,77850,77351]" seed code -> 9b key -> 1865
value -> "sha384-TNm" seed code -> 23 key -> 1601
value -> "[1680,1050,876,1166,844,876]" seed code -> 13 key -> 1570
value -> "[300,null,1778502450481]" seed code -> ex key -> 3251
value -> "[null,null,\"\",\"\"]" seed code -> rx key -> 3654
value -> "[2147483648,70806416,65303240]" seed code -> 2r key -> 1664
value -> "GA1.1.354395113.1778502448" seed code -> 1g key -> 1622
value -> false seed code -> 1r key -> 1633
value -> "[[[1,\"wg\"],..." seed code -> 85 key -> 1789
```

**Final**

```json
[
  [
    [1, "wg"], [1, "21"], [1, "p1"],
    [1, "ld"], [1, "9p"], [1, "op"],
    [1, "1r"], [1, "qf"], [1, "1z"],
    [1, "80"], [1, "jk"], [1, "1z"],
    [1, "9p"], [1, "ia"], [1, "1u"],
    [1, "wq"], [1, "6z"], [1, "wq"],
    [1, "wq"], [1, "jk"], [1, "wq"],
    [1, "1m"], [1, "1g"], [1, "80"],
    [1, "pd"], [1, "1n"], [1, "1k"],
    [1, "9b"], [1, "23"], [1, "13"],
    [1, "ex"], [1, "rx"], [1, "2r"],
    [1, "1g"], [1, "1r"]
  ],
  "54"
]
```

### Signals

- **Idx 4** (`string`)
  - Value: `_website key_ + '6d'`
  - Hashed: `true`
  - Description: Website Key hashed with SHA-256 (truncated)

- **Idx 5** (`integer`)
  - Value: `window.localStorage.length * 2`
  - Hashed: `false`
  - Description: `window.localStorage` length

- **Idx 16** (`string`)
  - Value: `yM5Us/j/fn6EDgtmPlP4Pxj605nMJN9dRYHyy5Mn`
  - Hashed: `true`
  - Description: Hashed all `<HEAD>` elements, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/hashHeadElements.js)

- **Idx 27** (`string`)
  - Value: `location.origin`
  - Hashed: `false`
  - Description: Website URL

- **Idx 28** (`boolean`)
  - Value: `false`
  - Hashed: `false`
  - Description: `window.parent != window` and `window.frameElement != null` checks

- **Idx 29** (`string`)
  - Value: `e2a3cd70`
  - Hashed: `true`
  - Description: Hashed grecaptcha.execute function body with SHA-256

- **Idx 30** (`integer`)
  - Value: `0`
  - Hashed: `false`
  - Description: The index script containing the load URL `https://www.gstatic.com/recaptcha/releases/<version>/`, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/getRecaptchaScriptIndex.js)

- **Idx 31** (`string`)
  - Value: `AAgkAQI0SB`
  - Hashed: `true`
  - Description: Hashed `document.cookie` keys, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/hashCookies.js)

- **Idx 32** (`string`)
  - Value: `""`
  - Hashed: `false`
  - Description: Referrer URL `document.referrer`

- **Idx 34** (`string`)
  - Value: `AAAAAAAAAA`
  - Hashed: `true`
  - Description: Hashed all `<INPUT>` attribute names, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/hashInputElements.js)

- **Idx 35** (`string`)
  - Value: `0,DIV,f0c7414e`
  - Hashed: `true`
  - Description: `document.activeElement`, parse if it matches with a regex `(?i)buy|pay|place|order|donate|purchase`, then hash tagName + element ID + classNames, `<isMatched,TagName,Hashed>`

- **Idx 36** (`string`)
  - Value: `h3`, `h2` or `http/1.1`
  - Hashed: `false`
  - Description: `nextHopProtocol` of `PerformanceNavigationTiming`

- **Idx 37** (`integer`)
  - Value: `-1`
  - Hashed: `false`
  - Description: `performance.timing.unloadEventStart`

- **Idx 38** (`integer`)
  - Value: `96`
  - Hashed: `false`
  - Description: DNS lookup `performance.timing.domainLookupStart - performance.timing.domainLookupEnd`

- **Idx 39** (`integer`)
  - Value: `0`
  - Hashed: `false`
  - Description: Navigation type `performance.navigation.type`

- **Idx 40** (`integer`)
  - Value: `0`
  - Hashed: `false`
  - Description: Last scroll-Y position `window.scrollY`

- **Idx 41** (`string`)
  - Value: `DIV,a08cd360`
  - Hashed: `true`
  - Description: The hovered element where the mouse is positioned, hashed target + all `<INPUT>` elements + `location.url` + `window.scrollY`

- **Idx 42** (`string`)
  - Value: `9,e3b0c442`
  - Hashed: `true`
  - Description: Hashed a random text script with SHA-256 plus the index, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/hashRandomScript.js)

- **Idx 44** (`string`)
  - Value: `2v591z63wq`
  - Hashed: `true`
  - Description: Hovered element, `document.activeElement`, all `<INPUT>` elements hashed, `location.url`, `window.scrollY`, Example:
    ```javascript
    [
        deriveSignalCode(hash(hoveredElement)),
        deriveSignalCode(hash(document.activeElement)),
        deriveSignalCode(hash(document.querySelectorAll('input'))),
        deriveSignalCode(location.url),
        deriveSignalCode(String(window.scrollY))
    ].join('')
    ```

- **Idx 45** (`integer`)
  - Value: `4`
  - Hashed: `false`
  - Description: Length of `window.history`

- **Idx 46** (`string`)
  - Value: `https://static.kogstatic.com/0000/34c...`
  - Hashed: `false`
  - Description: An error occurred in a website script

- **Idx 47** (`integer`)
  - Value: `0`
  - Hashed: `false`
  - Description: `window.length`

- **Idx 49** (`string`)
  - Value: `h2-0`
  - Hashed: `false`
  - Description: `nextHopProtocol` of `PerformanceResourceTiming`

- **Idx 50** (`array`)
  - Value: `[1,0,null,1,1,["805b1z63wq"],"MWc2MzZwMnR0ZHNkMw==",0,null,[[1]]]`
  - Hashed: `true`
  - Description: Contains user behaviors, hashed hovered elements interactions, and timeout to capture another element

- **Idx 51** (`array`)
  - Value: `[0]`
  - Hashed: `false`
  - Description: `document.innerText` text contains anything labeled `try again` | `incorrect` | `invalid` | `declined`

- **Idx 52** (`integer`)
  - Value: `11`
  - Hashed: `false`
  - Description: `isActive * 10 + hasBeenActive` from `userActivation`

- **Idx 53** (`integer`)
  - Value: `4`
  - Hashed: `false`
  - Description: `window.document.length % 2 == 0 ? 5 : 4`

- **Idx 54** (`boolean`)
  - Value: `false`
  - Hashed: `false`
  - Description: `window.document.hidden`

- **Idx 55** (`array`)
  - Value: `[[[1,"2v"],[1,"9z"],[1,"z8"],[1,"us"],[1,..`
  - Hashed: `false`
  - Description: Ordering of generated signals codes by fingerprint values

- **Idx 56** (`string`)
  - Value: `-1,-1`
  - Hashed: `false`
  - Description: `window.opener` checks

- **Idx 57** (`string`)
  - Value: `www.gstatic.com,_,static.kogstatic.com,www.google.com,www.googletagmanager.,...`
  - Hashed: `false`
  - Description: HTML links of `document.scripts`

- **Idx 58** (`string`)
  - Value: `mapslitepromosdismissed1`
  - Hashed: `false`
  - Description: Sampled `window.localStorage` key

- **Idx 59** (`string`)
  - Value: `""`
  - Hashed: `false`
  - Description: `window.name`

- **Idx 60** (`string`)
  - Value: `https://www.kogama.com,https://www.google.com,https://js.stripe.com`
  - Hashed: `false`
  - Description: URLs for open message events

- **Idx 61** (`array`)
  - Value: `[0,"AAAAAAAAAA","AAAAAAAAAA"]`
  - Hashed: `true`
  - Description: Hashes of attribute names and target element types recorded by `MutationObserver`, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/writeMutationObservers.js)

- **Idx 62** (`string`)
  - Value: `document.title`
  - Hashed: `false`
  - Description: Full website title

- **Idx 63** (`array`)
  - Value: `[]`
  - Hashed: `true`
  - Description: Hashed long IDs of `document.cookie`, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/derirveCookies.js)

- **Idx 64** (`integer`)
  - Value: `55557`
  - Hashed: `false`
  - Description: Time elapsed from the anchor to the reload

- **Idx 65** (`string`)
  - Value: `sha384-3qc`
  - Hashed: `true`
  - Description: Integrity hash of render script (truncated)

- **Idx 67** (`array`)
  - Value: `[width,height,outerHeight,innerWith,innerHeigh,availHeigh]`
  - Hashed: `false`
  - Description: Screen resolution and dimensions

- **Idx 68** (`array`)
  - Value: `[300,null,1777685870223]`
  - Hashed: `false`
  - Description: Timezone offset and current Unix timestamp

- **Idx 69** (`string`)
  - Value: `09AKhCRwjrDFiHsrRA--o23-HB-eWqOtk_XQ-rLE1...`
  - Hashed: `false`
  - Description: A session token used for human identification, stored in `window.sessionStorage` and increments the score if valid

- **Idx 70** (`array`)
  - Value: `[null,null,"","",null,"1l0fl"]`
  - Hashed: `false`
  - Description: Website Product Prices, Data, etc

- **Idx 71** (`array`)
  - Value: `[jsHeapSizeLimit,usedJSHeapSize,totalJSHeapSize]`
  - Hashed: `false`
  - Description: Performance JavaScript heap memory

- **Idx 72** (`array`)
  - Value: `[[["Google Chrome","147"],["Not.A/Brand",...`
  - Hashed: `false`
  - Description: `userAgentData`, browser version, name

- **Idx 73** (`array`)
  - Value: `[[null,2,0,"Mozilla/5.0 (Windows NT 10.0;...`
  - Hashed: `false`
  - Description: VM Signals data

- **Idx 77** (`string`)
  - Value: `null`
  - Hashed: `false`
  - Description: Google GA cookie, may appear if the website uses Google Tag Manager

- **Idx 78** (`integer`)
  - Value: `""`
  - Hashed: `false`
  - Description: Unix timestamp, sometimes it appears

### VM Signals
The following are the browser values ​​obtained by the internal reCAPTCHA VM, along with the signal key. Some values ​​are not shown in the sample fingerprint because the VM only extracts certain values ​​from the configuration bytecode. Therefore, other values ​​will be displayed. For more details, see [here](https://github.com/elyelysiox/recaptcha-vm)

Base Signal Format:

```
[
  null,
  collectorElapsed,
  encryptElapsed,
  value
]
```

Where `collectorElapsed` means how long (ms) it took the collector to obtain the value
And `encryptElapsed` means how long (ms) it took to encrypt the value.
These times are measured during the VM's execution.

### Structure

```json
[
  null,
  7,
  0,
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36"
],
null,
null,
[ null, 0, 0, "[]" ],
null,
null,
[
  null,
  4,
  0,
  "[\"Join And Get Free Trial!\",\"\",\"Captcha Solving Service\",\"Products\",\"Docs\"]"
],
[ null, 0, 0, "false" ],
null,
[ null, 0, 0, "0" ],
[ null, 1, 0, "[null,null,null,null,\"false\"]" ],
[ null, 3, 4, "[[[0,921],[1,2053]],[[235054,1,1,1],[164277,3,4,1]],2,39]" ],
[ null, 1, 4, "[[[0,0,979]],1,0]" ],
[ null, 1, 1, "[[[1,0]]]" ],
[
  null,
  4,
  1,
  "[886,2300,262.2099999997952,392.7600000009595,2050.2399999993577]"
],
[ null, 1, 1, "[[[1123,0,0]]]" ],
[ null, 1, 2, "[[[1123,0]]]" ],
[ null, 1, 3, "[0,null,null,null,null,null,null]" ],
[
  null,
  5,
  9,
  "[1,[[2050,125,633,266,[609,266,105,44],3,1,50,1,1]],[3,3,318],[28,777,858,28],0,0,25]"
],
[ null, 0, 0, "" ],
[ null, 0, 0, "229.6" ],
[ null, 0, 0, "false" ],
[ null, 1, 0, "[1,0,0,Infinity]" ],
[ null, 1, 1, "["0",-1,-1,999]" ],
[ null, 1, 0, "[\"undefined\",3]" ],
[ null, 1, 6, "[2,4,53324367238]" ],
[
  null,
  12,
  0,
  "[\"Google Inc. (Intel Inc.)\",\"ANGLE (Intel Inc., Intel(R) UHD Graphics 630, OpenGL 4.1)\",30]"
],
[
  null,
  28,
  2,
  "[1542343452,0,105002991,3556653,96784904,-731949068,-902263026,-1914850612,571474391,-1588406278,3443508,1967713171,-1249474914,-1588406278,0,918504841,-807058197]"
]
```

- **Key 417** (`string`)
  - Value: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...`
  - Description: Full Browser User-Agent

- **Key 727** (`array`)
  - Value: `[]`
  - Description: Product Prices Blocks, contains prices for commercial products on the website, these may appear on marketplace websites such as Amazon, eBay, AliExpress, etc, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/findProductPricesBlock.js)

- **Key 150** (`array`)
  - Value: `[\"Join And Get Free Trial!\",\"\",\"Captcha Solving Service\",\"Prod...`
  - Description: Links extracted from the `<a>` elements of the website, the VM rarely extracts these values

- **Key 545** (`boolean`)
  - Value: `false`
  - Description: `navigator.webdriver`

- **Key 370** (`integer`)
  - Value: `0`
  - Description: Max Device Touch Points `navigator.maxTouchPoints`

- **Key 779** (`array`)
  - Value: `[null,null,null,null,"false"]`
  - Description: Extracts data from shipping/billing fields, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/formFieldScrape.js)
  
    `postal|postalcode|postalcode|postal_code|zip` → searches for postal code field
    
    `ship|deliver` → shipping section
    
    `billing|payment|credit` → billing section
    
    `country` → country selector
    
    `addr.*(match|equal)|(match|equal).*address` → "same address" checkbox
    
    Reads name, id, autocomplete, className of each element
    Three phases: text inputs, SELECT statements, checkboxes

- **Key 659** (`array`)
  - Value: `[[[0,921],[1,2053]],[[235054,1,1,1],[164277,3,4,1]],2,39]`
  - Description: Contains data of the pressed elements on the page in the format `[[[count,ts]],[[hashedElem,tagType,type,autoComplete]],pressedCount,behaviorChecksum]`

- **Key 959** (`array`)
  - Value: `[[[0,0,979]],1,0]`
  - Description: Scroll movements, in the format `[[[scrollX,scrollY,ts]],count,behaviorChecksum]`

- **Key 895** (`array`)
  - Value: `[[[1,0]]]`
  - Description: VisibilityStateEntry, check if the user left the page, in the format `[[[isVisible,startTime]]]`

- **Key 1092** (`array`)
  - Value: `[886,2300,262.2099999997952,392.7600000009595,2050.2399999993577]`
  - Description: reCAPTCHA Performance, PerformanceNavigationTiming and PerformanceEventTiming, in format `[vmStart,vmEnd,domContentLoadedEventEnd,loadEventEnd,firstUserInteractionTime]`

- **Key 41** (`array`)
  - Value: `[[[1123,0,0]]]`
  - Description: ClearTimeout

- **Key 43** (`array`)
  - Value: `[[[1123,0]]]`
  - Description: ClearTimeout

- **Key 549** (`array`)
  - Value: `[0,null,null,null,null,null,null]`
  - Description: KeyboardEvent, computed keys + timestamps

- **Key 352** (`array`)
  - Value: `1,[[2050,125,633,266,[609,266,105,44],3,1,50,1,1]],[3,3,318],...`
  - Description: It contains mouse movements, time, dimensions, positions of pressed elements and biometrics

    *Base Format*:
    ```
    [
      eventsCount,
      mouseEvents,
      [
        unknownEntropy,
        averageInterEventDelay,
        timingVarianceScore
      ],
      [
        totalPoints,
        clickSequenceScore,
        totalCursorDistance,
        totalPoints
      ],
      0,
      0,
      behaviorChecksum
    ]
    ```
    *Mouse Event*:
    ```
    [
      timestamp,
      clickDuration,
      clientX,
      clientY,
      [
        elementLeft,
        elementTop,
        elementWidth,
        elementHeight
      ],
      elementTagType,
      pointerType,
      pressure,
      pointerTravelDistance,
      pointerArea
    ]
    ```

- **Key 360** (`string`)
  - Value: `""`
  - Description: Collected Website Prices Total $ parsing with a regex ``(?i)total[\S\s]{0,20}?(?:(?:(?:USD|\$)\s*)?[\d\.,]+\s*(?:USD|\$)|(?:USD|\$)\s*[\d\.,]+)``, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/websitePricesTotal.js)

- **Key 1278** (`integer`)
  - Value: `229.6`
  - Description: Division by 10 of current runtime timing `Math.trunc(performance.now()) / 10`
    
- **Key 1422** (`boolean`)
  - Value: `false`
  - Description: Parse if there are OTP/2FA fields on the website, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/parseOTPFields.js)

- **Key 614** (`array`)
  - Value: `[1,0,0,Infinity]`
  - Description: Device battery information, in the format `[level,isCharging,chargingTime,dischargingTime]`

- **Key 2033** (`array`)
  - Value: `["0",-1,-1,999]`
  - Description: Some VM constant values ​​and VM runtime timing

- **Key 1313** (`array`)
  - Value: `["undefined",3]`
  - Description: Android, Chrome checks, `[typeof window.android, Object.keys(window.chrome).length]`

- **Key 1994** (`array`)
  - Value: `[2,4,53324367238]`
  - Description: `[navigator.hardwareConcurrency, navigator.deviceMemory, navigator.storage.estimate().qouta]`

- **Key 1310** (`array`)
  - Value: `["Google Inc. (Intel Inc.)","ANGLE (Intel Inc.,...`
  - Description: WebGL Renderer, Vendor and Total Extensions, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/webglSignals.js)


- **Key 291** (`array`)
  - Value: `[1542343452,0,105002991,3556653,96784904,-731949068,-902263026,...`
  - Description: Hashed specific Prototypes key of browser objects, like `SpeechSynthesisEvent`, `NetworkInformation`, `HTMLElement`, etc, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/hashBrowserProtos.js)

## Reload Request Payload

This data is serialized using protobuf (Protocol Buffers), an efficient, neutral method for serializing structured data, developed by Google.

```javascript
[
  "rreq",
  "U5VsmTDhJM1iOJUyw4DEUTYv",
  "03AFcWeA5Els3SIQviW2OYCHYD4uDhKlFPG6A48z2nk74BC2vrXSRvtpP9uVkWW96kUKm7sHIr...",
  null,
  null,
  "-383788762",
  "q",
  "05APQrAobTCFGtbKVY3NwExv-K_G7oqmzGyUcTXi532CBKvSJUiT49tkRSgGD__OdfVRZtrI3i...",
  "submit",
  null,
  null,
  null,
  null,
  null,
  "6LcAbwIqAAAAAJvVAhSSJ8qzYsujc7kn1knmSgQX",
  null,
  "0XA4cHhALxgMF9_Kt6uze2ZTR08XAe2x8o3BrU1hbTouNf3o1cnRmYRxZW01IA0BCNC_qJykb...",
  null,
  null,
  null,
  "tbMywxNTQsODQ0XSxbMSwyOTksMTA4Nl1dLFtbMiw2MSwxMzIuNzM5OTk5OTk5ODQ2MzNdLF...",
  "0aAPQrAobqMEazjp9PGLYWTgxWGGcq9k5MJNI6LFBWfTh0UkDaVobdH-InwAYsTXtxs3rH_fI",
  "BDAAYAIAGEcAAUoYI4lDCKAsCJlcgB6AAJtgggoIEEOALSoQRZxSZyAJBHANCkAJQYhFJES...",
  null,
  null,
  "W1tbNTAwNiw0M10sWzY0NjA3LDFdLFs0NTQ2NCwxXSxbMzU4MzcsMV1dXQ==",
  null,
  null,
]
```

### Components

- **Idx 1**
    reCAPTCHA Version

- **Idx 2**
    Anchor Token for Validation

- **Idx 5**
    Hashed the entire serialized fingerprint data, [Sample](https://github.com/elyelysiox/recaptcha/blob/main/hashFingerprint.js)

- **Idx 6**
    Type

    `q` → V3 Challenge
  
    `fi` → V2/Invisible Challenge
  
    `a` → Audio Challenge
  
    `qr` → Quick Response Code (new)

- **Idx 7**
    Usage patterns, contains patterns from previously solved captchas, can significantly increase the score if valid

- **Idx 8**
    Action

- **Idx 14**
    Website Key

- **Idx 16**
    Encrypted the entire serialized fingerprint data with the encryption key from anchor 
    
- **Idx 20**
    VM Delta Timing, Telematry, Website Scripts Urls and Collected Browser Objects Length + Elapsed. It's Base64-Encoded, need to add "W1" at the beginning to decode it

    ```javascript
    atob("W1tbMywwLDgyOV0sWzEs...")
    // → [[[3,0,829],[1,42,863]],[[2,727,1341.300000011921]...
    ```

    *Base Format*:
    ```
    [
      [recaptchaResources],
      [tasksTiming],
      [
          null,
          null,
          null,
          idleTimeoutDelta,
          deltaTimming
          0,
          0,
          0,
      ],
      websiteScriptsUrls,
      [collectionElapsed, browserObjectsLength]
    ]
    ```

    *TaskTimimg*:

    ```
    [
       PerformanceLongTaskTiming.name == "self" ? 2 : 4,
       PerformanceLongTaskTiming.duration,
       PerformanceLongTaskTiming.startTime
    ]
    ```

    *reCAPTCHA Resource*:

    ```
    [
       resourceType,
       duration,
       startTime
    ]
    ```

    | Resource | Type |
    |---|---|
    | `recaptcha/api.js` | 3 |
    | `recaptcha/releases/<version>` | 1 |
    | `https://www.google.com/recaptcha/api2/anchor` | 2 |
    | `https://www.google.com/recaptcha/api2/bframe` | 4 |

- **Idx 21**
    Token from the previous captcha solved

- **Idx 22**
    Hashed all brower objects keys

- **Idx 25**
    Count of `pointermove`, `pointerdown`, `pointerup`, `keydown`, `keyup`, `focusin` events in Base64-Encoded The values `​​5006`, `64607`, etc. are the hashed names of the event types

    | Hashed | Type |
    |---|---|
    | `5006` | pointermove |
    | `64607` | pointerdown |
    | `45464` | pointerup |
    | `31617` | keydown |
    | `37178` | keyup |
    | `35837` | focusin |

  *Base Format*:
    ```
    [[
      [eventType, Count],
    ]]
    ```


## Anti-debugging/Tampering
- ***Symbol-based Integrity Tag***
    reCAPTCHA set a Symbol key `Symbol(jas)` to every array and object with a numeric value used as an integrity check. Since Symbols are non-enumerable and invisible to standard cloning operations (like JSON.stringify), any attempt to replace or clone these structures loses the tag, which reCAPTCHA detects as tampering

    ![tamp](https://github.com/elyelysiox/recaptcha/blob/main/photos/849230834092888898.png)

- ***Closure Variable Capture***
    Some values ​​are intentionally scoped in an outer function and consumed only inside nested callbacks or closures, the variable never exists in the same scope where it is used

- ***Crash Source Tab***
    I'm not sure how this can be achieved, but basically when a timeout occurs (in this case due to a setInterval), for about 10-15 seconds, the source tab of devtools will crash

    https://github.com/user-attachments/assets/4ae3bf68-5ae7-4adc-a0b9-36cc11b64998

## reCAPTCHA Botguard

Although BotGuard was removed by Google, I will explain a little about how it works internally for those who are interested in how it is, and how different it is from other types of botguard

First, the token generation process: the VM generates tokens for persistent errors during execution. These errors can be due to bytecode offset deviations, missing VM registers, incorrect VM state, and poor control flow integrity. These errors are captured by the dispatcher, which calls a function that writes bytes for the token.

The VM uses ARX Cipher, an algorithm created by the NSA in 2013, similar to Speck for encrypting data. It is also used in all Google BotGuard. The algorithm changes with each version, as do the constant (3990), the order of operations and rounds. It looks like this:

```javascript
/*
D -> cipher state array
P -> seed
E -> byte index
*/
Vl = function(D, P, E, F, v) {
    F = D[3] | 0;
    D = D[2] | 0;
    for (v = 0; v < 14; v++) {
        E = E >>> 8 | E << 24;
        E += P | 0;
        E ^= D + 3990;
        P = P << 3 | P >>> 29;
        P ^= E;
        F = F >>> 8 | F << 24;
        F += D | 0;
        F ^= v + 3990;
        D = D << 3 | D >>> 29;
        D ^= F;
    }
    return [P >>> 24 & 255, P >>> 16 & 255, P >>> 8 & 255, P >>> 0 & 255, E >>> 24 & 255, E >>> 16 & 255, E >>> 8 & 255, E >>> 0 & 255];
}
```

### Byte Writer & Encryption

The main encryption function has two modes: encryption and no encryption.
The encryption mode uses ARX Cipher, Bitwise + XOR to encrypt the data and set it in a buffer. There are 4 types of buffers: 

- Main buffer `180`
- Entropy Pad buffer `353` 
- Error Buffer `304`
- PoE (Proof of Execution) buffer `243` (not used in this type of botguard).

The no-encryption mode just set already encrypted bytes to the buffer

```javascript
// (The sequence flatten messed up the statements a bit)
/*
Q -> cipher state array
FQ(v, c) -> derive a seed
c = (z << 3) - 4 -> index
FQ(v, (c | 0) + 4) -> position
*/
t = function(D, P, E, F, v, Q) {
    if (E.O == E) {
        P = function(h, A, c, x, z) {
            A = v.length; // buffer length
            z = (A | 0) - 4 >> 3;
            if (v.Jw != z) { // vm.block_index != index
                v.Jw = z; // set new block index
                c = (z << 3) - 4;
                x = [0, 0, Q[1], Q[2]];
                try {
                    v.zB = Vl(x, FQ(v, c), FQ(v, (c | 0) + 4)); // call ARX Cipher to generate keyStream
                } catch (V) {
                    throw V;
                }
            }
            v.push(v.zB[A & 7] ^ h); // sets A to bits 0-7, and obtains a byte from the keystream and applies xor with a byte of the data to be encrypted
        };
        v = Z(P, E); // get buffer
        if (P == 180 || P == 243 || P == 353) { 
            Q = Z(189, E);
        } else { // set encripted bytes to buffer
            P = function(h) {
                v.push(h);
            };
        }
        F && P(F & 255);
        E = D.length;
        for (F = 0; F < E; F++) {
            P(D[F]);
        }
    }
}
```

And this is the function that handles errors and calls the byte writer

```javascript
// (The sequence flatten messed up the statements a bit)

p = function(D, P, E, F, v, Q, h, A) {
    D = E[1];
    A = E[2];
    Q = Z(465, P) >> 3; 
    h.push(D, Q >> 8 & 255, Q & 255); // error code/header bytes
    E.message && (D += E.message);
    A = void 0;
    E && E[0] === U && (E = void 0);
    h = Z(244, P);
    h.length == 0 && (A != void 0 && h.push(A & 255));
    D = "";
    E && (E.stack && (D += ":" + E.stack));
    E = Z(0, P); // buffer size limit (2048)
    if (!P.TB && E[0] > 3) {
        D = D.slice(0, (E[0] | 0) - 3); 
        E[0] -= (D.length | 0) + 3;  // reduce size limit
        D = Pv(D);
        E = P.O;
        P.O = P;
        try {
            v = (v = Z(304, P)) && v[v.length - 1] || 95;
            if (P.n3) {
                // this path is never executed
                (F = Z(123, P)) && F[F.length - 1] == v || t([v & 255], 123, P);
            } else {
                t([95], 304, P); // set byte to error buffer
            }
            t(O(2, D.length).concat(D), 180, P, 9); // set bytes to main buffer
        } finally {
            P.O = E;
        }
    }
}
```


At the end of the execution, the VM calls the main function that prepares the payload with these buffers and generates the token, which is a signature.
Unlike other BotGuard VM, this VM does not have a fingerprinting system, Google Botguard nor does it perform these error-emitting + writing bytes, and is much simpler and easier to reverse engineer.

## Disclaimer

This repository is exclusively for educational and research purposes. The code, techniques, and concepts presented here are intended for the academic study and understanding of the topics covered.
