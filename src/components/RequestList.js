import {Box} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import Request from "../views/admin/adminComponents/Request";
import GazpromFilterPanel from "./GazpromFilterPanel";
import RequestListSortPanel from "./RequestListSortPanel";
import RequestListTableTitle from "./RequestListTableTitle";
import RequestListTableCell from "./RequestListTableCell";
import {format,getSeconds} from 'date-fns'

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

    const [columns, setColumns] = useState(0)

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
                c.push(request.id)
                c.push(request.informationSystem.title)
                if (privileges) c.push(request.informationSystem.privileges)
                c.push(request.filingDate)
                if (expiryDate) if (request.expiryDate) c.push(request.expiryDate)
                else c.push("NaN")
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

        const makeTableTitle = () => {
            a.push("Информационная система")
            if (privileges) a.push("Привелегии")
            a.push("Дата подачи")
            if (expiryDate) a.push("Дата выдачи")
            if (status) a.push("Статус")
        }
        makeTableTitle()
        setColumns(a.length)
        setSortCategories(a)
    }, [expiryDate, privileges, status])


    useEffect(()=>{
        setNewRequest([...newRequest].reverse())
    },[sortOrder])

    useEffect(() => {
        const tableSort = () => {
            const arr = [...newRequest]
            const categoryName = sortCategories[selectSortCategory]
            if (categoryName === "Дата выдачи" || categoryName === "Дата подачи") arr.sort((a, b) => {
                    return getSeconds( stringToDate(a[selectSortCategory+1])) - getSeconds( stringToDate(b[selectSortCategory+1]))
                }
            )
            else arr.sort((a, b) => a[selectSortCategory] > b[selectSortCategory] ? 1 : -1)
        }
        tableSort()
    }, [selectSortCategory, sortOrder])


    const stringToDate=string=>{
        return new Date(string.slice(6),Number(string.slice(3,5))-1,string.slice(0,2))
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
            {searchPanel && <GazpromFilterPanel  admin={admin}/>}
            <Box className={classes.requestFullWidth}>
                <RequestListSortPanel
                    title={title}
                    selectSortCategory={selectSortCategory}
                    setSelectSortCategory={setSelectSortCategory}
                    setSortOrder={setSortOrder}
                    sortCategories={sortCategories}
                    sortOrder={sortOrder}/>
                <Box className={classes.table}>
                    <RequestListTableTitle sortCategories={sortCategories} columns={columns}/>
                    {newRequest.map((cellItem, key) =>
                        <RequestListTableCell key={key}  columns={columns} cellItem={cellItem} admin={admin}/>
                    )}
                </Box>
            </Box>
            <Request open={requestOpen}/>
        </Box>
    )
}
