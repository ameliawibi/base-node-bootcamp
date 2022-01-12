import { readFile, writeFile } from "fs";
import { hexToRgb , rgbToHex } from "./colorConvert.js";
const filename = "styles.css";
const regexHex = /#\w+/gm;
const regexRgb = /rgb(\((\d+), (\d+), (\d+)\))/gm;

/**
 * Split text by lines, add a number to the end of each line, return new text.
 * @param text - Original string
 * @returns modified string
 */
const replaceHexwithRgb = (text) => {
  // Split text into array where each element is new line.
  const lines = text.split("\n");

  let newText = "";

  for (let i = 0; i < lines.length; i += 1) {
    if (regexHex.test(lines[i]) === false) {
      newText += lines[i];
      //continue;
    }
    else {
    //find the color to convert
    let foundColor = lines[i].match(regexHex);
    console.log(foundColor);
    // replace color with another format
    newText += lines[i].replace(regexHex,hexToRgb(foundColor));
    }
    newText += '\n';
  }
  // Return modified text
  return newText;
};

const replaceRgbwithHex = (text) => {
  // Split text into array where each element is new line.
  const lines = text.split("\n");

  let newText = "";

  for (let i = 0; i < lines.length; i += 1) {
    if (regexRgb.test(lines[i]) === false) {
      newText += lines[i];
      //continue;
    }
    else {
    //find the color to convert
    let foundColor = lines[i].match(regexRgb);
    console.log(foundColor);
    // replace color with another format
    newText += lines[i].replace(regexRgb,rgbToHex(foundColor));
    console.log(lines[i].replace(regexRgb,rgbToHex(foundColor)))
    }
    newText += '\n';
  }
  // Return modified text
  return newText;
};


/**
 * Process content and write new content back to original file
 * @param readErr - Reading error if any
 * @param content - Original file content
 * @returns undefined
 */
const handleFileRead = (readErr, content) => {

  // Catch reading error if any
  if (readErr) {
    console.log("reading error", readErr);
  }

  let newContent = "";
  // Process content
  if(regexHex.test(content) === true) {
    newContent = replaceHexwithRgb(content);
  }
  else {
    newContent = replaceRgbwithHex(content);
  }

  const handleFileWrite = (writeErr) => {
    // Catch writing error if any
    if (writeErr) {
      console.log("error writing", writeErr);
      return;
    }
    console.log("success!");
  };

  // Write processed content back to the file, replacing old content
  writeFile(filename, newContent, handleFileWrite);

};

readFile(filename, "utf-8", handleFileRead);

//sample command: node index.js
