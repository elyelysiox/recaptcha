const loc = window.location;
const locStr = Array.from(loc.toString()).slice(0, 100).join("");
const finalValue = locStr.length % 2 == 0 ? 5 : 4;

console.log(finalValue);
