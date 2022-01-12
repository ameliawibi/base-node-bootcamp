export function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  return result ? `rgb(${r}, ${g}, ${b})` : null;
}

export function rgbToHex(rgb) {
  let result = /rgb(\((\d+), (\d+), (\d+)\))/.exec(rgb);
  return result
    ? "#" +
        (
          (parseInt(result[2]) << 16) +
          (parseInt(result[3]) << 8) +
          parseInt(result[4])
        ).toString(16).padStart(6,'0')
    : null;
}