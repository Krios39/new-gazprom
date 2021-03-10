import Box from "@material-ui/core/Box";
import React, {useContext, useEffect, useState} from "react";
import RequestList from "../../../components/RequestList";
import UserInformationPanel from "./UserInformationPanel";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios"
import {ALL_USERS_REQUESTS, BASE_URL, REQUESTS} from "../../../constants/Urls";
import {accessTokenContext} from "../../../App";
import {useHistory, useParams} from "react-router";

export default function UserArchive() {

    const {accessToken} = useContext(accessTokenContext)
    const {userId} = useParams()
    const history = useHistory()
    const [data, setData] = useState([])


    useEffect(() => {
        axios.get(BASE_URL + REQUESTS, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                userId: userId,
                filter:0
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
            <RequestList title="Список заявок сотрудника" data={data} searchPanel privileges expiryDate status/>
        </Box>
    )
}



