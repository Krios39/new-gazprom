import {Box} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import RequestList from "../../../components/RequestList";
import axios from "axios";
import {ADMIN_REQUESTS, BASE_URL, OWNER_REQUESTS} from "../../../constants/Urls";
import {accessTokenContext, roleContext} from "../../../App";
import {useHistory, useParams} from "react-router-dom";

export default function AdminInformation() {

    const {accessToken} = useContext(accessTokenContext)
    const {role} = useContext(roleContext)
    const params = useParams();
    const [data, setData] = useState([])
    const history = useHistory()

    const requestListTitle = role === "owner" ? "Список заявок владельца" : "Список заявок администратора"

    useEffect(() => {
        const getData = () => {
            const url = role === "owner" ? OWNER_REQUESTS : ADMIN_REQUESTS
            axios.get(BASE_URL + url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                params: {
                    userId: params.adminId
                }
            })
                .then(resp => {
                    setData(resp.data)
                })
                .catch(e => {
                    if (e.response.status === 401) history.push('/authorization')
                })
        }
        getData()
    }, [accessToken, history, params.adminId, role])


    return (
        <Box mx={2}>
            <RequestList title={requestListTitle} searchPanel fillingDate status data={data}
                         admin/>
        </Box>

    )

}