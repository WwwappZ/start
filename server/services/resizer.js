const sharp = require('sharp');
function resizer(dir, image) {
  var formates = [1440, 1080, 720, 480];
  const resize = size => sharp(dir+ image).resize(size, null).toFile(`${dir}/${size}/${image}`);
  return new Promise(function(resolve, reject) {
    Promise.all(formates.map(resize)).then((data) => {
      resolve(data);
    });
  });
}
module.exports = resizer;
