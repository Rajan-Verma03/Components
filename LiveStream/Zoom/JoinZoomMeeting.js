import React, {Component} from "react";
import LoaderButton from "../../Buttons/LoaderButton";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import ZoomMeeting from "./ZoomMeeting";

class JoinZoomMeeting extends Component {

    onClick1;

    render() {
        const {joining, meetingInfo, onClick, onLeave, ...props} = this.props;
        this.onClick1 = onClick;
        return <><LoaderButton  {...props} variant="contained"
                                isLoading={joining}
                                startIcon={<ControlPointIcon/>}
                                onClick={onClick}/>
            {
                meetingInfo &&
                <ZoomMeeting meetingInfo={meetingInfo} onLeave={onLeave}/>
            }

        </>
    }
}

export default JoinZoomMeeting;