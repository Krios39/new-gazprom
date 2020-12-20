import React, {useContext, useEffect, useState} from 'react';
import Gazprom from "../../static/Gazprom (icon).png"
import {Avatar, Box, CardContent, CircularProgress, Container, Paper, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom"
import {GazpromButton} from "../../components/GazpromButton";
import {GazpromTextField} from "../../components/GazpromTextField";
import GazpromDialog from "../../components/GazpromDialog";
import axios from "axios"
import {BASE_URL, SIGN_IN} from "../../constants/Urls";
import {accessTokenContext, roleContext} from "../../App";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "15%"
    },
    form: {
        width: "90%"
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
    avatar: {
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(3),
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    buttonProgress: {
        color: '#06c',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function Authorization() {
    const classes = useStyles();

    const history = useHistory()

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [textFieldError, setTextFieldError] = useState(false)

    const {setAccessToken} = useContext(accessTokenContext)
    const {setRole} = useContext(roleContext)
    // useEffect(()=>{
    //  setAccessToken("")
    // })

    useEffect(() => {
        setTextFieldError(false)
    }, [login, password])

    const sendLogin = () => {
        const data = {
            userName: login,
            password: password,
        }
        axios.post(BASE_URL + SIGN_IN, data)
            .then(resp => {
                setAccessToken(resp.data.accessToken)
                setLoading(false)
                    // history.push(`/user=${resp.data.userId}/info`)
                if(resp.data.role==="ROLE_SUPER_ADMIN"||resp.data.role==="ROLE_OWNER"||resp.data.role==="ROLE_PRIMARY_ADMIN"||resp.data.role==="ROLE_BACKUP_ADMIN") history.push(`/admin=${resp.data.userId}/info/-1`)
                else history.push(`/user=${resp.data.userId}/info`)
                if (resp.data.role==="ROLE_OWNER") setRole("owner")
                if (resp.data.role==="ROLE_PRIMARY_ADMIN"||resp.data.role==="ROLE_BACKUP_ADMIN") setRole("admin")
            })
            .catch(error=>{
                if (error.response.status === 401) handleOpen("Пользователь с заданными логином и паролем не найден")
                if (error.response.status === 500) handleOpen("Ошибка сервера")
            })
    }

    const fieldsCheck = () => {
        setLoading(true)
        const log = login.trim()
        const pass = password.trim()
        if (log === "" || pass === "") {
            setTextFieldError(true)
            handleOpen("Логин или пароль введены некоректно")
        } else sendLogin()
    }

    const handleOpen = text => {
        setTextFieldError(true)
        setLoading(false)
        setErrorText(text);
        setDialogOpen(true);
        setPassword("");
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fieldsCheck()
        }
    }

    return (
        <Container onKeyPress={(event) => handleKeyPress(event)} className={classes.main} component="main"
                   maxWidth="xs">
            <Paper elevation={3}>
                <CardContent>
                    <Box className={classes.paper}>
                        <Avatar className={classes.avatar} src={Gazprom}/>
                        <Typography component="h1" variant="h5">
                            Вход в систему
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Typography> Логин</Typography>
                            <Box className={classes.formElement}>
                                <GazpromTextField
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    error={textFieldError}
                                    value={login}
                                    onChange={(event) => setLogin(event.target.value)}
                                />
                            </Box>
                            <Box className={classes.formElement}>
                                <Typography> Пароль</Typography>
                                <GazpromTextField
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    type="password"
                                    error={textFieldError}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Box>
                            <Box className={classes.formElement}>
                                <GazpromButton
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={fieldsCheck}
                                    disabled={loading}
                                >
                                    Войти
                                </GazpromButton>
                                {loading && <CircularProgress size={28} className={classes.buttonProgress}/>}
                            </Box>
                        </form>
                    </Box>
                </CardContent>
            </Paper>
            <GazpromDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} errorText={errorText}/>
        </Container>
    );
}