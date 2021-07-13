import React from 'react';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";

const Localizer = momentLocalizer(moment);


class RctBigCalender extends React.Component {

    state = {}


    render() {
        const {events, style, dayPropGetter, onSelectSlot, onRangeChange, ...props} = this.props;
        const {} = this.state;

        return <>
            <Calendar
                {...props}
                style={style}
                localizer={Localizer}
                events={events}
                selectable
                views={{month: true}}
                step={60}
                messages={{next: ">", previous: "<", today: "Current"}}
                dayPropGetter={dayPropGetter}
                onSelectSlot={onSelectSlot}
                onRangeChange={onRangeChange}
                showMultiDayTimes
            />

        </>

    }

}

export default RctBigCalender;