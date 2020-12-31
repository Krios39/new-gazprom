import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Button, Typography} from "@material-ui/core";
import GazpromTextFieldWithTitle from "./GazpromTextField";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GazpromDatePicker from "./GazpromDatePicker";
import {GazpromButton} from "./GazpromButton";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {GazpromCheckbox} from "./GazpromCheckbox";

export const NotActiveButton = withStyles({
    root: {
        border: '1px solid #D9D9D9',
        textTransform: 'none',
        backgroundColor: '#fff',
        '&:hover': {
            color: "#fff",
            backgroundColor: '#0079C2',
            border: '1px solid #0079C2',
        }
    }
})(Button)

const useStyles = makeStyles(() => ({
    panelBox: {
        paddingRight: 30,
        marginTop: 76,
        width: "17%"
    },
    labelText: {
        fontWeight: 600,
        marginBottom: 13
    },
    checkBox: {
        height: 22,
        marginBottom: 13
    },
    littleText: {
        color: "#595959",
        fontSize: 14,
    },
    margin: {
        marginBottom: 13
    }
}))


export default function GazpromFilterPanel({admin}) {
    const classes = useStyles()

    const [search, setSearch] = useState("")
    const [fillingDateStart, setFillingDateStart] = useState()
    const [fillingDateEnd, setFillingDateEnd] = useState()
    const [expiryDateStart, setExpiryDateStart] = useState()
    const [expiryDateEnd, setExpiryDateEnd] = useState(new Date())

    const [state, setState] = useState({
        ENABLED: false,
        DISABLED: false,
        SHIPPED: false,
        REFUSED: false
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <Box className={classes.panelBox}>
            <Box>
                <Typography className={classes.labelText}>Инф система</Typography>
                <GazpromTextFieldWithTitle className={classes.margin} value={search} onChange={setSearch} small/>
            </Box>
            {!admin && <Box>
                <Typography className={classes.labelText}>Статус заявки</Typography>

                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            className={classes.checkBox}
                            control={<GazpromCheckbox checked={state.ENABLED} onChange={handleChange} name="ENABLED"/>}
                            label={<Typography className={classes.littleText}>Активна</Typography>}
                        />
                        <FormControlLabel
                            className={classes.checkBox}
                            control={<GazpromCheckbox
                                checked={state.DISABLED}
                                onChange={handleChange}
                                name="DISABLED"/>}
                            label={<Typography className={classes.littleText}>Не активна</Typography>}
                        />
                        <FormControlLabel
                            className={classes.checkBox}
                            control={<GazpromCheckbox checked={state.REFUSED} onChange={handleChange} name="REFUSED"/>}
                            label={<Typography className={classes.littleText}>Отклонена</Typography>}
                        />
                        <FormControlLabel
                            className={classes.checkBox}
                            control={<GazpromCheckbox checked={state.SHIPPED} onChange={handleChange} name="SHIPPED"/>}
                            label={<Typography className={classes.littleText}>Отправлена</Typography>}
                        />
                    </FormGroup>
                </FormControl>
            </Box>}


            <Box>
                <Typography className={classes.labelText}>Дата подачи</Typography>
                <GazpromDatePicker className={classes.margin} size={"small"} value={fillingDateStart}
                                   onChange={setFillingDateStart}/>
                <GazpromDatePicker className={classes.margin} size={"small"} value={fillingDateEnd}
                                   onChange={setFillingDateEnd} placeholder="Напишите причину отклонения заявки..."/>
            </Box>

            {!admin && <Box>
                <Typography className={classes.labelText}>Дата выдачи</Typography>
                <GazpromDatePicker className={classes.margin} size={"small"} value={expiryDateStart}
                                   onChange={setExpiryDateStart} placeholder="Напишите причину отклонения заявки..."/>
                <GazpromDatePicker className={classes.margin} size={"small"} value={expiryDateEnd}
                                   onChange={setExpiryDateEnd}/>
            </Box>}

            <GazpromButton
                className={classes.margin}
                fullWidth
                variant="contained"
                color="primary"
            >
                Применить
            </GazpromButton>
            <NotActiveButton
                fullWidth
                variant="contained"
            >
                Отменить
            </NotActiveButton>
        </Box>
    )
}