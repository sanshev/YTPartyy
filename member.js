
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      //'onStateChange': onPlayerStateChange
    }
  });
}

var video = {
  status: null,
  time: 0,
  newUser: false
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //writeUserData(video)
  //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
/*var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}*/
function stopVideo() {
  player.stopVideo();
}

function pauseVideo() {
    player.pauseVideo();
  }


  var firebaseConfig = {
    apiKey: "AIzaSyBkOQWzjmNV7cyCUWuxL_roHrwQu45GMgc",
    authDomain: "ytparty-52b1f.firebaseapp.com",
    databaseURL: "https://ytparty-52b1f.firebaseio.com",
    projectId: "ytparty-52b1f",
    storageBucket: "ytparty-52b1f.appspot.com",
    messagingSenderId: "426300772833",
    appId: "1:426300772833:web:f45edf4ab4bca98bd382a0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function writeUserData(video) {
    firebase.database().ref().set({
      video
    });
  }
  
 var messagesRef = firebase.database().ref();

 messagesRef.on('child_changed', function(data) {
    var newPost = data.val();
    video.status=newPost.status
    video.time=newPost.time
    video.newUser=newPost.newUser
    console.log(video)
    console.log(newPost.status)
    if(newPost.status=='play'){
        player.playVideo();
    }
    if(newPost.status=='pause'){
        player.pauseVideo();
    }
    if(newPost.time!=0){
        if(newPost.status=='play'){
            player.seekTo(newPost.time, true)
        }
        else if(newPost.status=='pause'){
            player.seekTo(newPost.time, false)
        }
    }
});

function reqHost(){
  video.newUser=true
  console.log(video)
  writeUserData(video)
}

  