import React from 'react';
import AttendanceService from "../../../educare/student-attendance/AttendanceService";
import {NotificationManager} from "react-notifications";
import ReactButtonGroup from "Components/RctButtonGroup/ReactButtonGroup";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {blue} from "@material-ui/core/colors";
import SectionButtonGroup from "Components/app/SectionButtonGroup/SectionButtonGroup";


const styles = () => ({})

class ClassButtonGroup extends React.Component {

    state = {
        loading: true,
        selectedClass: {},
        classData: [],

    }


    componentDidMount() {
        this.getClasses()
    }

    handleClassChange = (classObj) => {
        this.setState({selectedClass: classObj})
        const {onSelect} = this.props;
        if (onSelect){
            onSelect(classObj);
        }
    }


    getClasses() {
        const {token} = this.props.user;
        AttendanceService.getClasses(token)
            .then(data => {
                this.setState({
                    classData: data.data,
                });

            }).catch(error => {

            NotificationManager.error('Error while fetching classes!');
        });

    }


    render() {
        const {selectedClass, loading, classData} = this.state;

        return <>
            <ReactButtonGroup className={"ml-20"}>
                {
                    classData ?
                        classData.map((classObj) => (
                            <Button
                                variant={classObj.pk === selectedClass.pk ? 'contained' : 'outlined'}
                                size={"small"}
                                color={classObj.pk === selectedClass.pk ? 'secondary' : 'secondary'}
                                onClick={this.handleClassChange.bind(this, classObj)}> {classObj.name} </Button>
                        )) : ''
                }
            </ReactButtonGroup>



        </>

    }

}

const mapStateToProps = ({authUser, settings}) => {
    const {user} = authUser;
    const {horizontalLayout} = settings;
    return {user, horizontalLayout};
}

export default withStyles(styles)(connect(mapStateToProps, {})(ClassButtonGroup));
