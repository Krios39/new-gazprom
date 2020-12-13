import {withStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

export const GazpromTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#2D9CDB',
            },
        },
    },
})(TextField);

export const SmallGazpromTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            padding: '4px 12px 4px 12px',
            border: '1px solid #D9D9D9',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#2D9CDB',
            },
        },
    },
})(TextField);