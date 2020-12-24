import {withStyles} from "@material-ui/core/styles";
import {TextField, Typography} from "@material-ui/core";
import React from "react";
import Box from "@material-ui/core/Box";

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

export default function GazpromTextFieldWithTitle({title, error, value, onChange,className}) {
    return (
        <Box className={className}>
            {title &&
            <Typography>{title}</Typography>
            }
            <GazpromTextField
                size="small"
                fullWidth
                variant="outlined"
                error={error}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </Box>
    )
}