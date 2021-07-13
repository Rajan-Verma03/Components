/**
 * Rct Section Loader
 */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const RctDataLoader = ({size = 50}) => (
    <div className="text-center"><CircularProgress
        className="progress-success" size={size}/></div>
);

export default RctDataLoader;
