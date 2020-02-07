# A2-Viewer
Script to view the A2 submissions more easily.


## How to use

This script requires you to have some relatively modern version of Node.js installed (6+, if you've installed in the last 2-3 years it should be fine).

### Running

Download this repo. 

Run: 

```
$ node index.js <path-to-a-students-unzipped-submission-folder>
```

This will create a new file, `index.html`, which you can then load in your web browser. To do this either run `open index.html` in the command line, or double click the `index.html` filename. 

_Note the HTML output must be opened with the file:// protocol, not http://_


### Options

If you prefer to customize the name of the generated file:

```
$ node index.js <path-to-a-students-unzipped-submission-folder> my-custom-output-name.html
```

