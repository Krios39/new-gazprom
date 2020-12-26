import {Box} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import Request from "../views/admin/adminComponents/Request";
import GazpromFilterPanel from "./GazpromFilterPanel";
import RequestListSortPanel from "./RequestListSortPanel";
import RequestListTableTitle from "./RequestListTableTitle";
import RequestListTableCell from "./RequestListTableCell";

const useStyles = makeStyles((theme) => ({
    table: {
        paddingTop: theme.spacing(2),
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    requestFullWidth: {
        width: "100%"
    },
    requestBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    }
}))

export default function RequestList({title, data, searchPanel, privileges, expiryDate, status, admin}) {
    const classes = useStyles()
    const [selectSortCategory, setSelectSortCategory] = useState(0)
    const [sortOrder, setSortOrder] = useState(10)
    const [requests, setRequests] = useState([])

    const [sortCategories, setSortCategories] = useState([])

    const [newRequest, setNewRequest] = useState([])

    const [requestOpen, setRequestOpen] = useState(false)

    const [columnWidths, setColumnWidths] = useState([])

    const {requestId} = useParams()

    useEffect(() => {
        const adminCheck = () => {
            if (admin) if (requestId !== "-1") setRequestOpen(true)
            else setRequestOpen(false)
        }
        adminCheck()
    }, [admin, requestId])

    useEffect(() => {
        let a = []
        const makeNewRequest = () => {
            requests.map((request) => {
                const c = []
                c.push(request.idRequest)
                c.push(request.system)
                if (privileges) c.push(request.privileges)
                if (expiryDate) if (request.expiryDate) c.push(dateToString(request.fillingDate))
                else c.push(dateToString("Бессрочно"))
                c.push(dateToString(request.expiryDate))
                if (status) c.push(getStatus(request.status))
                a.push(c)
                return a
            })
        }
        makeNewRequest()
        setNewRequest(a)
    }, [expiryDate, privileges, requests, status])

    useEffect(() => {
        setRequests(data)
    }, [data])

    useEffect(() => {
        let a = []
        let b = []
        const makeTableTitle = () => {
            a.push("Информационная система")
            if (privileges) a.push("Привелегии")
            a.push("Дата подачи")
            if (expiryDate) a.push("Дата выдачи")
            if (status) a.push("Статус")
            if (a.length === 3) b = [{xs: 6}, {xs: 'auto'}, {xs: 'auto'}]
            if (a.length === 4) b = [{xs: 5}, {xs: 'auto'}, {xs: 'auto'}, {xs: 'auto'}]
            if (a.length === 5) b = [{xs: 4}, {xs: 'auto'}, {xs: 'auto'}, {xs: 'auto'}, {xs: 'auto'}]
        }
        makeTableTitle()
        setColumnWidths(b)
        setSortCategories(a)
    }, [expiryDate, privileges, status])


    useEffect(() => {
        const tableSort = () => {
            const arr = [...newRequest]
            const categoryName = sortCategories[selectSortCategory]

            if (categoryName === "Дата выдачи" || categoryName === "Дата подачи") arr.sort((a, b) => {
                    const parts1 = a[selectSortCategory].split('.');
                    const parts2 = b[selectSortCategory].split('.');
                    const date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
                    const date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
                    return date1 > date2 ? 1 : -1
                }
            )
            else arr.sort((a, b) => a[selectSortCategory] > b[selectSortCategory] ? 1 : -1)
            if (arr.length !== 0) sortOrder === 10 ? setNewRequest(arr) : setNewRequest(arr.reverse())
        }
        tableSort()
    }, [selectSortCategory, sortOrder])

    const dateToString = date => {
        if (date.year === 1) return "-"
        const day = date.day
        const month = date.month + 1
        const year = date.year + 1900
        return `${day}.${month}.${year}`
    }

    const getStatus = status => {
        let a = ""
        switch (status) {
            case "STATUS_SHIPPED":
                a = "Отправлена"
                break
            case "STATUS_ENABLE":
                a = "Активна"
                break
            case "STATUS_DISABLED":
                a = "Неактивна"
                break
            case "STATUS_REFUSED":
                a = "Отменена"
                break
            default:
                a = status
                break
        }
        return a
    }

    return (
        <Box mx={2} className={classes.requestBox}>
            {searchPanel && <GazpromFilterPanel admin={admin}/>}
            <Box className={classes.requestFullWidth}>
                <RequestListSortPanel
                    title={title}
                    selectSortCategory={selectSortCategory}
                    setSelectSortCategory={setSelectSortCategory}
                    setSortOrder={setSortOrder}
                    sortCategories={sortCategories}
                    sortOrder={sortOrder}/>
                <Box className={classes.table}>
                    <RequestListTableTitle sortCategories={sortCategories} columnWidths={columnWidths}/>
                    {newRequest.map((cellItem, key) =>
                        <RequestListTableCell key={key} columnWidths={columnWidths} cellItem={cellItem} admin={admin}/>
                    )}
                </Box>
            </Box>
            <Request open={requestOpen}/>
        </Box>
    )
}
