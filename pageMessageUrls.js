let urls = new Set();

window.addEventListener("message", (event) => {
  urls.add(event.origin);

  console.log(Array.from(urls).join(",")); // print
});
