import IntlMessages from "../../util/IntlMessages";
import {Typography} from "@material-ui/core";
import React from "react";

const RctLabel = ({label, icon, ...props}) => {
    return <Typography {...props} variant={"body2"}
                       component={"div"}>
        {
            icon &&
            <span style={{position: "absolute", marginTop: 5}}>
                                    {icon}
                                </span>
        }
        <span style={{marginLeft: 35}}>
                            <IntlMessages id={label}/>
                            </span>
    </Typography>
}


export default RctLabel;