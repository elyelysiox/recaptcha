const nd =
  /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

function getScriptHost(url) {
  const m = String(url).match(nd);
  return m[3]; // host component
}

const result = Array.from(
  new Set(
    Array.from(document.scripts).map(function (script) {
      return script && script.hasAttribute && script.hasAttribute("src")
        ? getScriptHost(script.getAttribute("src"))
        : "_";
    }),
  ),
)
  .slice(0, 25)
  .join(",");
