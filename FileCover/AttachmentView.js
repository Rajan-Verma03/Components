import {Box, CardActionArea, CardMedia, Divider, Typography} from "@material-ui/core";
import React from "react";
import FileCover from "./FileCover";
import FileCoverGroup from "./FileCoverGroup";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import IntlMessages from "../../util/IntlMessages";
import DialogContent from "@material-ui/core/DialogContent";

const AttachmentView = ({attachments, label, onDelete, deleteAllowed, ...props}) => {
    return <Box {...props}>
        <Box display={"flex"} flexDirection={"row"}>
            <AttachFileIcon/>
            <Typography variant="body2" color="textSecondary" component="span">
                <IntlMessages id={label}/>
            </Typography>
        </Box>
        <Box>
            <FileCoverGroup className={"pt-20"}>
                {
                    attachments.map((attachment, key) => {
                            let file = attachment.file;
                            let type = attachment.source;
                            let url = attachment.link;
                            let thumbnail;
                            let path;
                            if (file && (type == null || type.toLowerCase() === 'attachment')) {
                                url = file.url;
                                thumbnail = file.serving_url || url;
                                type = file.ctype || file.type;
                                path = file.path;
                            }
                            return <FileCover path={path} key={key} url={url} onDelete={() => {
                                onDelete(attachment)
                            }} deleteAllowed={deleteAllowed}
                                              title={attachment.title}
                                              type={type} thumbnail={thumbnail}/>;
                        }
                    )
                }
            </FileCoverGroup>
        </Box>
    </Box>


}

export default AttachmentView;
