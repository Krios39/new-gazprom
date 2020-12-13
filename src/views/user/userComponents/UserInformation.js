import UserInformationPanel from "./UserInformationPanel";
import {Box} from "@material-ui/core";
import RequestList from "../../../components/RequestList";
import React, {useContext, useEffect} from "react";
import {accessTokenContext} from "../../../App";
import axios from "axios"
import {ACTIVE_REQUESTS, BASE_URL} from "../../../constants/Urls";
import {useParams} from "react-router";

const data = [
    {
        system: "Информационная система 1aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa",
        date1: "18.11.2020",
        applicationDate: "18.11.2020",
        role:"Роль 1",
        status:"Активна"
    },
    {
        system: "Информационная система 2",
        date1: "18.11.2020",
        applicationDate: "17.09.2020",
        role:"Роль 1",
        status:"Активна"
    },
    {
        system: "Информационная система 3",
        date1: "18.11.2020",
        applicationDate: "19.11.2020",
        role:"Роль 2",
        status:"Активна"
    },
    {
        system: "Информационная система 4",
        date1: "18.11.2020",
        applicationDate: "16.11.2020",
        role:"Роль 1",
        status:"Активна"
    },
    {
        system: "Информационная система 5",
        date1: "18.11.2020",
        applicationDate: "12.11.2020",
        role:"Роль 2",
        status:"Активна"
    },
    {
        system: "Информационная система 6",
        date1: "18.11.2020",
        applicationDate: "11.02.2020",
        role:"Роль 1",
        status:"Активна"
    },
    {
        system: "Информационная система 7",
        date1: "18.11.2020",
        applicationDate: "18.11.2020",
        role:"Роль 2",
        status:"Активна"
    },
    {
        system: "Информационная система 8",
        date1: "18.11.2020",
        applicationDate: "24.12.2020",
        role:"Роль 2",
        status:"Активна"
    },
    {
        system: "Информационная система 9",
        date1: "18.11.2020",
        applicationDate: "15.11.2020",
        role:"Роль 1",
        status:"Активна"
    },
    {
        system: "Информационная система 10",
        date1: "18.11.2020",
        applicationDate: "18.10.2020",
        role:"Роль 2",
        status:"Активна"
    },
    {
        system: "Информационная система 11",
        date1: "18.11.2020",
        applicationDate: "18.05.2021",
        role:"Роль 1",
        status:"Активна"
    },
    {
        system: "Информационная система 12",
        date1: "18.11.2020",
        applicationDate: "18.07.2018",
        role:"Роль 2",
        status:"Активна"
    },
    {
        system: "Информационная система 13",
        date1: "18.11.2020",
        applicationDate: "18.11.2020",
        role:"Роль 2",
        status:"Активна"
    },
]

export default function UserInformation() {

    const {accessToken} = useContext(accessTokenContext)
    const params = useParams();
    useEffect(()=>{
        axios.get(BASE_URL+ACTIVE_REQUESTS,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            params: {
                id: params.userId
            }})
            .then(resp =>{
                console.log(resp)
            })
    },[])

    return (
        <Box>
            <UserInformationPanel full={true}/>
            <Box mx={2}>
                <RequestList data={data} roles={true}/>
            </Box>
        </Box>
    )

}