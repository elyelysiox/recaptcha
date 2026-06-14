const finalValue = (document.body.innerText.match(/try again|incorrect|invalid|declined/gi) || []).length

console.log(finalValue)
