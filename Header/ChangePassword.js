/**
 * Invoice
 */
import React, {Component} from 'react';

import {withStyles} from "@material-ui/core/styles";

import {Box} from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from 'Components/RctDialog/DialogTitle';
import LoaderButton from "../Buttons/LoaderButton";
import UserService from "../../educare/auth/UserService";
import {NotificationManager} from "react-notifications";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from 'Util/IntlMessages';
import PasswordOutlinedInput from 'Components/Widgets/PasswordOutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {};


class ChangePassword extends Component {
    state = {
        fields: {},
        errors: {}
    };

    handleChange(field, e) {
        const {fields} = this.state;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    handleValidation() {
        const {currentPwd, newPwd, confirmPwd} = this.state.fields;
        let errors = {};
        let IsValid = true;

        /*CurrentPwd*/

        if (!currentPwd || currentPwd.trim().length === 0) {
            IsValid = false;
            errors["currentPwd"] = <IntlMessages
                id="user.change_password.alrt_curr_password"/>
        }
        /*NewPwd*/

        if (!newPwd || newPwd.trim().length === 0) {
            IsValid = false;
            errors["newPwd"] = <IntlMessages
                id="user.change_password.alrt_new_password"/>
        }
        /*ConfirmPwd*/

        if (!confirmPwd || confirmPwd.trim().length === 0) {
            IsValid = false;
            errors["confirmPwd"] = <IntlMessages
                id="user.change_password.alrt_cnfrm_password"/>
        } else if (newPwd && newPwd.trim().length > 0 && confirmPwd.trim() !== newPwd.trim()) {
            IsValid = false;
            errors["confirmPwd"] = <IntlMessages
                id="user.change_password.alrt_not_match_password"/>
        }
        this.setState({errors: errors});
        return IsValid;
    }

    onSubmitPass() {
        if (this.handleValidation()) {
            this.setState({changeConfirmation: true});
        }
    }

    changePassword() {
        this.setState({changeConfirmation: false, saving: true});
        const {currentPwd, newPwd} = this.state.fields;
        const {token} = this.props.user;
        UserService.changePwd(currentPwd, newPwd, token)
            .then(() => {
                this.setState({saving: false, showPwdChanged: true});
            })
            .catch(error => {
                {
                    if (error.code === 420) {
                        this.setState({
                            saving: false, errors: {
                                currentPwd: <IntlMessages
                                    id="user.change_password.alert_response"/>
                            }
                        });
                    } else {
                        this.setState({saving: false});
                        NotificationManager.error('Error while changing password! ');
                    }
                }
            })
    }

    pwdChanged = () => {
        this.setState({showPwdChanged: false});
        this.props.onClose(true);
    }

    render() {
        const {open, onClose, user} = this.props;
        const {
            fields, saving, errors, changeConfirmation = false, showPwdChanged = false
        } = this.state;

        return (
            <Dialog
                disableBackdropClick
                open={open}
                onClose={() => {
                    this.setState({fields: {}, errors: {}});
                    onClose();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="form-dialog-title" onClose={onClose}
                > <IntlMessages
                    id="user.change_password.title_change_pwd"/> </DialogTitle>

                <DialogContent dividers>
                    <FormControl error={errors.currentPwd != null}
                                 required variant="outlined" className={"mt-15"} size="small" fullWidth>
                        <InputLabel><IntlMessages
                            id="user.change_password.label_curr_pwd"/></InputLabel>
                        <PasswordOutlinedInput
                            value={fields.currentPwd}
                            onChange={this.handleChange.bind(this, 'currentPwd')}
                            labelWidth={140}
                        />
                        {
                            errors.currentPwd &&
                            <FormHelperText>
                                {errors.currentPwd}
                            </FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.newPwd != null}
                                 required variant="outlined" className={"mt-20"} size="small" fullWidth>
                        <InputLabel><IntlMessages
                            id="user.change_password.label_new_pwd"/></InputLabel>
                        <PasswordOutlinedInput
                            value={fields.newPwd}
                            onChange={this.handleChange.bind(this, 'newPwd')}
                            labelWidth={130}
                        />
                        {
                            errors.newPwd &&
                            <FormHelperText>
                                {errors.newPwd}
                            </FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.confirmPwd != null}
                                 required variant="outlined" className={"mt-20"} size="small" fullWidth>
                        <InputLabel><IntlMessages
                            id="user.change_password.label_confirm_pwd"/></InputLabel>
                        <PasswordOutlinedInput
                            value={fields.confirmPwd}
                            onChange={this.handleChange.bind(this, 'confirmPwd')}
                            labelWidth={150}
                        />
                        {
                            errors.confirmPwd &&
                            <FormHelperText>
                                {errors.confirmPwd}
                            </FormHelperText>
                        }
                    </FormControl>
                    <Box className={"mt-25"} align={"center"}>
                        <LoaderButton variant="contained"
                                      text={<IntlMessages
                                          id="user.change_password.btn_change_pwd"/>}
                                      loadingText={<IntlMessages
                                          id="user.change_password.changing"/>}
                                      isLoading={saving}
                                      color="primary"
                                      onClick={this.onSubmitPass.bind(this)}/>
                    </Box>
                </DialogContent>

                <SweetAlert
                    warning
                    btnSize="sm"
                    show={changeConfirmation}
                    showCancel
                    confirmBtnText={<IntlMessages
                        id="user.change_password.alrt_pwd_confirm_btn"/>}
                    cancelBtnText={<IntlMessages
                        id="user.change_password.alrt__pwd_cancel_btn"/>}
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="danger"
                    title={<IntlMessages
                        id="user.change_password.alert_title"/>}
                    onConfirm={() => this.changePassword()}
                    onCancel={() => this.setState({changeConfirmation: false})}
                >
                    {<IntlMessages
                        id="user.change_password.alrt_pwd_title"/>}
                </SweetAlert>

                <SweetAlert
                    success
                    show={showPwdChanged}
                    title={<IntlMessages
                        id="user.change_password.alrt_pwd_change_sccsflly"/>}
                    btnSize="sm"
                    confirmBtnText={<IntlMessages
                        id="user.change_password.alrt_pwd_change_ok"/>}
                    onConfirm={this.pwdChanged.bind(this)}
                    onCancel={this.pwdChanged.bind(this)}>
                </SweetAlert>
            </Dialog>

        );
    }
}

export default (withStyles(styles)(ChangePassword));
