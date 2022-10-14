var message="hello message";
function foo(){
  console.log(message)//"hello message"
}

function bar(){
  var message="hello bar";
  foo();
}
bar()

//m3u8
var video = document.getElementById("video");
      getVideo().then((data) => {
        console.log(data);
        var videoSrc = "http://localhost:8888/video/source/app";
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoSrc;
        }
      });
const filePath = path.resolve(__dirname, "../../", "./upload/video/a.m3u8");
    ctx.set("content-type", "application/vnd.apple.mpegurl");
    ctx.body = fs.createReadStream(filePath);
    // ctx.body = {
    //   url:"http://localhost:8888/a.m3u8"
    // };
