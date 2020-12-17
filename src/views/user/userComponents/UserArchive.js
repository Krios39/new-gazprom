import Box from "@material-ui/core/Box";
import React, {useContext, useEffect, useState} from "react";
import RequestList from "../../../components/RequestList";
import UserInformationPanel from "./UserInformationPanel";
import {makeStyles} from "@material-ui/core/styles";
import GazpromSearchPanel from "../../../components/GazpromSearchPanel";
import axios from "axios"
import {ALL_USERS_REQUESTS, BASE_URL} from "../../../constants/Urls";
import {accessTokenContext} from "../../../App";
import {useHistory, useParams} from "react-router";

const useStyles = makeStyles(() => ({
    requestBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    }
}))

export default function UserArchive() {
    const classes = useStyles()

    const {accessToken} = useContext(accessTokenContext)
    const {userId} = useParams()
    const history = useHistory()
    const [data,setData] = useState([])


    useEffect(() => {
        axios.get(BASE_URL +ALL_USERS_REQUESTS, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                userId: userId
            }
        })
            .then((resp) => {
                setData(resp.data)

            })
            .catch(e => {
                if (e.response.status === 401) history.push('/authorization')

            })
    }, [])

    return (
        <Box>
            <UserInformationPanel full={false}/>
            <Box mx={2} className={classes.requestBox}>
                <GazpromSearchPanel/>
                <RequestList data={data} searchPanel={true} privileges={true} fillingDate={true} status={true}/>
            </Box>
        </Box>
    )
}



