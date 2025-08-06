/**
 * Generates a monochrome color palette based on the input color.
 *
 * @param {string} color - A color string in the format "rgb(r, g, b), #rgb or #rrggbb".
 * @param {number} limit - The number of monochrome variations to generate.
 * @returns {string[]} An array of monochrome color strings in RGB format.
 */

//convert hex to [r, g, b]
const hexToRgb = (hex) => {
    hex = hex.replace('#', '');

    //#rgb to #rrggbb
    if(hex.length === 3){
        hex = hex.split('').map(h => h + h).join('');
    }

    if(hex.length !== 6){
      throw new Error('Invalid hex color format.');
    }

    const bigint = parseInt(hex, 16);

    return[
      (bigint >> 16) & 255, //r
      (bigint >> 8) & 255,  //g
      bigint & 255,         //b
    ]
}

//parse rgb(r,g,b) to [r, g, b]
const parseRgbString = (color) => {
    return color.slice(4, -1).split(',').map(c => parseInt(c.trim()));
};

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const monochromeGenerator = (color, limit) => {
  let r, g, b;

  if (color.startsWith('#')) {
    [r, g, b] = hexToRgb(color);
  } else if (color.startsWith('rgb')) {
    [r, g, b] = parseRgbString(color);
  } else {
    throw new Error('Color must be in hex (#RRGGBB, #RGB) or rgb(r, g, b) format.');
  }

  const result = [];
  let r_offset = (r > 127) ? -5 : 5;
  let g_offset = (g > 127) ? -5 : 5;
  let b_offset = (b > 127) ? -5 : 5;

  for (let i = 0; i < limit; i++) {
    r += r_offset;
    g += g_offset;
    b += b_offset;

    if (r > 255 || r < 0) {
      r_offset = -r_offset;
      r = clamp(r, 0, 255);
    }
    if (g > 255 || g < 0) {
      g_offset = -g_offset;
      g = clamp(g, 0, 255);
    }
    if (b > 255 || b < 0) {
      b_offset = -b_offset;
      b = clamp(b, 0, 255);
    }
    result.push(`rgb(${r}, ${g}, ${b})`);
  }
  return result;
};

export default monochromeGenerator;
