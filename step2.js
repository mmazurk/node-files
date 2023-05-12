const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(`${path}`, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}:`, err);
      process.exit(1);
    }
    console.log(data);
  });
}

function webCat(url) {
  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response);
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
  if (arg.includes("//")) {
    webCat(arg)
  } else {
    cat(arg)
  }
}
