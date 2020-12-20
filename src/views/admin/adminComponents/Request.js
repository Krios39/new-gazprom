import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {Button, CircularProgress, Grid, makeStyles, Typography,Dialog,Tooltip,Paper,Box} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios"
import {ADMIN_AGREE, ADMIN_DISAGREE, BASE_URL, OWNER_AGREE, OWNER_DISAGREE, REQUEST} from "../../../constants/Urls";
import {accessTokenContext, roleContext} from "../../../App";
import clsx from "clsx";
import {GazpromTextField} from "../../../components/GazpromTextField";

const AgreeButton = withStyles({
    root: {
        width: "40%",
        textTransform: 'none',
        color: "#219653",
        borderColor: "#219653",
        backgroundColor: '#F6FFFA',
        '&:hover': {
            backgroundColor: '#F6FFFA'
        }
    }
})(Button)

const DisagreeButton = withStyles({
    root: {
        width: "40%",
        textTransform: 'none',
        color: "#EB5757",
        borderColor: "#EB5757",
        backgroundColor: '#FFF5F5',
        '&:hover': {
            backgroundColor: '#FFF5F5'
        }
    }
})(Button)

const useStyles = makeStyles((theme) => (
    {
        paper: {
            minWidth: "80%",
        },
        dialogBox: {
            minWidth: 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20
        },
        label: {
            fontSize: 24,
            fontWeight: 600,
        },
        buttonBox: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "90%",
            marginTop: 20
        },
        informationPanel: {
            width: "90%",
            paddingBottom: 10,
            marginTop: 10,
            paddingTop: 10,
            borderRadius: 16,
            background: "#e2f1f8",
        },
        informationPanelText: {
            fontSize: 20,
            marginLeft: 20,
            weight: 500
        },
        table: {
            width: "90%",
            paddingTop: theme.spacing(2),
            borderRadius: 8,
            backgroundColor: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        tableCell: {
            backgroundColor: "#fff",
            minHeight: 50,
            margin: theme.spacing(1),
            maxWidth: 900,
            width: '97%',
            borderRadius: 6,
        },
        borderCell: {
            border: "1px solid #d9d9d9",
        },
        borderLabel: {
            border: "1px solid rgba(38, 38, 38, 0.4)",
        },
        regularText: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            fontSize: 20,
            weight: 500
        },
        listLabel: {
            color: "#0079C2",
            fontWeight: 600,
        },
        nameBox: {
            paddingLeft: 30,
        },
        reasonTextField: {
            width: "90%",
        },
        buttonProgress: {
            color: '#06c',
            top: '50%',
            left: '50%',
        },
        progressBox: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            width: 200
        }
    }
))

export default function Request({open, onClose}) {
    const classes = useStyles()

    const {requestId} = useParams()
    const {accessToken} = useContext(accessTokenContext)
    const [users, setUsers] = useState([])

    const [system, setSystem] = useState("")
    const [date, setDate] = useState("")
    const [privileges, setPrivileges] = useState([])

    const [reasonDialogOpen, setReasonDialogOpen] = useState(false)
    const [reason, setReason] = useState("")

    const [adminConsent, setAdminConsent] = useState()

    const [dataDownload, setDataDownload] = useState(false)

    const {adminId} = useParams()
    const {role} = useContext(roleContext)
    const history = useHistory()

    useEffect(() => {
        if (open) axios.get(BASE_URL + REQUEST, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            params: {
                requestId: requestId
            }
        }).then(resp => {
            setData(resp.data)
            setDataDownload(true)
        })
    }, [open])

    useEffect(() => {
        setDataDownload(false)
        setReason("")
    }, [open])

    const adminConsentChange = consent => {
        setAdminConsent(consent)
        setReasonDialogOpen(true)
        setDataDownload(true)
    }

    const dateToString = date => {
        if (date.year === 1) return "-"
        const day = date.day
        const month = date.month
        const year = date.year + 1900
        return `${day}.${month}.${year}`
    }

    const setData = data => {
        setSystem(data.system)
        setDate(dateToString(data.fillingDate))
        setPrivileges(data.privileges)
        setUsers(data.users)
    }

    const getPrivilegeTitle = (privilege, key) => {
        if (key !== privileges.length - 1) return privilege.toString() + ", "
        else return privilege + " "
    }

    const sendConsent = () => {
        const adminOrOwner = role === "owner" ? adminConsent ? OWNER_AGREE : OWNER_DISAGREE : adminConsent ? ADMIN_AGREE : ADMIN_DISAGREE
        console.log(adminOrOwner)
        axios.get(BASE_URL + adminOrOwner, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            params: {
                requestId: requestId,
                userId: adminId,
                reason: reason
            }
        })
            .then(resp => {
                console.log(resp)
            }).catch(e => {
            if (e.response.status === 401) history.push('/authorization')
        })
    }

    return (
        <Dialog className={classes.dialog} maxWidth="lg" open={open} onClose={() => onClose(-1)}>
            {!dataDownload ?
                <Box className={classes.progressBox}>
                    <CircularProgress size={28} className={classes.buttonProgress}/>
                </Box>
                :
                <Paper className={classes.dialogBox} elevation={3}>
                    <Typography className={classes.label}>Заявка на обработку</Typography>
                    <Box mx={2} className={classes.informationPanel}>
                        <Typography className={classes.informationPanelText}>{system}</Typography>
                        <Typography className={classes.informationPanelText}>Дата подачи:{date}</Typography>
                        <Typography className={clsx(classes.informationPanelText, classes.regularText)}>Привилегии:
                            {privileges.map((privilege, key) =>
                                <Tooltip key={key} title={privilege.description}>
                                    <Typography
                                        className={clsx(classes.regularText)}>{getPrivilegeTitle(privilege.title, key)}</Typography>
                                </Tooltip>
                            )}
                        </Typography>
                    </Box>
                    <Typography>Сотрудники на предоставление доступа:</Typography>
                    <Box className={classes.table}>
                        <Grid container
                              className={clsx(classes.tableCell, classes.borderLabel)}
                              direction="row"
                              justify="space-evenly"
                              alignItems="center"
                              spacing={2}
                        >
                            <Grid xs item zeroMinWidth container>
                                <Typography noWrap className={clsx(classes.date, classes.listLabel, classes.nameBox)}>
                                    <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                        ФИО
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid xs item zeroMinWidth container justify="center">
                                <Typography noWrap className={clsx(classes.date, classes.listLabel)}>
                                    <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                        Должность
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid xs item zeroMinWidth container justify="center">
                                <Typography noWrap className={clsx(classes.date, classes.listLabel)}>
                                    <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                        Подразделение
                                    </Box>
                                </Typography>
                            </Grid>

                        </Grid>
                        {users.map((user, key) =>
                            <Grid key={key}
                                  container
                                  className={clsx(classes.tableCell, classes.borderCell)}
                                  direction="row"
                                  justify="space-around"
                                  alignItems="center"
                                  spacing={2}

                            >
                                <Grid xs item wrap="nowrap" zeroMinWidth container>
                                    <Tooltip title={user.lastName + " " + user.name}>
                                        <Typography noWrap className={clsx(classes.date, classes.nameBox)}>
                                            <Box
                                                component="div"
                                                textOverflow="ellipsis"
                                                overflow="hidden"
                                            >
                                                {user.lastName + " " + user.name}
                                            </Box>
                                        </Typography>
                                    </Tooltip>
                                </Grid>
                                <Grid xs item wrap="nowrap" zeroMinWidth container justify="center">
                                    <Typography noWrap className={classes.date}>
                                        <Box
                                            component="div"
                                            textOverflow="ellipsis"
                                            overflow="hidden"
                                        >aaaaaaaaaaaaa

                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid xs item wrap="nowrap" zeroMinWidth container justify="center">
                                    <Tooltip title={user.department}>
                                        <Typography noWrap className={classes.date}>
                                            <Box
                                                component="div"
                                                textOverflow="ellipsis"
                                                overflow="hidden"
                                            >
                                                {user.department}
                                            </Box>
                                        </Typography>
                                    </Tooltip>
                                </Grid>

                            </Grid>
                        )}
                    </Box>
                    <Box className={classes.buttonBox}>
                        <AgreeButton onClick={() => adminConsentChange(true)}
                                     variant="outlined">Согласовать</AgreeButton>
                        <DisagreeButton onClick={() => adminConsentChange(false)} variant="outlined">Отправить на
                            доработку</DisagreeButton>
                    </Box>
                </Paper>
            }

            <Dialog maxWidth="lg" open={reasonDialogOpen} onClose={() => setReasonDialogOpen(false)}>
                <Paper className={classes.dialogBox} elevation={3}>
                    <Typography
                        className={classes.label}>{adminConsent ? "Вы действительно хотите одобрить заявку?" : "Вы действительно хотите отклонить заявку?"}</Typography>
                    {!adminConsent && <GazpromTextField
                        size="small"
                        className={classes.reasonTextField}
                        variant="outlined"
                        multiline
                        rows={6}
                        placeholder="Напишите причину отклонения заявки..."
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                    />}
                    <Box className={classes.buttonBox}>
                        <AgreeButton onClick={sendConsent} variant="outlined">Да</AgreeButton>
                        <DisagreeButton onClick={() => setReasonDialogOpen(false)}
                                        variant="outlined">Отмена
                        </DisagreeButton>
                    </Box>
                </Paper>
            </Dialog>
        </Dialog>
    )
}