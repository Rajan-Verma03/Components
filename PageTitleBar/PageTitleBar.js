/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
// intl messages
import {Typography, Box} from "@material-ui/core";
import IntlMessages from 'Util/IntlMessages';

// get display string
const getDisplayString = (sub) => {
    return <IntlMessages id={sub}/>
};

// get url string
const getUrlString = (path, sub, index) => {
    if (index === 0) {
        return '/';
    } else {
        return '/' + path.split(sub)[0] + sub;
    }
};

const PageTitleBar = ({title, match, back, history, enableBreadCrumb}) => {
    return (
        <div className="page-title d-flex align-items-center">
            {back &&
            <IconButton size={"small"} onClick={() => {
                history.goBack();
            }
            } aria-label="back"> <ArrowBack color="primary" fontSize="large"/></IconButton>
            }
            {title &&
            <Typography variant="h2" component="h2">
                {title}
            </Typography>
            }
        </div>
    )
};

// default props value
PageTitleBar.defaultProps = {
    enableBreadCrumb: true
}

export default PageTitleBar;
