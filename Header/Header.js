/**
 * App Header
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import screenfull from 'screenfull';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom';

// actions
import {collapsedSidebarAction} from 'Actions';


// components
import Notifications from './Notifications';
import DashboardOverlay from '../DashboardOverlay/DashboardOverlay';
import LanguageProvider from './LanguageProvider';
import SearchForm from './SearchForm';
import QuickLinks from './QuickLinks';

// intl messages

import UserBlock from "./UserBlock";
import MessageBlock from "./MessageBlock";

class Header extends Component {

    state = {
        customizer: false
    }

    // function to change the state of collapsed sidebar
    onToggleNavCollapsed = (event) => {
        const val = !this.props.navCollapsed;
        this.props.collapsedSidebarAction(val);
    }

    // open dashboard overlay
    openDashboardOverlay(e) {
        var el = document.getElementsByClassName('dashboard-overlay')[0];
        el.classList.toggle("d-none");
        el.classList.toggle("show");
        if (el.classList.contains('show')) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        e.preventDefault();
    }

    // close dashboard overlay
    closeDashboardOverlay() {
        var e = document.getElementsByClassName('dashboard-overlay')[0];
        e.classList.remove('show');
        e.classList.add('d-none');
        document.body.style.overflow = "";
    }

    // toggle screen full
    toggleScreenFull() {
        screenfull.toggle();
    }


    render() {
        const {horizontalMenu, agencyMenu, location, institute, quickMenus, history,user} = this.props;
        return (
            <AppBar position="static" className="rct-header">
                <Toolbar className="d-flex justify-content-between w-100 pl-0">
                    <div className="d-flex align-items-center">
                        {(horizontalMenu || agencyMenu) &&
                        <div className="site-logo">
                            <Link to="/" className="logo-mini">
                                <img src={institute.logo} className="mr-15" alt="site logo"
                                     width="35" height="35"/>
                            </Link>
                            <Link to="/" className="logo-normal text-white">
                                {institute.name}
                            </Link>
                        </div>
                        }
                        {!agencyMenu &&
                        <ul className="list-inline mb-0 navbar-left">
                            {!horizontalMenu ?
                                <li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
                                    <Tooltip title="Sidebar Toggle" placement="bottom">
                                        <IconButton color="inherit" mini="true" aria-label="Menu"
                                                    className="humburger p-0">
                                            <MenuIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </li> :
                                <li className="list-inline-item">
                                    <Tooltip title="Sidebar Toggle" placement="bottom">
                                        <IconButton color="inherit" aria-label="Menu" className="humburger p-0"
                                                    component={Link} to="/">
                                            <i className="ti-layout-sidebar-left"></i>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                            }
                            {quickMenus && quickMenus.length > 0 && <QuickLinks menus={quickMenus}/>}
                            <li className="list-inline-item search-icon d-inline-block">
                                <SearchForm history={history}/>
                            </li>
                        </ul>
                        }
                    </div>
                    <ul className="navbar-right list-inline mb-0">
                        {/*<li className="list-inline-item summary-icon">*/}
                        {/*    <Tooltip title="Summary" placement="bottom">*/}
                        {/*        <a href="#" className="header-icon tour-step-3"*/}
                        {/*           onClick={(e) => this.openDashboardOverlay(e)}>*/}
                        {/*            <i className="zmdi zmdi-info-outline"></i>*/}
                        {/*        </a>*/}
                        {/*    </Tooltip>*/}
                        {/*</li>*/}
                        <LanguageProvider/>
                        <li className="list-inline-item">
                            <Notifications/>
                        </li>

                        {
                            user && (user.permissions.sms_inbox || user.permissions.circulars) &&
                            <MessageBlock/>
                        }

                        <UserBlock/>

                        <li className="list-inline-item">
                            <Tooltip title="Full Screen" placement="bottom">
                                <IconButton aria-label="settings" onClick={() => this.toggleScreenFull()}>
                                    <i className="zmdi zmdi-crop-free"></i>
                                </IconButton>
                            </Tooltip>
                        </li>
                    </ul>
                </Toolbar>
                <DashboardOverlay
                    onClose={() => this.closeDashboardOverlay()}
                />
            </AppBar>
        );
    }
}

// map state to props
const mapStateToProps = ({settings, authUser, sidebar}) => {
    const {institute,user} = authUser;
    const {navCollapsed} = settings;
    const {quickMenus} = sidebar;
    return {navCollapsed,user, institute, quickMenus};
};

export default withRouter(connect(mapStateToProps, {
    collapsedSidebarAction
})(Header));
