// Build script to make webp equivalents of all images

const imagemin = require("imagemin"),
  webp = require("imagemin-webp"),
  fs = require("fs");

const root = 'img';
const exclude = ['img/favicon'];

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

var dirs = walkDirs(root);
// console.log(dirs);

(async () => {
  var files=[];
  for(var dir of dirs){
    if(exclude.includes(dir)) continue;

    files.push(...await imagemin([dir+'/*.png'], {
      destination: dir,
      plugins: [
        webp({lossless: true})
      ]
    }));

    files.push(...await imagemin([dir+'/*.jpg'], {
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
