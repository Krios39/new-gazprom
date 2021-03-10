import UserInformationPanel from "./UserInformationPanel";
import {Box} from "@material-ui/core";
import RequestList from "../../../components/RequestList";
import React, {useContext, useEffect, useState} from "react";
import {accessTokenContext} from "../../../App";
import axios from "axios"
import {REQUESTS, BASE_URL} from "../../../constants/Urls";
import {useHistory, useParams} from "react-router";

export default function UserInformation() {

    const {accessToken} = useContext(accessTokenContext)
    const params = useParams();

    const [data, setData] = useState([])

    const history = useHistory()

    useEffect(() => {
        axios.get(BASE_URL + REQUESTS, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            params: {
                userId: params.userId,
                filter:1,
                status:'STATUS_ENABLE'
            }
        })
            .then(resp => {
                setData(resp.data)

            })
            .catch(e => {
                if (e.response.status === 401) history.push('/authorization')
            })
    }, [])

    return (
        <Box>
            <UserInformationPanel full/>
            <RequestList title="Cписок активных заявок сотрудника" data={data} privileges expiryDate/>
        </Box>
    )

}