import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// data
// helpers
import RctDataLoader from "../RctDataLoader/RctDataLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import UserService from "../../educare/auth/UserService";
import {NotificationManager} from "react-notifications";
import Badge from "@material-ui/core/Badge";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Scrollbars} from "react-custom-scrollbars";
import {Box, CardMedia, Chip, Divider} from "@material-ui/core";
import {Link} from "react-router-dom";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from 'Components/RctDialog/DialogTitle';
import {markNotificationRead} from 'Actions';

const styles = {}

const ListItemComponent = ({children, onClick, notification, ...props}) => {
    if (notification.link) {
        return <ListItem onClick={() => {
            onClick(notification)
        }} divider {...props} alignItems="flex-start" button component={Link}
                         to={notification.link}>
            {children}
        </ListItem>
    } else {
        return <ListItem onClick={() => {
            onClick(notification)
        }} divider {...props} alignItems="flex-start" button>
            {children}
        </ListItem>
    }
}

const NotificationListItem = ({selected, notification, ...props}) => {

    return <>
        <ListItemComponent notification={notification} {...props}>
            {
                !selected && !notification.read && <Badge color="primary" variant="dot" style={{top: 28, right: 9}}>
                </Badge>
            }
            <ListItemAvatar>
                <Avatar style={{fontSize: 15, textAlign: 'center'}}>
                    {notification.type.charAt(0)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={notification.title}
                secondary={<Box display={"flex"} flexDirection={"column"}>
                    <Typography
                        noWrap={true}
                        component="span"
                        variant="body2"
                        color="textPrimary"
                    >
                        {notification.body}
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        style={{fontSize: 10}}
                    >
                        {notification.created_on}
                    </Typography>

                </Box>
                }
                primaryTypographyProps={{noWrap: true, color: "textPrimary"}}
                secondaryTypographyProps={{noWrap: true}}
            />
            {
                notification && notification.image ?
                    <img
                        src={notification.image}
                        style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: 'center',
                            height: 50,
                            marginTop: 8,
                            width: 50
                        }}/> : ""

            }


        </ListItemComponent>
    </>
}


class NotificationDialouge extends Component {

    render() {
        const {open, onClose, notification} = this.props;
        return (
            <Dialog
                disableBackdropClick={true}
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="form-dialog-title"
                             onClose={onClose}> Notification</DialogTitle>
                <DialogContent style={{marginBottom: 15}} notification={notification}>
                    <Typography variant="h6" color="textPrimary" component="h6">
                        {notification.title}
                    </Typography>
                    <Box display={"flex"} flexDirection={"row"}>
                        <Typography variant="subtitle2" color="textSecondary" component="span">

                            {notification.created_on}
                        </Typography>
                        <Box className={"ml-auto"}>
                        </Box>
                    </Box>

                    <Divider className={"mt-10"}/>

                    <DialogContentText id="alert-dialog-description" className={"mt-10"}>
                        {notification.body}
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        );
    }
}


class NotificationSidebar extends React.Component {

    constructor(props) {
        super();
        this.state = {
            offset: 0,
            pageSize: 10,
            hasMore: true,
            notifications: [],
        }
    }

    componentDidMount() {
        this.getNotifications();
    }

    refreshData() {
        this.setState({
            offset: 0,
            hasMore: true,
            notifications: []
        }, () => {
            this.getNotifications();
        });
    }

    getNotifications() {
        const {
            offset,
            pageSize,
            notifications
        } = this.state;
        const {token} = this.props.user;
        let limit = pageSize
        UserService.notificationList(offset, limit, token)
            .then((response) => {
                let newNotifications = response.notifications;
                if (this.props.processNotifications) {
                    this.props.processNotifications(newNotifications);
                }
                let allNotifications = notifications.concat(newNotifications);
                let length = newNotifications.length;
                let newOffset = offset + length;
                let hasMore = length === limit;
                this.setState({
                    notifications: allNotifications,
                    offset: newOffset,
                    hasMore: hasMore
                });
            })
            .catch(error => {
                {
                    this.setState({
                        hasMore: false
                    });
                    NotificationManager.error('Error while fetching notifications!');
                }
            })
    }

    renderScrollbars(props) {
        return <div {...props} id={"listScroller1"}></div>
    }

    handleNotificationClick = (notification) => {
        const {onSelect} = this.props;
        if (notification.link) {
            onSelect(notification);
        } else {
            notification.read = true;
            this.setState({notificationOpened: true, selectedNotification: notification});
            this.props.markNotificationRead([notification.type], this.props.user.token);
        }
    }

    handleCloseNotification = () => {
        this.setState({notificationOpened: false});
    }

    render() {
        const {notifications, hasMore, notificationOpened = false, selectedNotification} = this.state;
        const {onSelect} = this.props;
        return <div style={{width: 350}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        Notifications
                    </Typography>
                </Toolbar>
            </AppBar>
            <Scrollbars
                className="rct-scroll"
                autoHide
                style={{height: 'calc(100vh - 80px)'}}
                renderView={this.renderScrollbars}
            >
                <InfiniteScroll
                    dataLength={notifications.length}
                    next={this.getNotifications.bind(this)}
                    hasMore={hasMore}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    scrollThreshold={"100px"}
                    refreshFunction={this.refreshData.bind(this)}
                    loader={<RctDataLoader size={30}/>}
                    scrollableTarget="listScroller1"
                    style={{'overflow': 'hidden'}}
                >
                    <List>
                        {
                            notifications.map((notification, index) => (
                                <NotificationListItem
                                    selected={selectedNotification != null && selectedNotification.pk === notification.pk}
                                    onClick={this.handleNotificationClick.bind(this)}
                                    notification={notification} key={index}
                                />
                            ))
                        }

                    </List>
                </InfiniteScroll>
            </Scrollbars>

            {
                selectedNotification &&
                <NotificationDialouge
                    open={notificationOpened}
                    onClose={this.handleCloseNotification.bind(this)}
                    notification={selectedNotification}
                />
            }

        </div>
    }
}

const mapStateToProps = ({authUser, sidebar}) => {
    const {user} = authUser;
    const {processNotifications} = sidebar;
    return {user, processNotifications};
}

export default withStyles(styles)(connect(mapStateToProps, {markNotificationRead})(NotificationSidebar));
