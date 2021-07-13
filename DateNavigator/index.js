import React, {Component} from "react";
import {Badge, Box, Grid} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {KeyboardDatePicker} from "@material-ui/pickers";
import moment from "moment";
import MuiButton from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const Button = withStyles({
    startIcon: {
        marginRight: 0
    }
})(MuiButton);


class DateNavigator extends Component {

    getNextPreDateFromRange = (dates, date) => {
        let formattedDate = moment(date).format("YYYY-MM-DD");
        let state = {};
        let length = dates.length;
        let dIndex = 0;
        for (let index in dates) {
            if (dates[index] === formattedDate) {
                if (dIndex < length - 1) {
                    let nextDate = moment(dates[dIndex + 1])
                    state.next = {day: nextDate.format('DD'), month: nextDate.format('MMM'), date: nextDate.toDate()}
                }
                if (dIndex > 0) {
                    let preDate = moment(dates[dIndex - 1])
                    state.pre = {day: preDate.format('DD'), month: preDate.format('MMM'), date: preDate.toDate()}
                }
                break;
            }
            ++dIndex;
        }
        state.next = state.next || null;
        state.pre = state.pre || null;
        return state;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState(this.getNextPreDates(this.props.value));
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    getNextPreDates = (date) => {
        const {highlight} = this.props;
        if (highlight) {
            return this.getNextPreDateFromRange(highlight, date);
        }
        let dateObj = moment(date);
        let maxDate = this.props.maxDate;
        let minDate = this.props.minDate;
        let state = {};
        if (maxDate == null || !dateObj.isSame(maxDate, 'day')) {
            let nextDate = moment(date).add(1, 'days')
            state.next = {day: nextDate.format('DD'), month: nextDate.format('MMM'), date: nextDate.toDate()}
        } else {
            state.next = null;
        }
        if (minDate == null || !dateObj.isSame(minDate, 'day')) {
            let preDate = moment(date).add(-1, 'days')
            state.pre = {day: preDate.format('DD'), month: preDate.format('MMM'), date: preDate.toDate()}
        } else {
            state.pre = null;
        }
        return state;
    }

    state = this.getNextPreDates(this.props.value || new Date())


    handleChange = (date) => {
        this.setState(this.getNextPreDates(date))
        if (this.props.onChange) {
            this.props.onChange(date)
        }
    }

    dateExists = (dates, date) => {
        if (dates) {
            let formattedDate = moment(date).format("YYYY-MM-DD");
            for (let index in dates) {
                if (dates[index] === formattedDate) {
                    return true;
                }

            }
        }
        return false;
    }

    renderDay = (day, selectedDate, isInCurrentMonth, dayComponent) => {
        const {highlight} = this.props;
        const highlightDate = highlight && this.dateExists(highlight, day);
        return highlightDate ? React.cloneElement(dayComponent, {
            style: {
                border: '1px solid',
                borderColor: "primary",
            }
        }) : dayComponent;
    }

    render() {
        const {next, pre} = this.state;
        const {highlight} = this.props;
        return <Box display="flex">
            {
                pre &&
                <Button onClick={() => {
                    this.handleChange(pre.date)
                }} size={"small"} variant="outlined"
                        startIcon={<ArrowBackIosIcon color={"primary"}/>}>{pre.day}<br/>{pre.month}</Button>
            }
            <KeyboardDatePicker
                {...this.props}
                style={{width: '100%'}}
                autoOk
                variant="inline"
                inputVariant="outlined"
                renderDay={this.renderDay.bind(this)}
                shouldDisableDate={(date) => {
                    return !this.dateExists(highlight, date)
                }}
                onChange={this.handleChange.bind(this)}/>
            {
                next &&
                <Button onClick={() => {
                    this.handleChange(next.date)
                }} size={"small"} variant="outlined"
                        endIcon={<ArrowForwardIosIcon color={"primary"}/>}>{next.day}<br/>{next.month}</Button>
            }
        </Box>
    }

}


export default DateNavigator;
