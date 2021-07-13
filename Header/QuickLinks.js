/**
 * Quick Links
 */
import React from 'react';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import {Scrollbars} from 'react-custom-scrollbars';
import {Link} from 'react-router-dom';
import {Badge} from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import {withRouter} from "react-router-dom";

// helpers
import {getAppLayout} from "Helpers/helpers";

// intl messages
import IntlMessages from 'Util/IntlMessages';

const QuickLinks = ({location, menus}) => (
    <UncontrolledDropdown nav className="list-inline-item quciklink-dropdown tour-step-1">
        <DropdownToggle nav className="header-icon p-0">
            <Tooltip title="Quick Links" placement="bottom">
                <i className="zmdi zmdi-apps"></i>
            </Tooltip>
        </DropdownToggle>
        <DropdownMenu>
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={350}>
                <div className="dropdown-content">
                    <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
                        <span className="text-white font-weight-bold">Quick Links</span>
                    </div>
                    <ul className="list-unstyled mb-0 dropdown-list">
                        {
                            menus.map((menu, key) =>
                                <li key={key}>
                                    <Link to={menu.path}>
                                        <i className={menu.icon + " mr-10"}></i>
                                        <IntlMessages id={menu.title}/>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </Scrollbars>
        </DropdownMenu>
    </UncontrolledDropdown>
);

export default withRouter(QuickLinks);
