var tag = document.createElement('script');
    
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playeractive; 
var player;
var divid;

function startClick(id,playertarget,playerVideoId) {
    startAttempt(id,playertarget,playerVideoId);
}

function loadVideo(id,playertarget,playerVideoId) {    
    divid = id;

    player = new YT.Player(`${playertarget}`, {
        height: '100%', 
        width: '100%', 
        videoId: `${playerVideoId}`, 
            playerVars: {
            'playsinline': 1,
            },
        events: {
            'onReady': startFunction,
            'onStateChange': onPlayerStateChange
        }
    });
}   

function startAttempt(id,playertarget,playerVideoId) {   
    if(playeractive == 1) { 
        stopClick(divid);
        startClick(id,playertarget,playerVideoId);
    } 
    else if(playeractive == undefined)
    {  
        loadVideo(id,playertarget,playerVideoId);
    }
}

function startFunction() {   
    playeractive = 1;
    player.mute(); player.seekTo(1, true);  
    divid.style.display = "block"; 
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
   setTimeout(unMuteVideo, 1000);
  }
}

function unMuteVideo() { 
    player.unMute();
}

function stopClick(divid) { 
    playeractive = undefined;
    stopVideo(divid);
}

function stopVideo(divid) { 
    divid.style.display = "none"; 
    player.stopVideo(); 
    player.destroy();   
}