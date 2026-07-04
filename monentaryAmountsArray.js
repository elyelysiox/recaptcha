const pageContent = document.body.innerText.slice(0, 5000);

const yearPattern = /([^\/]([^\d]([\d]|[\d]{4})?[\.…:\-]\ ?|(\ (with|in)..?))[\d]{4}[^\d\-])/i;
const currencyNearTotal = /total[\S\s]{0,20}?(((R\$|\$|€|£|USD|EUR)\s*[\d\.,]+)|[\d\.,]+\s*(€|USD|EUR))/gi;
const currencyPattern = /(((R\$|\$|€|£|USD|EUR)\s*[\d\.,]+)|[\d\.,]+\s*(€|USD|EUR))/;

const offset = 137; // [-7614991, 137] from anchor conf [10] 

function extractLastFourDigits(source) {
    const found = source.match(yearPattern);
    if (!found || !found[1]) {
        return "";
    }

    return found[1].replace(/\D/g, "").slice(-4);
}

function encodeValue(prefix) {
    return (
        (parseFloat(prefix + pageContent.substring(0, 4) - offset) ^ offset)
            .toString(35)
    );
}

const lastDigits = extractLastFourDigits(pageContent);

let finalValue = lastDigits ? new Array(6) : new Array(3);

if (lastDigits) {
    finalValue[5] = encodeValue(a);
}

const totalMatches = [...pageContent.matchAll(currencyNearTotal)];
finalValue[2] = totalMatches.length > 0 ? totalMatches[0][1] : "";

const firstCurrency = pageContent.match(currencyPattern);
finalValue[3] = firstCurrency ? firstCurrency[1] : "";

console.log(JSON.stringify(finalValue));
