import {
    CircularProgress,
    Container,
    FormControl,
    InputBase,
    MenuItem,
    Select,
    Typography,
    Paper
} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {GazpromTextField} from "../../../components/GazpromTextField";
import withStyles from "@material-ui/core/styles/withStyles";
import {GazpromButton} from "../../../components/GazpromButton";
import axios from "axios"
import {ADD_USER, ALL_DEPARTMENTS, ALL_UNITS, ALL_USERS, BASE_URL} from "../../../constants/Urls";
import {accessTokenContext} from "../../../App";
import {useHistory} from "react-router";

const GazpromInput = withStyles((theme) => ({
    root: {
        color: "#888",
        width: theme.spacing(22),
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        border: '1px solid #D9D9D9',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#2D9CDB',
        },
    },
}))(InputBase);


const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: 20,

    },
    formElement: {
        marginBottom: 10,
        position: "relative",
        minHeight: 65
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 30
    },
    margin: {
        width: "80%"
    },
    regularText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    titleText: {
        marginTop: theme.spacing(3),
        fontWeight: 600,
        marginBottom: 20
    },
    buttonProgress: {
        color: '#06c',
        position: 'absolute',
        left: '50%',
        marginTop: 20,
        marginLeft: -12,
    },
    systems: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxHeight: 250
    },
    select: {
        minWidth: 316
    },
    regButton: {
        marginTop: 5
    }
}));

export default function WorkerRegistration() {
    const classes = useStyles()
    const {accessToken} = useContext(accessTokenContext)

    const [units, setUnits] = useState([])
    const [selectedUnit, setSelectedUnit] = useState(0)
    const [unitLoading, setUnitLoading] = useState(true)

    const [departments, setDepartments] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState(0)
    const [departmentsLoading, setDepartmentsLoading] = useState(true)

    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState(false)
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [middleName, setMiddleName] = useState("")
    const [middleNameError, setMiddleNameError] = useState(false)
    const [userName, setUserName] = useState("")
    const [userNameError, setUserNameError] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)

    const history = useHistory()

    useEffect(() => {
        axios.get(BASE_URL + ALL_UNITS,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        )
            .then(resp => {

                setUnits(resp.data)
                setSelectedUnit(resp.data[0].id)
                setUnitLoading(false)
            })
    }, [])

    useEffect(() => {
        if (units.length > 0) {
            setDepartmentsLoading(true)
            axios.get(BASE_URL + ALL_DEPARTMENTS, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                params: {
                    unitId: selectedUnit
                }
            }).then(resp => {
                setDepartments(resp.data)
                setSelectedDepartment(resp.data[0].id)
                setDepartmentsLoading(false)
            }).catch(e => {
                if (e.response.status === 401) history.push('/authorization')
            })
        }
    }, [selectedUnit])

    useEffect(() => {
        setUserNameError(false)
    }, [userName])
    useEffect(() => {
        setPasswordError(false)
    }, [password])
    useEffect(() => {
        setNameError(false)
    }, [name])
    useEffect(() => {
        setLastNameError(false)
    }, [lastName])
    useEffect(() => {
        setMiddleNameError(false)
    }, [middleName])

    const unitHandleChange = (event) => {
        setSelectedUnit(event.target.value)
    }

    const departmentHandleChange = (event) => {
        setSelectedDepartment(event.target.value)
    }

    const registrate = () => {

        const request = {
            userName: userName,
            password: password,
            name: name,
            lastName: lastName,
            middleName: middleName,
            email: "devbybelousov@yandex.ru",
            departmentId: departments.find(departments => departments.id === selectedDepartment).id,
            role: 0
        }
        axios.post(BASE_URL + ADD_USER, request, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        }).then(resp => {
            console.log(resp)
        }).catch(e => {
            if (e.response.status === 401) history.push('/authorization')
        })
    }

    const genPassword = (length) => {
        if (length > 10) length = 10;
        length = length * (-1);
        return Math.random().toString(36).slice(length);
    }

    const getUserName = () => {
        axios.get(BASE_URL + ALL_USERS, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        }).then(resp => {
            console.log(resp)
            setUserName("user" + (resp.data[resp.data.length - 1].userId + 1))
        })
    }

    const fieldsCheck = () => {
        if (userName.trim() !== "" && password.trim() !== "" && name.trim() !== "" && lastName.trim() !== "" && middleName.trim() !== "") registrate()
        else errorSearch()
    }

    const errorSearch = () => {
        if (userName.trim() === "") setUserNameError(true)
        if (password.trim() === "") setPasswordError(true)
        if (name.trim() === "") setNameError(true)
        if (lastName.trim() === "") setLastNameError(true)
        if (middleName.trim() === "") setMiddleNameError(true)
    }

    return (
        <Container className={classes.main} maxWidth="xs">
            <Paper elevation={3}>
                <Box className={classes.paper}>

                    <Typography
                        className={clsx(classes.titleText)}
                        variant="h5"
                    >
                        Регистрация сотрудника
                    </Typography>

                    <Box className={clsx(classes.formElement, classes.margin)}>
                        <Typography>
                            Фамилия
                        </Typography>
                        <GazpromTextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                            error={lastNameError}
                        />
                    </Box>

                    <Box className={clsx(classes.formElement, classes.margin)}>
                        <Typography>
                            Имя
                        </Typography>
                        <GazpromTextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            error={nameError}
                        />
                    </Box>

                    <Box className={clsx(classes.formElement, classes.margin)}>
                        <Typography>
                            Отчество
                        </Typography>
                        <GazpromTextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={middleName}
                            onChange={event => setMiddleName(event.target.value)}
                            error={middleNameError}
                        />
                    </Box>

                    <Box className={clsx(classes.formElement, classes.margin)}>
                        <Typography>
                            Отдел
                        </Typography>
                        {unitLoading ? <CircularProgress size={28} className={classes.buttonProgress}/> :
                            <FormControl>
                                <Select
                                    className={classes.select}
                                    disabled={unitLoading}
                                    onChange={unitHandleChange}
                                    input={<GazpromInput/>}
                                    value={units.find(unit => unit.id === selectedUnit).id}
                                >
                                    {units.length > 0 && units.map((unit, key) =>
                                        <MenuItem value={unit.id} key={key}>{unit.title}</MenuItem>
                                    )
                                    }
                                </Select>
                            </FormControl>

                        }
                    </Box>
                    <Box className={clsx(classes.formElement, classes.margin)}>
                        <Typography>
                            Подразделения
                        </Typography>
                        {departmentsLoading ? <CircularProgress size={28} className={classes.buttonProgress}/> :
                            <FormControl>
                                <Select className={classes.select}
                                        disabled={departmentsLoading}
                                        onChange={departmentHandleChange}
                                        input={<GazpromInput/>}
                                        value={departments.find(department => department.id === selectedDepartment).id}
                                >
                                    {departments.map((department, key) =>
                                        <MenuItem key={key} value={department.id}>{department.title} </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        }

                    </Box>

                    <Box className={clsx(classes.formElement, classes.margin)}>
                        <Typography>
                            Логин
                        </Typography>
                        <GazpromButton
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={getUserName}

                        >Сгенерировать логин</GazpromButton>
                        <GazpromTextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={userName}
                            error={userNameError}
                            onChange={event => setUserName(event.target.value)}
                        />
                    </Box>
                    <Box className={clsx(classes.formElement, classes.margin)}>
                        <Typography>
                            Пароль
                        </Typography>
                        <GazpromButton
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => setPassword(genPassword(8))}

                        >Сгенерировать пароль</GazpromButton>
                        <GazpromTextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            error={passwordError}
                        />
                    </Box>


                    <GazpromButton
                        className={clsx(classes.margin, classes.regButton)}
                        variant="contained"
                        color="primary"
                        onClick={fieldsCheck}
                    >Зарегистрировать</GazpromButton>
                </Box>
            </Paper>
        </Container>
    )
}