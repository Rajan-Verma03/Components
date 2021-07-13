/**
 * Invoice
 */
import React, {Component} from 'react';

import {withStyles} from "@material-ui/core/styles";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from 'Components/RctDialog/DialogTitle';
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from 'Util/IntlMessages';
import {Box} from "@material-ui/core";
import Iframe from 'react-iframe'

const styles = {};

class ZoomMeeting extends Component {
    state = {};

    onConfirmation = () => {
        this.setState({leaveConfirmation: false});
        this.props.onLeave(true);
    }

    handleClose = () => {
        this.setState({leaveConfirmation: true});
    }


    render() {
        const {meetingInfo, onLeave} = this.props;
        const {
            leaveConfirmation = false
        } = this.state;
        if (meetingInfo != null) {
            return (
                <Dialog
                    fullWidth
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={true}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="form-dialog-title"
                                 onClose={this.handleClose.bind(this)}> {meetingInfo && meetingInfo.display_name}</DialogTitle>
                    <Iframe url={("https://demo.zimongeducare.in" + meetingInfo.meeting_url)}
                            width="100%" height="450px"
                            frameBorder="0"
                            allowFullScreen/>

                    <SweetAlert
                        warning
                        btnSize="sm"
                        show={leaveConfirmation}
                        showCancel
                        confirmBtnText={<IntlMessages
                            id="student.academics.Lecture.alert_confrm_button"/>}
                        cancelBtnText={<IntlMessages
                            id="student.my_account.leaves.alert_cancel_buutton"/>}
                        confirmBtnBsStyle="success"
                        cancelBtnBsStyle="danger"
                        title={<IntlMessages
                            id="student.my_account.leaves.alert_title"/>}
                        onConfirm={this.onConfirmation.bind(this)}
                        onCancel={() => this.setState({leaveConfirmation: false})}
                    >
                        <IntlMessages
                            id="student.academics.Lecture.alert_meeting_leaved"/>
                    </SweetAlert>
                </Dialog>


            );
        }
    }
}

export default (withStyles(styles)(ZoomMeeting));
