import {FileIcon, defaultStyles} from "react-file-icon";
import {Box, CardActionArea, CardHeader, CardMedia, Divider, Tooltip, Typography} from "@material-ui/core";
import React from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CardContent from "@material-ui/core/CardContent";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';


const getIconType = (url) => {
    let lastIndex = url ? url.lastIndexOf('.') : -1;
    if (lastIndex !== -1) {
        return url.substring(lastIndex + 1);
    }
    return 'file';
}

const DocFileCover = ({type, url, onClick, height, path, deleteAllowed, onDelete, title, thumbnail}) => {
    let isImage = type != null && type.indexOf('image') !== -1;
    let iconType = getIconType(path || url);
    return <>
        {
            deleteAllowed &&
            <CardHeader className={"p-0 pt-10 pr-5"}
                        action={<IconButton color={'primary'} size={"small"} style={{float: 'right'}}>
                            <CancelIcon onClick={onDelete} style={{padding: 2, height: 25, width: 30,}}/>
                        </IconButton>}/>
        }
        <CardActionArea onClick={onClick} target={"_blank"} href={url}>
            <CardMedia style={{"height": (isImage && height || 100), "position": "relative"}}>
                {
                    isImage ? <img width={"100%"} height={"100%"} alt={title} src={thumbnail}/> :
                        <Box className={"text-center"}

                             style={{
                                 transform: 'translate(-50%, -50%)',
                                 "position": "absolute",
                                 top: '50%',
                                 left: '50%',
                                 height: 50,
                                 width: 60
                             }}>

                            <FileIcon extension={iconType} {...defaultStyles[iconType]}/>

                        </Box>
                }
            </CardMedia>
            <Divider/>
            <CardContent className={"pb-0 pt-0"}>
                <Typography color={"textSecondary"} variant={"subtitle2"} noWrap>
                    {title}
                </Typography>
            </CardContent>
        </CardActionArea>
    </>
}

export default DocFileCover;
