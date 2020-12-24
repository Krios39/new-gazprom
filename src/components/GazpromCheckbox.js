import withStyles from "@material-ui/core/styles/withStyles";
import {Checkbox} from "@material-ui/core";
import React from "react";

export const GazpromCheckbox = withStyles({
    root: {
        color: '#2D9CDB',
        '&$checked': {
            color: '#2D9CDB',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
