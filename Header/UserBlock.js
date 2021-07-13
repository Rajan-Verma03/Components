/**
 * User Block Component
 */
import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, UncontrolledDropdown} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ChangePassword from "./ChangePassword";

// redux action
import {logoutUser} from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {Button, Avatar} from "@material-ui/core";

class UserBlock extends Component {


    state = {isOpen: false}

    toggle(e) {
        this.setState({isOpen: !this.state.isOpen});
    }


    /**
     * Logout User
     */
    logout(e, user) {
        e.preventDefault();
        this.props.logoutUser(user);
    }

    openChangePwd = () => {
        this.setState({changePwdOpened: true});
    }


    closeChangePwd = () => {
        this.setState({changePwdOpened: false});
    };

    render() {
        const {user} = this.props;
        const {isOpen, changePwdOpened = false} = this.state;

        return (
            <Dropdown isOpen={isOpen} toggle={this.toggle.bind(this)} className="list-inline-item user-dropdown">
                <DropdownToggle nav className="p-0">
                    <Tooltip title={user.name} placement="bottom">
                        <IconButton onClick={this.toggle.bind(this)} aria-label="user">
                            <Avatar className={"user-image"} alt={user.name} style={{
                                border: 1,
                                borderStyle: "solid"
                            }}
                                    src={user.photo || require('Assets/avatars/profile.jpg')}/>
                        </IconButton>
                    </Tooltip>
                </DropdownToggle>
                <DropdownMenu right>
                    <ul className="list-unstyled mb-0 dropdown-list" style={{zIndex:'999999'}}>
                        <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                            <p className="text-white mb-0 fs-14">{user.name}</p>
                            <span className="text-white fs-14">{user.title}</span>
                        </li>
                        <li onClick={this.toggle.bind(this)}>
                            <Link to={{
                                pathname: user.module.profile_path,
                                state: {activeTab: 0}
                            }}>
                                <i className="zmdi zmdi-account text-primary mr-3"></i>
                                <span><IntlMessages id="user.profile"/></span>
                            </Link>
                        </li>

                        <li>
                            <a href="#" onClick={(e) => {
                                this.toggle.bind(this);
                                this.openChangePwd(e)
                            }}>
                                <i className="zmdi zmdi-refresh-alt text-success mr-3"></i>
                                <span><IntlMessages id="user.change_password"/></span>
                            </a>
                        </li>
                        <li className="border-top">
                            <a href="#" onClick={(e) => {
                                this.toggle.bind(this);
                                this.logout(e, user)
                            }}>
                                <i className="zmdi zmdi-power text-danger mr-3"></i>
                                <span><IntlMessages id="user.logout"/></span>
                            </a>
                        </li>
                    </ul>
                </DropdownMenu>
                <ChangePassword
                    user={user}
                    open={changePwdOpened}
                    onClose={this.closeChangePwd.bind(this)}/>
            </Dropdown>


        );
    }
}

// map state to props
const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
}

export default connect(mapStateToProps, {
    logoutUser
})(UserBlock);
