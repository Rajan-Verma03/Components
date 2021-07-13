import React, {Component} from "react";

import Card from '@material-ui/core/Card';

import VideoFileCover from "./components/VideoFIleCover";
import LinkFileCover from "./components/LinkFIleCover";
import DocFileCover from "./components/DocFIleCover";
import {Tooltip} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';

class FileCover extends Component {
    render() {
        const {title, url, type, thumbnail} = this.props;
        let CoverComponent;
        switch (type.toLowerCase()) {
            case 'youtube':
                CoverComponent = <VideoFileCover {...this.props}/>
                break;
            case 'link':
            case 'externallink':
                CoverComponent = <LinkFileCover {...this.props}/>
                break;
            default:
                CoverComponent = <DocFileCover {...this.props}/>
                break;
        }
        return (

            <Tooltip title={title}>
                <Card style={{width: '100%'}} variant={"outlined"}>

                    {CoverComponent}

                </Card>
            </Tooltip>
        );
    }
}


export default FileCover;
