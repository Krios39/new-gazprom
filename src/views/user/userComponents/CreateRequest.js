import React, {useContext, useEffect, useState} from "react";
import {
    Box, Container,
    Dialog, DialogTitle, DialogContent, DialogActions,
    List, ListItem, ListItemIcon, ListItemText,
    Paper, Radio,
    Typography, FormControlLabel, CircularProgress, Link
} from "@material-ui/core";
import {GazpromButton} from "../../../components/GazpromButton";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {useHistory, useParams} from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import {GazpromTextField} from "../../../components/GazpromTextField";
import axios from "axios"
import {ADD_REQUEST, ALL_SYSTEMS, ALL_USERS, BASE_URL} from "../../../constants/Urls";
import {accessTokenContext} from "../../../App";
import Tooltip from "@material-ui/core/Tooltip";
import {GazpromCheckbox} from "../../../components/GazpromCheckbox";

const GazpromRadio = withStyles({
    root: {
        color: '#2D9CDB',
        '&$checked': {
            color: '#2D9CDB',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "15%"
    },
    formElement: {
        marginBottom: "20px",
        position: "relative"
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    margin: {
        width: "90%"
    },
    regularText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },

    titleText: {
        marginTop: theme.spacing(3),
        fontWeight: 600
    },
    buttonProgress: {
        color: '#06c',
        position: 'absolute',
        left: '50%',
        marginLeft: -12,
    },
    systems: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxHeight: 250
    },
    boldText: {
        fontWeight: 600
    }
}));

export default function CreateRequest() {
    const classes = useStyles()

    const [loading, setLoading] = useState(false)

    const [systemDialogOpen, setSystemDialogOpen] = useState(false)
    const [roleDialogOpen, setRoleDialogOpen] = useState(false)

    const [systems, setSystems] = useState([])
    const [selectedSystem, setSelectedSystem] = useState(0)
    const [privileges, setPrivileges] = useState([])
    const [selectedPrivileges, setSelectedPrivileges] = useState([])
    const [workers, setWorkers] = useState([])
    const [filterWorkers, setFilterWorkers] = useState([])
    const [selectedWorkers, setSelectedWorkers] = useState([])

    const [dialogStep, setDialogStep] = useState(0)
    const [search, setSearch] = useState("")
    const {userId} = useParams()
    const history = useHistory()

    const date = new Date()

    const {accessToken} = useContext(accessTokenContext)

    useEffect(() => {
        const request = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        }

        axios.get(BASE_URL + ALL_SYSTEMS, request)
            .then(resp => {
                setSystems(resp.data)
            })
            .catch(error => {
                if (error.response.status === 401) history.push('/authorization')
                // if (error.response.status === 500) handleOpen("Ошибка сервера")
            })

        axios.get(BASE_URL + ALL_USERS, request)
            .then(resp => {
                workerSelfException(resp.data)
            })
            .catch(error => {
                if (error.response.status === 401) history.push('/authorization')
                //if (error.response.status === 500) handleOpen("Ошибка сервера")
            })
    }, [])

    useEffect(() => {
        if (systems.length !== 0) {
            setSelectedSystem(systems[0].id)
            setPrivileges(systems[0].privileges)
        }
        setSelectedPrivileges([])
    }, [systems])

    useEffect(() => {
        setLoading(systemDialogOpen)
    }, [systemDialogOpen])

    useEffect(() => {
        if (dialogStep < 0 || dialogStep > 1) setSystemDialogOpen(false)
    }, [dialogStep])

    useEffect(() => {
        if (search !== "") {
            setFilterWorkers(workers.filter(worker => worker.name.indexOf(search, 0) > -1))
        } else setFilterWorkers(workers)
    }, [search, workers])

    const workerSelfException = (data) => {
        let a = [...data]
        data.map(user => {
            if (user.userId.toString() === userId) {
                a.splice(a.indexOf(user), 1)
            }
            return a
        })
        setWorkers(a)
    }

    const systemChange = (id) => {
        setSelectedSystem(id)
        if (systems.length !== 0) setPrivileges(systems[systems.indexOf(systems.find(system => system.id === id))].privileges)
        setSelectedPrivileges([])
    }

    const privilegeChange = (key) => {
        if (selectedPrivileges.indexOf(privileges[key].id) !== -1) {
            let a = [...selectedPrivileges]
            a.splice(selectedPrivileges.indexOf(privileges[key].id), 1)
            setSelectedPrivileges(a)
        } else setSelectedPrivileges(prevState => [...prevState, privileges[key].id])
    }

    const workerSelectChange = (worker) => {
        if (selectedWorkers.indexOf(worker.userId) !== -1) {
            let a = [...selectedWorkers]
            a.splice(selectedWorkers.indexOf(worker.userId), 1)
            setSelectedWorkers(a)
        } else setSelectedWorkers(prevState => [...prevState, worker.userId])
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendRequest()
        }
    }

    const sendRequest = () => {
        setLoading(true)
        const request = {
            usersId: [...selectedWorkers, Number(userId)],
            privilegesId: selectedPrivileges,
            idSystem: selectedSystem
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
        axios.post(BASE_URL + ADD_REQUEST, request, {
            headers: headers
        })
            .then(() => {
                setLoading(false)
                history.push(`/user=${userId}/info`)
            })
            .catch(e => {
                if (e.response.status === 401) history.push('/authorization')
                setLoading(false)
            })
    }

    const dialogStepChange = step => {
        setDialogStep(prevState => prevState + step)
    }

    const dialogOpen = step => {
        setDialogStep(step)
        setSystemDialogOpen(true)
    }

    const getPrivilegesString = () => {
        let a = []
        privileges.map(privilege => {
            if (selectedPrivileges.indexOf(privilege.id) > -1) a.push(clsx(privilege.title))
            return a
        })
        return a.join(", ")
    }

    return (
        <Container
            onKeyPress={(event) => handleKeyPress(event)}
            className={classes.main}
            maxWidth="xs">
            {
                <Paper elevation={3}>
                    <Box className={classes.paper}>
                        <Typography className={clsx(classes.formElement, classes.titleText)}
                                    variant="h5">
                            Создание заявки
                        </Typography>
                        {selectedPrivileges.length === 0 &&
                        <Box className={classes.formElement}>
                            <GazpromButton
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => setSystemDialogOpen(true)}
                                disabled={loading}
                            >
                                Выбрать информационную систему
                            </GazpromButton>
                        </Box>
                        }
                        {
                            selectedPrivileges.length > 0 &&
                            <Box className={clsx([classes.paper, classes.margin])}>
                                <Box className={clsx(classes.regularText, classes.margin)}>
                                    <Typography className={clsx(classes.formElement, classes.boldText)}>
                                        <Link color="inherit" onClick={() => dialogOpen(0)}>
                                            {systems.find(system => system.id === selectedSystem).title}
                                        </Link>
                                    </Typography>
                                    <Typography className={clsx(classes.formElement, classes.boldText)}>
                                        <Link color="inherit" onClick={() => dialogOpen(1)}>
                                            Привилегии: {getPrivilegesString()}
                                        </Link>
                                    </Typography>
                                    <Typography className={clsx(classes.formElement, classes.boldText)}>
                                        Дата подачи: {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}
                                    </Typography>
                                </Box>
                                <GazpromButton
                                    className={clsx(classes.formElement, classes.margin)}
                                    onClick={() => setRoleDialogOpen(true)}
                                    variant="contained"
                                    color="primary">
                                    Добавить пользователей
                                </GazpromButton>
                                {selectedWorkers.length !== 0 &&
                                <Box className={clsx(classes.regularText, classes.margin)}>
                                    <Typography className={clsx(classes.formElement, classes.regularText)}>
                                        <Link color="inherit" onClick={() => setRoleDialogOpen(true)}>
                                            Добавленные сотрудники ({selectedWorkers.length})
                                        </Link>
                                    </Typography>
                                </Box>
                                }
                                <GazpromButton
                                    className={clsx(classes.formElement, classes.margin)}
                                    variant="contained"
                                    color="primary"
                                    onClick={sendRequest}
                                    disabled={loading}
                                >
                                    Отправить заявку
                                    {loading && <CircularProgress size={28} className={classes.buttonProgress}/>}
                                </GazpromButton>
                            </Box>
                        }
                    </Box>
                </Paper>
            }

            <Dialog
                open={systemDialogOpen}
                onClose={() => setSystemDialogOpen(false)}>
                <DialogTitle>{dialogStep === 0 ? "Выберите информационную систему" : "Выберите привлегии"}</DialogTitle>
                <DialogContent className={classes.systems}>
                    {dialogStep === 0 && systems.map((system, key) =>
                        <FormControlLabel
                            key={key}
                            control={
                                <GazpromRadio
                                    className={classes.check}
                                    checked={(system.id === selectedSystem)}
                                    onChange={() => systemChange(system.id)}/>}
                            label={<Typography className={classes.littleText}>{system.title}</Typography>}
                        />
                    )}
                    {dialogStep !== 0 && privileges.map((privilege, key) =>
                        <Tooltip key={key} title={privilege.description}>
                            <FormControlLabel
                                control={
                                    <GazpromCheckbox
                                        className={classes.check}
                                        checked={(selectedPrivileges.indexOf(privilege.id) > -1)}
                                        onChange={() => privilegeChange(key)}/>
                                }
                                label={<Typography className={classes.littleText}>{privilege.title}</Typography>}
                            />
                        </Tooltip>
                    )
                    }
                </DialogContent>
                <DialogActions>
                    <GazpromButton
                        onClick={() => dialogStepChange(-1)}
                        variant="contained"
                        color="primary">
                        Назад
                    </GazpromButton>
                    <GazpromButton
                        onClick={() => dialogStepChange(1)}
                        variant="contained"
                        color="primary">
                        Далее
                    </GazpromButton>
                </DialogActions>
            </Dialog>


            <Dialog
                open={roleDialogOpen}
                onClose={() => setRoleDialogOpen(false)}>
                <DialogTitle>Выберите сотрудников
                    <GazpromTextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </DialogTitle>
                <DialogContent className={classes.systems}>
                    <List>
                        {filterWorkers.map((worker, key) =>
                            <ListItem key={key} dense button onClick={() => workerSelectChange(worker)}>
                                <ListItemIcon>
                                    <GazpromCheckbox
                                        checked={(selectedWorkers.indexOf(worker.userId) > -1)}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={clsx(worker.lastName, worker.name, worker.middleName)}/>
                            </ListItem>
                        )
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <GazpromButton
                        onClick={() => setRoleDialogOpen(false)}
                        variant="contained"
                        color="primary">
                        Далее
                    </GazpromButton>
                </DialogActions>
            </Dialog>


        </Container>
    )
}