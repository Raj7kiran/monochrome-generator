# monochrome-generator

Generate monochrome color variations from RGB or HEX input.

## Installation

```bash
npm install monochrome-generator
```

## Usage
```bash
import monochromeGenerator from 'monochrome-generator';

const shades = monochromeGenerator('rgb(100, 100, 100)', 5, 'lighten', 10);
console.log(shades);


