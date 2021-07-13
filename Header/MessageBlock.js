/**
 * User Block Component
 */
import React, {Component} from 'react';
import {Badge, Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    getSMSUnreadCount
} from 'Actions';

class MessageBlock extends Component {

    state = {isOpen: false}

    toggle(e) {
        this.setState({isOpen: !this.state.isOpen});
    }

    componentDidMount() {
        const {token} = this.props.user;
        this.props.getSMSUnreadCount(token);
    }

    render() {
        const {user, smsLoading, smsUnreadCount} = this.props;
        const {isOpen} = this.state;
        return (

            <Dropdown isOpen={isOpen} toggle={this.toggle.bind(this)} nav className="list-inline-item user-dropdown">
                <DropdownToggle nav className="p-0">
                    <Tooltip title={<IntlMessages id="user.messages"/>} placement="bottom">
                        <IconButton onClick={this.toggle.bind(this)} aria-label="settings">
                            {
                                smsLoading ?
                                    <CircularProgress color={"primary"} size={20} thickness={3}/> :
                                    <i className="zmdi zmdi-comment"></i>
                            }
                            {
                                !smsLoading && smsUnreadCount > 0 &&
                                <Badge color="danger"
                                       className="badge-xs badge-top-right rct-notify">{smsUnreadCount}</Badge>
                            }
                        </IconButton>
                    </Tooltip>
                </DropdownToggle>
                <DropdownMenu right>
                    <ul className="list-unstyled mb-0 dropdown-list">
                        <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                            <p className="text-white mb-0 fs-14">{<IntlMessages id="user.messages"/>}</p>
                        </li>
                        {
                            user && user.permissions.sms_inbox &&
                            <li onClick={this.toggle.bind(this)}>
                                <Link to={{
                                    pathname: user.module.sms_inbox_path,
                                    state: {activeTab: 0}
                                }}>
                                    <i className="zmdi zmdi-comment-text-alt text-danger mr-3"></i>
                                    <span><IntlMessages id="user.sms_inbox"/></span>
                                    {
                                        smsLoading &&
                                        <CircularProgress color={"primary"} className="pull-right" size={20}
                                                          thickness={3}/>
                                    }
                                    {
                                        !smsLoading && smsUnreadCount > 0 &&
                                        <Badge color="danger" className="pull-right">{smsUnreadCount}</Badge>
                                    }
                                </Link>
                            </li>
                        }

                        {
                            user && user.permissions.circulars &&
                            <li onClick={this.toggle.bind(this)}>
                                <Link to={{
                                    pathname: user.module.circulars_path,
                                    state: {activeTab: 2}
                                }}>
                                    <i className="zmdi zmdi-info-outline text-success mr-3"></i>
                                    <span><IntlMessages id="user.circulars"/></span>
                                </Link>
                            </li>
                        }

                    </ul>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

// map state to props
const mapStateToProps = ({authUser, message}) => {
    const {user} = authUser;
    const {smsLoading, smsUnreadCount} = message;
    return {user, smsLoading, smsUnreadCount};
}

export default connect(mapStateToProps, {getSMSUnreadCount})(MessageBlock);
