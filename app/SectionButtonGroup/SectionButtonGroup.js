import React from 'react';
import AttendanceService from "../../../educare/student-attendance/AttendanceService";
import {NotificationManager} from "react-notifications";
import ReactButtonGroup from "Components/RctButtonGroup/ReactButtonGroup";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {blue} from "@material-ui/core/colors";
import ClassButtonGroup from '../ClassButtonGroup/ClassButtonGroup'
import {Box} from "@material-ui/core";


const styles = () => ({})

class SectionButtonGroup extends React.Component {

    state = {
        loading: true,
        selectedClass: {},


    }

    handleSectionChange(section) {
        this.setState({selectedClass: section})
        const {onSelect} = this.props;
        if (onSelect) {
            onSelect(section.pk);
        }
    }


    render() {
        const {sectionList} = this.props;
        const {selectedClass} = this.state;
        return (<>
                {
                    sectionList &&
                    <ReactButtonGroup className={"ml-20"}>

                        {
                            sectionList.map((section) => (
                                <Button variant={section.pk === selectedClass.pk ? 'contained' : 'outlined'}
                                        size={"small"}
                                        color={section.pk === selectedClass.pk ? 'secondary' : 'secondary'}
                                        onClick={this.handleSectionChange.bind(this, section)}> {section.name} </Button>
                            ))
                        }

                    </ReactButtonGroup>

                }
            </>

        );
    }

}


const mapStateToProps = ({authUser, settings}) => {
    const {user} = authUser;
    const {horizontalLayout} = settings;
    return {user, horizontalLayout};
}

export default withStyles(styles)(connect(mapStateToProps, {})(SectionButtonGroup));
