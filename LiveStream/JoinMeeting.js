import React, {Component} from "react";
import LoaderButton from "../Buttons/LoaderButton";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import JoinZoomMeeting from "./Zoom/JoinZoomMeeting";
import IntlMessages from 'Util/IntlMessages';


class JoinMeeting extends Component {

    render() {
        const {platform, joining, meetingInfo, onClick, onLeave, ...props} = this.props;
        if (platform === "zoom") {
            return <JoinZoomMeeting {...props} onLeave={onLeave} meetingInfo={meetingInfo} joining={joining}
                                    onClick={onClick}/>
        }
        if (meetingInfo != null) {
            window.open(meetingInfo.link, "_blank");
        }
        return <LoaderButton {...props} variant="contained"

                             isLoading={joining}
                             startIcon={<ControlPointIcon/>}
                             onClick={onClick}/>
    }
}

export default JoinMeeting;