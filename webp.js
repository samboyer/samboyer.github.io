var imagemin = require("imagemin"),
  webp = require("imagemin-webp"),
  fs = require("fs"),
  path = require('path');

var imageDir = 'img';

// https://www.peterbe.com/plog/nodejs-fs-walk-or-glob-or-fast-glob
function walkDirs(directory, filepaths = []) {
  filepaths.push(directory);
  const files = fs.readdirSync(directory);
  for (let filename of files) {
      const filepath = directory+'/'+filename;
      if (fs.statSync(filepath).isDirectory()) {
          walkDirs(filepath, filepaths);
      }
  }
  return filepaths;
}

var dirs = walkDirs(imageDir);
console.log(dirs);

(async () => {
  var files=[];
  for(var dir of dirs){
    files.push(await imagemin([dir+'/*.png'], {
      destination: dir,
      plugins: [
        webp({lossless: true})
      ]
    }));
    
    files.push(await imagemin([dir+'/*.jpg'], {
      destination: dir,
      plugins: [
        webp({quality: 80})
      ]
    }));
  }
  for(var file of files){
    console.log(file.sourcePath);
  }
  
  })();
