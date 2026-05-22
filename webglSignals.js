const canvas = document.createElement("canvas");

const gl =
  canvas.getContext("webgl") ||
  canvas.getContext("experimental-webgl") ||
  canvas.getContext("webgl2");

const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
const vendor = debugInfo
  ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
  : gl.getParameter(gl.VENDOR);

const renderer = debugInfo
  ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  : gl.getParameter(gl.RENDERER);
const extensions = gl.getSupportedExtensions() || [];

const finalValue = JSON.stringify([vendor, renderer, extensions.length]);
console.log(finalValue);
