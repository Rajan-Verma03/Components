import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Tabs} from "@material-ui/core";
import FlexTab from "./FlexTab";
import FlexTabPanel from "./FlexTabPanel";
import {red} from "@material-ui/core/colors";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";



class FlexTabs extends Component {
    state = {selected: 0}
    render = () => {
        const {selected} = this.state;
        const {children} = this.props;
        return <Box>
            <Hidden xsDown>
                <Grid container spacing={2}>
                    <Grid item sm={3}>
                        <Card>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={selected}
                                indicatorColor={'primary'}
                                onChange={(e, sel) => {
                                    this.setState({selected: sel})
                                }}
                            >
                                {children.map((child, key) => {
                                    return <FlexTab
                                        key={key}
                                        label={child.props.label}
                                        icon={child.props.icon}
                                        color={child.props.color}
                                        iconColor={child.props.iconColor}
                                        fontColor={child.props.fontColor}

                                    />
                                })}
                            </Tabs>
                        </Card>
                    </Grid>
                    <Grid item sm={9}>
                        {children.map((child, key) => {
                            return <FlexTabPanel tab key={key} label={child.props.label}
                                                 color={child.props.color}
                                                 iconColor={child.props.iconColor}
                                                 fontColor={child.props.fontColor}
                                                 icon={child.props.icon} index={key} selected={selected}>
                                {child}
                            </FlexTabPanel>;
                        })}
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden smUp>
                {children.map((child, key) => {
                    return <FlexTabPanel onChange={(e, sel) => {
                        this.setState({selected: sel})
                    }} selected={selected} key={key} label={child.props.label}
                                         color={child.props.color}
                                         iconColor={child.props.iconColor}
                                         fontColor={child.props.fontColor}

                                         icon={child.props.icon} index={key}>
                        {child}
                    </FlexTabPanel>;
                })}
            </Hidden>
        </Box>
    }
}

export default FlexTabs;