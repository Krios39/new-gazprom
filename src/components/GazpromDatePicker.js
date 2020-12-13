import DateFnsUtils from "@date-io/date-fns";
import {ThemeProvider} from "@material-ui/styles";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import React, {useEffect, useState} from "react";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";
import withStyles from "@material-ui/core/styles/withStyles";
import {InputBase} from "@material-ui/core";


const SmallGazpromInputBase = withStyles(() => ({
    root: {
        color: "#888",
        width: "100%",
    },
    input: {
        borderRadius: 4,
        border: '1px solid #D9D9D9',
        padding: '4px 12px 4px 12px',
        fontSize: 16,
        '&:focus': {
            borderRadius: 4,
            borderColor: '#2D9CDB',
        },
    },
}))(InputBase);

const BigGazpromInputBase = withStyles(() => ({
    root: {
        color: "#888",
        width: "100%",
    },
    input: {
        borderRadius: 4,
        padding: '10px 26px 10px 12px',
        border: '1px solid #D9D9D9',
        fontSize: 16,
        '&:focus': {
            borderRadius: 4,
            borderColor: '#2D9CDB',
        },
    },
}))(InputBase);

const materialTheme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

export default function GazpromDatePicker({className, value, onChange, size}) {

    const [datePickerSizeClass, setDatePickerSizeClass] = useState(BigGazpromInputBase)

    useEffect(() => {
        if (size === "small") setDatePickerSizeClass(SmallGazpromInputBase)
        else setDatePickerSizeClass(BigGazpromInputBase)
    }, [size])

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={materialTheme}>
                <DatePicker
                    className={className}
                    fullWidth
                    inputVariant="outlined"
                    variant="inline"
                    value={value}
                    onChange={date => onChange(date)}
                    minDate={new Date()}
                    format="dd.MM.yyyy"
                    TextFieldComponent={datePickerSizeClass}
                />
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    )
}