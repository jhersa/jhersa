const fs = require("fs");
const hexSorter = require("hexSorter");
const ejs = require("ejs");
const templatePath = "README.ejs";
const outputFilePath = "README.md";
const tools = require("./tools");
const list = [];

function main() {
  const tags = [];
  const hexs = [];
  tools.forEach((i) => {
    list.push({
      tag: etiquetador(i),
      rgb: hexToRGB(i.color),
      hex: "#" + i.color,
    });
  });

  list.forEach((i) => {
    hexs.push(i.hex);
  });

  const hexOrder = hexSorter.sortColors(hexs, "mostBrightColor");

  list.forEach((i) => {
    hexOrder.forEach((j) => {
      if (i.hex === j) {
        tags.push(i.tag);
      }
    });
  });

  ejs.renderFile(templatePath, { tools: tags }, (err, contenidoMarkdown) => {
    if (err) throw err;

    fs.writeFile(outputFilePath, contenidoMarkdown, (err) => {
      if (err) throw err;
      console.log(`Archivo ${outputFilePath} ha sido creado con éxito.`);
    });
  });
}

// function compareColors(color1, color2) {
//   // Calcula la suma de los valores RGB de cada color
//   const sumColor1 = color1.rgb.r + color1.rgb.g + color1.rgb.b;
//   const sumColor2 = color2.rgb.r + color2.rgb.g + color2.rgb.b;

//   // Compara las sumas para determinar el orden
//   return sumColor1 - sumColor2;
// }

function hexToRGB(hex) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // return { r, g, b };
  return { r, g, b };
}

function etiquetador(array) {
  const etiqueta =
    '<img alt="' +
    array.logo +
    '" src="https://img.shields.io/badge/' +
    "" +
    array.badgeContent +
    "-" +
    array.color +
    "?style=flat-square&logo=" +
    array.logo +
    "&logoColor=" +
    array.logoColor +
    '" />';

  return etiqueta;
}

main();
