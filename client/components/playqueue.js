import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "./videoplayer";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    fontSize:'20px',
    backgroundColor:'#101b61',
    color:'white',
    margin:'1px',
    boxShadow: '0 4px 12px rgb(52 235 229 / 50%)',
    maxHeight: '100px',
    display:'flex',
    alignItems:'center',
    padding:'1px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
});

class PlayQueue extends React.Component {
  constructor() {
    super();
  }

  

  render() {
    const { queue, isAdmin, classes } = this.props;
    let topThree = queue.slice(0, 3);
    console.log(queue);
    return (
      <div id="playerBar">
        {isAdmin ? (
          <div id="playerBarItems">
            <div id="player">
              {queue.length > 0 ? (
                <VideoPlayer videoId={queue.length ? queue[0].videoId : ""} />
              ) : (
                <img id="placeholder" src="../placeholder.jpg" />
              )}
            </div>
            {topThree.length>0?(
            <div id="topThree">
                <h1 style={{fontSize:'3rem', fontFamily: 'Passion One'}}>TOP 3</h1>
                {topThree.map((song) => {
                  return (
                    <Card key={song.id} className={classes.root}>
                      <img src={song.image} style={{height:'75px',width:'100px'}}></img>
                      <p>{song.name}</p>
                    </Card>
                  );
                })}
            </div>):('')}
          </div>
        ) : (
          <div>
            {queue.length > 0 ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3>{queue[0].name}</h3>
                  <img id="largeThumbnail" src={queue[0].largeImage} />
                  <h3>CURRENTLY PLAYING</h3>
                </div>
                <div id="topThree">
                  <p>Hi</p>
                </div>
              </div>
            ) : (
              <div>
                <img id="placeholder" src="../placeholder.jpg" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
    queue: state.queue,
  };
};

export default withStyles(styles)(connect(mapState)(PlayQueue));
