import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "./videoplayer";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const styles = () => ({
  root: {
    backgroundColor: "#050e4a",
    color: "white",
    overflow: "hidden",
    width: "100%",
  },
  topSong: {
    backgroundColor: "#471061",
    color: "white",
    overflow: "hidden",
    width: "100%",
  },
  songName: {
    maxWidth: "375px",
    padding: "0 0 0 1em",
    fontFamily: "Eight Bit",
    opacity: "80%",
    // animation: 'floatText 12s infinite linear',
    // paddingLeft: '100%', /*Initial offset, which places the text off-screen*/
  },
});

const PlayQueue = (props) => {
  const _classes = styles();
  const _useStyles = useStyles();
  const { queue, isAdmin, classes } = props;
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
          {topThree.length > 0 ? (
            <div id="topThree">
              <h1>top 3</h1>
              {topThree.map((song) => {
                return (
                  <div id="topThreeItem">
                    <img src={song.image}></img>
                    <Card
                      key={song.id}
                      className={
                        song.rank === 1 ? classes.topSong : classes.root
                      }
                    >
                      <p className={classes.songName}>{song.name}</p>
                    </Card>
                  </div>
                );
              })}
              <div>
                <Button variant="contained" color="primary">
                  Skip Song
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
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
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
    queue: state.queue,
  };
};

export default withStyles(styles)(connect(mapState)(PlayQueue));
