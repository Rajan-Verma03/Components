import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import React from "react";

const NoDataFound = ({label}) => {
    return <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
    >
        <Typography color='textSecondary' variant='h5'> {label}</Typography>
    </Box>
}


export default NoDataFound;