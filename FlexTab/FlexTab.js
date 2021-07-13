import React, {Component} from "react";
import {Box, Tab, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IntlMessages from "../../util/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import {green, red} from "@material-ui/core/colors";

const styles = {
    root: {
        maxWidth: '100%',
        borderBottom: '1px solid grey', fontSize: 17
    },
    wrapper: {
        flexDirection: 'unset',
        justifyContent: 'unset'
    },
    labelIcon: {
        minHeight: '20px'
    }
}

class FlexTab extends Component {

    render() {
        const {label, icon,color,iconColor,fontColor, ...props} = this.props;
        return <Tab style={{backgroundColor:color}} label={<Box display={"flex"} flexDirection={"row"}>
            {icon &&
            <Box style={{fontSize: 22, color:iconColor}}  className={"mb-0 mr-10"}>
                {icon}
            </Box>
            }
            <Typography style={{fontSize: 16,color:fontColor}} className={"pt-5"}variant={"body2"}
                        component={"p"}>
                <IntlMessages id={label}/></Typography>
        </Box>} {...props}/>
    }
}


export default withStyles(styles)(FlexTab);
