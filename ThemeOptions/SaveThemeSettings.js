/**
 * Form Dialog
 */
/* eslint-disable */
import React from 'react';
import {connect} from 'react-redux';
import LoaderButton from 'Components/Buttons/LoaderButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Actions
import {toggleSaveForm, saveSettings} from "Actions";
import IntlMessages from "Util/IntlMessages";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {Form, FormGroup, FormText, Input, Label} from "reactstrap";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import NavMenuItem from "Components/Sidebar/NavMenuItem";
import SweetAlert from "react-bootstrap-sweetalert";

class SaveThemeSettings extends React.Component {

    state = {
        fields: {},
        errors: {}
    };

    handleClickOpen = () => {
        this.props.toggleSaveForm();
        this.setState({
            fields: {},
            errors: {}
        });
        this.props.onClick();
    };

    handleClose = () => {
        this.props.toggleSaveForm();
        this.setState({
            fields: {},
            errors: {}
        });
        this.props.onClose();
    };

    //handle form validation
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["branches"] || fields["branches"].length === 0) {
            formIsValid = false;
            errors["branches"] = "Please select at least one branch!";
        }
        if (!fields["modules"] || fields["modules"].length === 0) {
            formIsValid = false;
            errors["modules"] = "Please select at least one module!";
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        fields[field] = value;
        this.setState({fields});
    }

    //submit form data
    onFormSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            let fields = this.state.fields;
            var branches = fields["branches"];
            var branchPks = [];
            branches.map((branch) => {
                branchPks.push(parseInt(branch));
            })
            const setting = {
                horizontalLayout: this.props.horizontalLayout,
                navCollapsed: this.props.navCollapsed,
                darkMode: this.props.darkMode,
                boxLayout: this.props.boxLayout,
                rtlLayout: this.props.rtlLayout,
                miniSidebar: this.props.miniSidebar,
                isDarkSidenav: this.props.isDarkSidenav,
                activeTheme: this.props.activeTheme,
                enableSidebarBackgroundImage: this.props.enableSidebarBackgroundImage,
                selectedSidebarImage: this.props.selectedSidebarImage
            };
            this.props.saveSettings(branchPks, fields["modules"], 'web', setting, this.props.user);
        }
    }

    onConfirm() {
        this.handleClose();
    }

    render() {
        const {branches, saving, modules, saveFormOpen, savedSuccessfully, savingError} = this.props;
        return (
            <div>
                <Button variant="contained" fullWidth color="primary" onClick={this.handleClickOpen}>
                    <i className="material-icons pl-10">save</i>
                    <IntlMessages
                        id="themeOptions.saveSettings"/>
                </Button>
                <Dialog disableBackdropClick className="client-dialog" open={saveFormOpen}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><IntlMessages
                        id="themeOptions.saveSettings"/></DialogTitle>
                    <DialogContent>
                        <Form onSubmit={this.onFormSubmit.bind(this)}>
                            <FormGroup>
                                <Label for="SelectMulti">Select Branches</Label>
                                <Input type="select" name="selectMulti" id="SelectMulti" multiple
                                       onChange={this.handleChange.bind(this, "branches")}>
                                    {branches.map((branch, key) => (
                                        <option key={key} value={branch.pk}>{branch.name}</option>
                                    ))}
                                </Input>
                                <span className="error">{this.state.errors["branches"]}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label for="SelectMulti">Select Modules</Label>
                                <Input type="select" name="selectMulti" id="SelectMulti" multiple
                                       onChange={this.handleChange.bind(this, "modules")}>
                                    {modules.map((module, key) => (
                                        <option key={key} value={module}>{module}</option>
                                    ))}
                                </Input>
                                <span className="error">{this.state.errors["modules"]}</span>
                            </FormGroup>
                            <FormGroup className="text-right m-0">
                                <Button variant="contained" onClick={this.handleClose}
                                        className="btn-danger mr-15 text-white">
                                    Cancel
                                </Button>
                                <LoaderButton variant="contained"
                                              text="Save Settings"
                                              loadingText="Saving..."
                                              isLoading={saving}
                                              color="primary"
                                              type="submit"/>
                            </FormGroup>
                        </Form>
                        <SweetAlert
                            success
                            show={savedSuccessfully}
                            title="Settings Saved!"
                            btnSize="sm"
                            onConfirm={() => this.onConfirm('success')}
                            onCancel={() => this.onConfirm('cancel')}>
                        </SweetAlert>
                        <SweetAlert
                            error
                            show={savingError}
                            title="Error While Saving Settings!"
                            btnSize="sm"
                            onConfirm={() => this.onConfirm('success')}
                            onCancel={() => this.onConfirm('cancel')}>
                        </SweetAlert>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({authUser, settings}) => {
    const {user} = authUser;
    const {branches} = authUser.user;
    return {user, branches, ...settings};
}

export default connect(mapStateToProps, {
    toggleSaveForm, saveSettings
})(SaveThemeSettings);