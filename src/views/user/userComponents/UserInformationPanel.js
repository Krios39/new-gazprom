import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router";
import {BASE_URL, USER_INFORMATION} from "../../../constants/Urls";
import axios from "axios"
import {accessTokenContext} from "../../../App";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    main: {
        paddingBottom: 20,
        marginTop: 30,
        borderRadius: 16,
        background: "#e2f1f8",
    },
    mainText: {
        fontSize: 38,
        marginLeft: 30,
        paddingTop: 20,
        weight: 500
    },
    text: {
        color: "#888",
        fontSize: 20,
        marginLeft: 30,
    }
}))


export default function UserInformationPanel({full}) {
    const classes = useStyles()

    const history = useHistory()

    const [userInfo, setUserInfo] = useState({})

    const {accessToken} = useContext(accessTokenContext)
    const params = useParams();

    useEffect(() => {
        const request = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            params: {
                userId: params.userId
            }
        }
        axios.get(BASE_URL + USER_INFORMATION, request)
            .then(response => {
                setUserInfo(response.data)
            })
            .catch(e => {
                if (e.response.status === 401) history.push('/authorization')
            })
    }, [accessToken, params.userId])

    return (
        <Box mx={2} className={classes.main}>
            <Typography className={classes.mainText}>{clsx([userInfo.lastName,userInfo.name,userInfo.middleName])}</Typography>
            {full &&
            <Box>
                {/*<Typography className={classes.text}>Должность: ФФФФФ</Typography>*/}
                <Typography className={classes.text}>Подразделение: {userInfo.department}</Typography>
                <Typography className={classes.text}>Почта: {userInfo.email}</Typography>
            </Box>
            }

        </Box>
    )
}