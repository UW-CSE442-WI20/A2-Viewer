


/**
 * What this does:
 *
 * Identifies all image files in a directory and builds an
 * ordered list.
 *
 * Creates an HTML page with those files.
 *
 *
 */


const fs = require('fs');
const path = require('path');

let dirname;

try {
  dirname = process.argv[2];
} catch (e) {
  console.log("couldn't establish directory name. Make sure to run this script like `node index.js <directory>");
}

let outputName;
try {
  outputName = process.argv[3] ? process.argv[3] : 'index.html';
} catch (e) {
  outputName = 'index.html'
}
console.log(`Using ${outputName} as output file name.`);


const dir = path.resolve(dirname);
console.log(dir)

const files = fs.readdirSync(dir);

const fileTypes = ['.png', '.jpeg', '.jpg', '.gif'];

const outputFiles = [];

files.forEach((file) => {
  const match = fileTypes.some((t) => {
    return path.extname(file).toLowerCase() === t;
  });

  if (match) {
    outputFiles.push({
      order: +path.parse(file).name,
      filename: path.join(dir, file)
    })
  }
})


outputFiles.sort((a, b) => {
  return a.order - b.order;
})
console.log(outputFiles)


const output = `<html>
<head>

</head>

<body>
  <div>
    <img id="img-holder" src="file://${outputFiles[0].filename}" style="max-width:90vw; max-height:80vh" />
  </div>
  <div>
    <button onclick="prev()" style="position:fixed; bottom:1em; left: 1em; font-size: 1.3em;">
      Previous
    </button>
    <button onclick="next()" style="position:fixed; bottom:1em; right: 1em;  font-size: 1.3em;">
      Next
    </button>
  </div>
  <div style="position:fixed; bottom:1em; left: 45vw;  font-size: 1.3em;">
    Currently showing file <span id="currently-showing">1</span>/${outputFiles.length}.
  </div>
  <script>
    var currentlyShowing = 0;
    var currentlyShowingElt = document.getElementById('currently-showing');
    var imageElt = document.getElementById('img-holder');

    var files = ${JSON.stringify(outputFiles)};

    function next() {
      currentlyShowing = (currentlyShowing + 1);
      if (currentlyShowing >= files.length) {
        currentlyShowing = files.length - 1;
      }
      console.log('next', currentlyShowing);
      setImage();
    }

    function prev() {
      currentlyShowing = (currentlyShowing - 1);
      if (currentlyShowing < 0) {
        currentlyShowing = 0;
      }
      console.log('prev', currentlyShowing);
      setImage();
    }

    function setImage() {
      currentlyShowingElt.textContent = (currentlyShowing + 1);
      imageElt.src = 'file://' + files[currentlyShowing].filename;
      console.log('updated', currentlyShowing);
    }

  </script>
</body>
</html>
`


fs.writeFileSync(outputName, output);

