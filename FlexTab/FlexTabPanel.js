import React, {Component} from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import RctLabel from "../RctLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import { Slide } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

class FlexTabPanel extends Component {

    render() {
        const {tab, selected, index, color,fontColor,label, icon, children, onChange} = this.props;
        return <>
            {
                (!tab || selected === index) &&

                    <Accordion  onChange={(event, isExpanded) => {
                        if (onChange) {
                            onChange(event, isExpanded ? index : -1);
                        }
                    }} expanded={selected === index} defaultExpanded={selected === index}>
                        <AccordionSummary
                            style={{backgroundColor:color, color:fontColor}}
                            expandIcon={!tab && <ExpandMoreIcon/>}
                            id={label}
                        >
                            <RctLabel label={label}  icon={icon} className={"pt-5"} style={{fontSize: '1.2em', backgroundColor:color, }}/>
                        </AccordionSummary>

                        <AccordionDetails >
                           {children}
                        </AccordionDetails>
                    </Accordion>

            }
        </>
    }
}

export default FlexTabPanel;