import React, {Component} from 'react';

import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';


import {HorizontalBar} from "react-chartjs-2";
import {Grid} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import {yellow} from "@material-ui/core/colors";


class RctBarChart extends React.Component {

    state = {}

    render() {

        const {attendance, label, ...props} = this.props;
        const {} = this.state;
        const data = {
            labels: ['Present', 'Absent', 'Leave'],
            datasets: [
                {
                    label: label,
                    backgroundColor: [
                        green[400],
                        red[400],
                        yellow[400]
                    ],
                    hoverBackgroundColor: [
                        green[700],
                        red[700],
                        yellow[700]
                    ],
                    data: attendance
                }
            ]
        };

        return <>
            <HorizontalBar data={data}
                 options={{
                     plugins: {
                         datalabels: {
                             display: true,
                             color: 'white',
                             formatter: function (value, context) {
                                 return context.chart.data.labels[context.dataIndex] + ': ' + value;
                             }
                         }
                     },
                     title: {
                         display: true,
                         text: label,
                         fontSize: 20
                     },
                     legend: {
                         display: true,
                         position: 'bottom',

                     }
                 }}/>

        </>

    }

}

export default RctBarChart;