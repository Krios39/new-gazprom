import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

export const GazpromButton = withStyles({
    root: {
        textTransform: 'none',
        backgroundColor: '#2D9CDB',
        '&:hover': {
            backgroundColor: '#0079C2'
        }
    }
})(Button)