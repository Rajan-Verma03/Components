import React from "react";
import withWidth from "@material-ui/core/withWidth";
import SplitPane from "react-split-pane";

class ResponsiveSplitPane extends React.Component {

    render() {
        const {width, children, selected = 0} = this.props;
        if (width !== 'xs') {
            return <SplitPane {...this.props}>
                {children}
            </SplitPane>
        }
        for (var index in children) {
            if (index == selected) {
                return children[index].props.children;
            }
        }
    }
}

export default withWidth()(ResponsiveSplitPane);
