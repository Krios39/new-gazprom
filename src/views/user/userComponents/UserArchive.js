import Box from "@material-ui/core/Box";
import React from "react";
import RequestList from "../../../components/RequestList";
import UserInformationPanel from "./UserInformationPanel";
import {makeStyles} from "@material-ui/core/styles";
import GazpromSearchPanel from "../../../components/GazpromSearchPanel";

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

const useStyles = makeStyles(() => ({
    requestBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    }
}))

export default function UserArchive() {
    const classes = useStyles()
    return (
        <Box>
            <UserInformationPanel full={false}/>
            <Box mx={2} className={classes.requestBox}>
                <GazpromSearchPanel/>
                <RequestList data={data} searchPanel={true}  roles={true} applicationDate={true} status={true}/>
            </Box>
        </Box>
    )
}



