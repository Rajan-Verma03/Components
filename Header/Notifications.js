/**
 * Notification Component
 */
import React, {Component} from 'react';
import {Badge} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// api
// intl messages
import {connect} from "react-redux";
import {getNotificationUnreadCount} from 'Actions';
import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import NotificationSidebar from "./NotificationSidebar";
import {onMessageListener} from '../../firebase/firebaseInit';
import {NotificationManager} from "react-notifications";


class Notifications extends Component {

    state = {
        notificationsOpened: false
    }

    onMessage() {
        NotificationManager.success('New Message Received');
        const {token} = this.props.user;
        this.props.getNotificationUnreadCount(token);
    }

    componentDidMount() {
        onMessageListener().then(this.onMessage.bind(this));
        const {token} = this.props.user;
        this.props.getNotificationUnreadCount(token);
    }

    toggle() {
        const {notificationsOpened} = this.state;
        this.setState({notificationsOpened: !notificationsOpened})
    }


    render() {
        const {user, loading, unreadCount} = this.props;
        const {notificationsOpened} = this.state;
        return (
            <>
                <Tooltip title="Notifications" placement="bottom">
                    <IconButton className="shake" aria-label="bell" onClick={this.toggle.bind(this)}>
                        {
                            loading ?
                                <CircularProgress color={"primary"} size={20} thickness={3}/> :
                                <i className="zmdi zmdi-notifications-active"></i>
                        }
                        {
                            !loading && unreadCount > 0 &&
                            <Badge color="danger" className="badge-xs badge-top-right rct-notify">{unreadCount}</Badge>
                        }
                    </IconButton>
                </Tooltip>
                <Drawer
                    anchor={'right'}
                    open={notificationsOpened}
                    onClose={this.toggle.bind(this)}
                >
                    <NotificationSidebar onSelect={this.toggle.bind(this)}/>
                </Drawer>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({authUser, notification}) => {
    const {user} = authUser;
    const {loading, unreadCount} = notification;
    return {user, loading, unreadCount};
}

export default connect(mapStateToProps, {getNotificationUnreadCount})(Notifications);

