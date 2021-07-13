import {Box, CardActionArea, CardMedia, Divider, Typography} from "@material-ui/core";
import React from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CardContent from "@material-ui/core/CardContent";

const LinkFileCover = ({title, url}) => {
    return<CardActionArea target={"_blank"} href={url}>
        <CardMedia style={{"height": 100, "position": "relative"}}>
            <Box className={"text-center"}
                 style={{
                     transform: 'translate(-50%, -50%)',
                     "position": "absolute",
                     top: '50%',
                     left: '50%',
                     height: 40,
                     width: 40
                 }}>
                <AttachFileIcon/>
            </Box>
        </CardMedia>
        <Divider/>
        <CardContent className={"pb-0 pt-0"}>
            <Typography color={"textSecondary"} variant={"subtitle2"} noWrap>
                {title}
            </Typography>
        </CardContent>
    </CardActionArea>
}

export default LinkFileCover;
