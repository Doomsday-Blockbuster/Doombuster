import React from "react";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.video = "JwPwZ98c26o"; //video id
  

  // let player;
  // onYouTubeIframeAPIReady() {
  //   player = new YT.Player('player', {
  //     height: '390',
  //     width: '640',
  //     videoId: 'M7lc1UVf-VE',
  //     events: {
  //       'onReady': onPlayerReady,
  //       'onStateChange': onPlayerStateChange
  //     }
  //   });
  // }
    window["onYouTubeIframeAPIReady"] = (e) => {
      this.YT = window["YT"];
      // this.reframed = false;
      this.player = new window["YT"].Player("player", {
        height:'200',
        width:'400',
        videoId: this.video,
         events: {
           onStateChange: this.onPlayerStateChange.bind(this),
        //   onError: this.onPlayerError.bind(this),
        //   onReady: (e) => {
        //     if (!this.reframed) {
        //       this.reframed = true;
        //       reframe(e.target.a);
        //     }
        //   },
        },
      });
    };
  }
  render() {
    const style = `.max-width-1024 { max-width: 1024px; margin: 0 auto; }`;
    return (
      <div>
        {/* <style>{style}</style> */}
        {/* <div className="max-width-1024"> */}
          <div
            className="embed-responsive embed-responsive-16by9"
            id="player"
          ></div>
        {/* </div> */}
      </div>
    );
  }
  init() {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onPlayerStateChange(event) {
    console.log(event);
    switch (event.data) {
      case window["YT"].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log("started " + this.cleanTime());
        } else {
          console.log("playing " + this.cleanTime());
        }
        break;
      case window["YT"].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log("paused" + " @ " + this.cleanTime());
        }
        break;
      case window["YT"].PlayerState.ENDED:
        console.log("ended ");
        break;
    }
  }
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }
  // onPlayerError(event) {
  //   switch (event.data) {
  //     case 2:
  //       console.log("" + this.video);
  //       break;
  //     case 100:
  //       break;
  //     case 101 || 150:
  //       break;
  //   }
  // }
 }

export default VideoPlayer;
