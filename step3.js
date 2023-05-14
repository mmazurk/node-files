const fs = require("fs");
const axios = require("axios");

// I had to add the callback function in order to
// deal with the async nature of fs.readFile()

function cat(path, callback) {
  fs.readFile(`${path}`, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}:`, err);
      process.exit(1);
    }
    callback(data);
  });
}

// I had to add the callback function in order to
// deal with the async nature of axios

function webCat(url, callback) {
  axios
    .get(url)
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

for (let arg of process.argv) {
  if (arg.includes("node")) {
    continue;
  }
  if (arg.includes("--out")) {
    currentArgIndex = process.argv.indexOf(arg);
    newfileName = process.argv[currentArgIndex + 1];
    readfileOrUrl = process.argv[currentArgIndex + 2];

    processArg(readfileOrUrl, newfileName);
    break;
  }
  if (arg.includes("//")) {
    webCat(arg, (text) => {
      console.log(text);
    });
  } else {
    cat(arg, (text) => {
      console.log(text);
    });
  }
}

function processArg(readfile, newfile) {
  if (readfile.includes("//")) {
    webCat(readfile, (text_content) => {
      // you need to just extract the text
      let textContent = text_content.data;
      fs.writeFile(newfile, textContent, (err) => {
        if (err) {
          console.error(err);
        }
      });

      console.log(
        `Finished writing ---- ${text_content} ---- to ${newfile} ... `
      );
    });
  } else {
    cat(readfile, (text_content) => {
      fs.writeFile(newfile, text_content, (err) => {
        if (err) {
          console.error(err);
        }
      });

      console.log(
        `Finished writing ---- ${text_content} ---- to ${newfile} ... `
      );
    });
  }
}

// node step3.js --out two.txt one.txt
// node step3.js --out two.txt http://www.google.com
