/**
 * Rct Section Loader
 */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import IntlMessages from "../../util/IntlMessages";

const CircleIndicator = (
    <CircularProgress className="text-white" size={20} thickness={3}/>
);
const LoaderButton = ({isLoading, startIcon, text, loadingText, disabled = false, ...props}) => {
    return (<Button {...props}
                     disabled={disabled || isLoading}
                     startIcon={isLoading ? CircleIndicator : startIcon}
    ><IntlMessages id={!isLoading ? text : loadingText}/></Button>)
}

export default LoaderButton;
