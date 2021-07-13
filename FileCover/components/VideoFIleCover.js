import {FileIcon} from "react-file-icon";
import {Box, CardActionArea, CardMedia, Divider, Typography} from "@material-ui/core";
import React from "react";
import {getVideoThumbnail} from 'Helpers/helpers';
import CardContent from "@material-ui/core/CardContent";

const VideoFileCover = ({type, url, title}) => {
    return <CardActionArea target={"_blank"} href={"https://www.youtube.com/watch?v=" + url}>
        <CardMedia style={{"height": 100, "position": "relative"}}>
            <img width={"100%"} height={"100%"} alt={title} src={getVideoThumbnail(type, url)}/>
        </CardMedia>
        <Divider/>
        <CardContent className={"pb-0 pt-0"}>
            <Typography color={"textSecondary"} variant={"subtitle2"} noWrap>
                {title}
            </Typography>
        </CardContent>
    </CardActionArea>
}

export default VideoFileCover;