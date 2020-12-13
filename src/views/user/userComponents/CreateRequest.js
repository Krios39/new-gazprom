import React, {useEffect, useState} from "react";
import {
    Box, Container,
    Dialog, DialogTitle, DialogContent, DialogActions,
    List, ListItem, ListItemIcon, ListItemText,
    Paper, Radio,
    Typography, FormControlLabel, Checkbox, CircularProgress
} from "@material-ui/core";
import {GazpromButton} from "../../../components/GazpromButton";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {useHistory, useParams} from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import {GazpromTextField} from "../../../components/GazpromTextField";


const data = [
    {
        system: "Информационная система 1",
        roles: ["роль 11", "роль 12", "роль 13", "роль 14", "роль 15"]
    },
    {
        system: "Информационная система 2",
        roles: ["роль 21", "роль 22", "роль 23", "роль 24", "роль 25"]
    },
    {
        system: "Информационная система 3",
        roles: ["роль 31", "роль 32", "роль 33", "роль 34", "роль 35"]
    },
    {
        system: "Информационная система 4",
        roles: ["роль 41", "роль 42", "роль 43", "роль 44", "роль 45"]
    },
    {
        system: "Информационная система 5",
        roles: ["роль 51", "роль 52", "роль 53", "роль 54", "роль 55"]
    },
    {
        system: "Информационная система 6",
        roles: ["роль 61", "роль 62", "роль 63", "роль 64", "роль 65"]
    },
    {
        system: "Информационная система 7",
        roles: ["роль 71", "роль 72", "роль 73", "роль 74", "роль 75"]
    },
    {
        system: "Информационная система 8",
        roles: ["роль 81", "роль 82", "роль 83", "роль 84", "роль 85"]
    },
    {
        system: "Информационная система 9",
        roles: ["роль 91", "роль 92", "роль 93", "роль 94", "роль 95"]
    },
    {
        system: "Информационная система 1",
        roles: ["роль 11", "роль 12", "роль 13", "роль 14", "роль 15"]
    },
    {
        system: "Информационная система 2",
        roles: ["роль 21", "роль 22", "роль 23", "роль 24", "роль 25"]
    },
    {
        system: "Информационная система 3",
        roles: ["роль 31", "роль 32", "роль 33", "роль 34", "роль 35"]
    },
    {
        system: "Информационная система 4",
        roles: ["роль 41", "роль 42", "роль 43", "роль 44", "роль 45"]
    },
    {
        system: "Информационная система 5",
        roles: ["роль 51", "роль 52", "роль 53", "роль 54", "роль 55"]
    },
    {
        system: "Информационная система 6",
        roles: ["роль 61", "роль 62", "роль 63", "роль 64", "роль 65"]
    },
    {
        system: "Информационная система 7",
        roles: ["роль 71", "роль 72", "роль 73", "роль 74", "роль 75"]
    },
    {
        system: "Информационная система 8",
        roles: ["роль 81", "роль 82", "роль 83", "роль 84", "роль 85"]
    },
    {
        system: "Информационная система 9",
        roles: ["роль 91", "роль 92", "роль 93", "роль 94", "роль 95"]
    },
    {
        system: "Информационная система 1",
        roles: ["роль 11", "роль 12", "роль 13", "роль 14", "роль 15"]
    },
    {
        system: "Информационная система 2",
        roles: ["роль 21", "роль 22", "роль 23", "роль 24", "роль 25"]
    },
    {
        system: "Информационная система 3",
        roles: ["роль 31", "роль 32", "роль 33", "роль 34", "роль 35"]
    },
    {
        system: "Информационная система 4",
        roles: ["роль 41", "роль 42", "роль 43", "роль 44", "роль 45"]
    },
    {
        system: "Информационная система 5",
        roles: ["роль 51", "роль 52", "роль 53", "роль 54", "роль 55"]
    },
    {
        system: "Информационная система 6",
        roles: ["роль 61", "роль 62", "роль 63", "роль 64", "роль 65"]
    },
    {
        system: "Информационная система 7",
        roles: ["роль 71", "роль 72", "роль 73", "роль 74", "роль 75"]
    },
    {
        system: "Информационная система 8",
        roles: ["роль 81", "роль 82", "роль 83", "роль 84", "роль 85"]
    },
    {
        system: "Информационная система 9",
        roles: ["роль 91", "роль 92", "роль 93", "роль 94", "роль 95"]
    },
]

const work = [
    {name: "work1", id: 1}, {name: "work2", id: 2}, {name: "work3", id: 3}, {name: "work4", id: 4}, {
        name: "work5",
        id: 5
    }, {name: "work6", id: 6}, {name: "work7", id: 7}, {name: "work8", id: 8}, {name: "work9", id: 9},
]

const GazpromRadio = withStyles({
    root: {
        color: '#2D9CDB',
        '&$checked': {
            color: '#2D9CDB',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const GazpromCheckbox = withStyles({
    root: {
        color: '#2D9CDB',
        '&$checked': {
            color: '#2D9CDB',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

}));

export default function CreateRequest() {
    const classes = useStyles()

    const [loading, setLoading] = useState(false)

    const [systemDialogOpen, setSystemDialogOpen] = useState(false)
    const [roleDialogOpen, setRoleDialogOpen] = useState(false)

    const [systems, setSystems] = useState([])
    const [selectedSystem, setSelectedSystem] = useState(0)
    const [roles, setRoles] = useState([])
    const [selectedRoles, setSelectedRoles] = useState([])
    const [workers, setWorkers] = useState([])
    const [filterWorkers, setFilterWorkers] = useState([])
    const [selectedWorkers, setSelectedWorkers] = useState([])

    const [dialogStep, setDialogStep] = useState(0)

    const [search, setSearch] = useState("")


    const history = useHistory()

    useEffect(() => {
        setSystems(data)
        setWorkers(work)
    }, [])

    useEffect(() => {
        setSelectedSystem(0)
        if (systems.length !== 0) setRoles(systems[0].roles)
        setSelectedRoles([])
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

    const systemChange = (key) => {
        setSelectedSystem(key)
        if (systems.length !== 0) setRoles(systems[key].roles)
        setSelectedRoles([])
    }

    const rolesChange = (key) => {
        if (selectedRoles.indexOf(roles[key]) !== -1) {
            let a = [...selectedRoles]
            a.splice(selectedRoles.indexOf(roles[key]), 1)
            setSelectedRoles(a)
        } else setSelectedRoles(prevState => [...prevState, roles[key]])
    }

    const workerSelectChange = (id) => {
        if (selectedWorkers.indexOf(id) !== -1) {
            let a = [...selectedWorkers]
            a.splice(selectedWorkers.indexOf(id), 1)
            setSelectedWorkers(a)
        } else setSelectedWorkers(prevState => [...prevState, id])
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendRequest()
        }
    }

    const {userId} = useParams()

    const sendRequest = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            history.push(`/user=${userId}/info`)
        }, 3000)

    }

    const dialogStepChange = (step) => {
        setDialogStep(prevState => prevState + step)

    }

    const getSelectedWorkers = () => {
        let a = []
        workers.map((worker) => {
            if (selectedWorkers.indexOf(worker.id) > -1) a.push(worker.name)
        })
        return a
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
                        {selectedRoles.length === 0 &&
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
                            selectedRoles.length > 0 &&
                            <Box className={clsx([classes.paper, classes.margin])}>
                                <Box className={clsx(classes.regularText, classes.margin)}>
                                    <Typography className={clsx(classes.formElement)}>
                                        {systems[selectedSystem].system}
                                    </Typography>
                                    <Typography className={clsx(classes.formElement, classes.regularText)}>
                                        Роли: {selectedRoles.join(", ")}
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
                                        Сотрудники: {getSelectedWorkers().join(", ")}
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
                <DialogTitle>{"Выберите информационную систему"}</DialogTitle>
                <DialogContent className={classes.systems}>
                    {dialogStep === 0 && systems.map((system, key) =>
                        <FormControlLabel
                            control={<GazpromRadio className={classes.check} checked={(key === selectedSystem)}
                                                   onChange={() => systemChange(key)}/>}
                            label={<Typography className={classes.littleText}>{system.system}</Typography>}
                        />
                    )}
                    {dialogStep !== 0 && roles.map((role, key) =>
                        <FormControlLabel
                            control={<GazpromCheckbox className={classes.check}
                                                      checked={(selectedRoles.indexOf(role) > -1)}
                                                      onChange={() => rolesChange(key)}/>}
                            label={<Typography className={classes.littleText}>{role}</Typography>}
                        />
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
                            <ListItem key={key} dense button onClick={() => workerSelectChange(worker.id)}>
                                <ListItemIcon>
                                    <GazpromCheckbox
                                        checked={(selectedWorkers.indexOf(worker.id) > -1)}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={worker.name}/>
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