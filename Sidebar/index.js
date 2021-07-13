/**
 * Reactify Sidebar
 */
import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Scrollbars} from 'react-custom-scrollbars';

// redux actions
import {collapsedSidebarAction} from 'Actions';

// components
import UserBlock from '../Header/UserBlock';
import SidebarContent from './SidebarContent';
import AgencySidebar from '../AgencyMenu/AgencySidebar';

class Sidebar extends Component {

    UNSAFE_componentWillMount() {
        this.updateDimensions();
    }

    shouldComponentUpdate(nextProps) {
        const {enableSidebarBackgroundImage, selectedSidebarImage, isDarkSidenav, locale} = this.props;
        if (enableSidebarBackgroundImage !== nextProps.enableSidebarBackgroundImage || selectedSidebarImage !== nextProps.selectedSidebarImage || isDarkSidenav !== nextProps.isDarkSidenav || locale) {
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {windowWidth} = this.state;
        const {collapsedSidebar} = this.props;
        if (nextProps.location !== this.props.location) {
            if (windowWidth <= 1199) {
                this.props.collapsedSidebarAction(false);
            }
        }
    }

    updateDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    }

    render() {
        const {institute, enableSidebarBackgroundImage, selectedSidebarImage, isDarkSidenav, agencySidebar} = this.props;
        return (
            <Fragment>
                <div
                    className={classNames('rct-sidebar', {'background-none': !enableSidebarBackgroundImage})}
                    style={{backgroundImage: enableSidebarBackgroundImage ? `url(${selectedSidebarImage})` : 'none'}}
                >
                    <div className={classNames("rct-sidebar-content", {
                        "sidebar-overlay-dark": isDarkSidenav,
                        'sidebar-overlay-light': !isDarkSidenav
                    })}>
                        <div className="site-logo">
                            <Link to="/" className="logo-mini">
                                <img src={institute.logo} className="mr-15" alt="site logo"
                                     width="35" height="35"/>
                            </Link>
                            <Link to="/" className="logo-normal">
                                {institute.name}
                            </Link>
                        </div>
                        <div className="rct-sidebar-wrap">
                            <Scrollbars
                                className="rct-scroll"
                                autoHide
                                autoHideDuration={100}
                                style={{height: 'calc(100vh - 60px)'}}
                            >
                                {!agencySidebar ?
                                    <SidebarContent/>
                                    :
                                    <AgencySidebar/>
                                }
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

// map state to props
const mapStateToProps = ({settings, authUser}) => {
    const {institute} = authUser;
    const {enableSidebarBackgroundImage, selectedSidebarImage, collapsedSidebar, isDarkSidenav, locale} = settings;
    return {institute, enableSidebarBackgroundImage, selectedSidebarImage, collapsedSidebar, isDarkSidenav, locale};
};

export default withRouter(connect(mapStateToProps, {
    collapsedSidebarAction,
})(Sidebar));
