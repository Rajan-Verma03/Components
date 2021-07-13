import React, {Component} from "react";
import {FileIcon, defaultStyles} from 'react-file-icon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Box, CardActionArea, CardMedia, Divider, Grid, Typography} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';


class FileCoverGroup extends Component {
    render() {
        const {children} = this.props;
        return (
            <Grid container spacing={1} {...this.props}>
                {children.map((child, key) => {
                    return <Grid lg={3} md={3} sm={4} xs={4} key={key} item>
                        {child}
                    </Grid>
                })}
            </Grid>
        );
    }
}


export default FileCoverGroup;