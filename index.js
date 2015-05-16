var wallpaper = require('wallpaper');
var got = require('got')
var Download = require('download');
var _ = require('underscore');

console.log("Loading r/wallpapers");

got('https://www.reddit.com/r/wallpapers/.json', function(err, data, res) {
    
  var posts = JSON.parse(data).data.children;

  // get only the raw imgur images
  var posts = _.filter(posts, function(p) { return /i\.imgur\.com/.test(p.data.url)});

  // pick a random one
  var randomPost = _.sample(posts).data;

  console.log('Wallpaper picked: ' + randomPost.url);

  console.log('Downloading file...');

  new Download()
  .get(randomPost.url)
  .dest('wallpapers')
  .run(
      function(err, file) {
        var path = file[0].path;
        console.log('Downloaded! Setting the wallpaper...')
        wallpaper.set(path, function(err) {
          console.log('Done!');
        });
      }

    )

});
