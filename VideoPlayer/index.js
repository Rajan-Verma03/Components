import ReactPlayer from 'react-player'

import React from "react";

import {withStyles} from "@material-ui/core/styles";

const styles = {
    player: {
        position: 'absolute',
        top: 0,
        left: 0
    }
}
const VideoPlayer = ({id, type, classes, ...props}) => {
    let url = id;
    if (type.toLowerCase() === "youtube") {
        url = "https://www.youtube.com/watch?v=" + id;
    }
    return (<div style={{
        position: 'relative',
        'padding-top': '56.25%'
    }}><ReactPlayer controls className={classes.player} width={"100%"} height={"100%"} url={url} {...props} /></div>);
}

export default withStyles(styles)(VideoPlayer);