import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Box, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import withWidth from '@material-ui/core/withWidth';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Popover} from '@material-ui/core'

const styles = {
    moreIcon: {},
    menuItem: {}
}

class ResponsiveButtonGroup extends React.Component {
    state = {}

    handleMoreIconClick(e) {
        this.setState({moreAnchorEl: e.currentTarget});
    }

    handleMoreMenuClose() {
        this.setState({moreAnchorEl: null});
    }

    render() {
        const {moreAnchorEl} = this.state;
        const {children, width, classes, className} = this.props;
        const childCount = children.length;

        const visibleButtonCount = this.props[width] || (width === "lg" ? 5 : 0);

        const moreButtonCount = childCount - visibleButtonCount;

        return <Box className={className} display={"flex"} flexDirection={"row"}>
            {
                children.map((child, index) => {
                    if (index < visibleButtonCount) {
                        return child;
                    }
                })
            }
            {
                (moreButtonCount > 0) &&
                <>
                    <IconButton
                        color={"primary"}
                        onClick={this.handleMoreIconClick.bind(this)}
                        className={classes.moreIcon}
                    >
                        <MoreIcon/>
                    </IconButton>
                    <Popover className={classes.menuItem}
                             anchorEl={moreAnchorEl}
                             anchorOrigin={{
                                 vertical: 'bottom',
                                 horizontal: 'center',
                             }}
                             id={"more"}
                             keepMounted
                             transformOrigin={{
                                 vertical: 'top',
                                 horizontal: 'center',
                             }}
                             open={moreAnchorEl != null}
                             onClose={this.handleMoreMenuClose.bind(this)}
                    >
                        {
                            children.map((child, index) => {
                                if (index >= visibleButtonCount) {
                                    return <Typography>{child}</Typography>;
                                }
                            })
                        }
                    </Popover>
                </>
            }
        </Box>
    }
}

export default withWidth()(withStyles(styles)(ResponsiveButtonGroup));
