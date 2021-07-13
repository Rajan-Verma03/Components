import React from "react";
import {Card} from "@material-ui/core";


export default function ScrollViewCard({scrollToView, children, ...props}) {
    return (<Card {...props} ref={(root) => {
        if (scrollToView && root) {
            setTimeout(() => {
                root.scrollIntoView({
                    block: "end",
                    behavior: "smooth",
                });
            }, 1000);
        }
    }}>
        {children}
    </Card>);
}