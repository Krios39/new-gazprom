import {Box, FormControl, Grid, InputBase, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import {useHistory, useParams} from "react-router-dom";
import Request from "../views/admin/adminComponents/Request";


const GazpromInput = withStyles((theme) => ({
    root: {
        color: "#888",
        width: theme.spacing(22),
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        border: '1px solid #D9D9D9',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#2D9CDB',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    header: {
        margin: "17px 0px 17px 0px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 42
    },
    sortBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    margin: {
        margin: theme.spacing(1),
    },
    label: {
        fontSize: 24,
        fontWeight: 600,
    },
    table: {
        paddingTop: theme.spacing(2),
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    tableCell: {
        backgroundColor: "#fff",
        minHeight: 50,
        margin: theme.spacing(1),
        maxWidth: 900,
        width: '97%',
        borderRadius: 6,
    },
    borderCell: {
        border: "1px solid #d9d9d9",
    },
    borderLabel: {
        border: "1px solid rgba(38, 38, 38, 0.4)",
    },
    system: {
        margin: theme.spacing(3),
        fontSize: 18,
        width: "50%"
    },
    date: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        display: "flex",
        flexDirection: "row",
        maxWidth: 220,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    listLabel: {
        color: "#0079C2",
        fontWeight: 600,
    },
    requestBox: {
        width: "100%"
    },

}))

export default function RequestList({title, data, searchPanel, privileges, expiryDate, status, admin}) {
    const classes = useStyles()
    const [selectSortCategory, setSelectSortCategory] = useState(0)
    const [sortOrder, setSortOrder] = useState(10)
    const [cssClass, setCssClass] = useState("")
    const [requests, setRequests] = useState([])

    const [sortCategories, setSortCategories] = useState([])

    const [newRequest, setNewRequest] = useState([])

    const [requestOpen, setRequestOpen] = useState(false)

    const [columnWidths, setColumnWidths] = useState([])

    const {requestId} = useParams()

    const history = useHistory()

    useEffect(() => {
        const adminCheck = () => {
            if (admin) if (requestId !== "-1") setRequestOpen(true)
            else setRequestOpen(false)
        }
        adminCheck()
    }, [admin, requestId])

    useEffect(() => {
        if (searchPanel) setCssClass(classes.requestBox)
    }, [classes.requestBox, searchPanel])

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
    }, [])

    const sortCategoryHandleChange = (event) => {
        setSelectSortCategory(event.target.value)
    }

    const sortOrderHandleChange = (event) => {
        setSortOrder(event.target.value)
    }

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

    const onRequestClick = (requestId) => {
        if (admin) {
            history.push(`${requestId}`)
        }
    }

    return (
        <Box className={cssClass}>
            <Box className={classes.header}>
                <Typography className={classes.label}>
                    {title}
                </Typography>
                <Box className={classes.sortBox}>
                    <Typography>
                        Сортировать по:
                    </Typography>
                    <FormControl className={classes.margin}>
                        <Select
                            value={selectSortCategory}
                            onChange={sortCategoryHandleChange}
                            input={<GazpromInput/>}
                        >
                            {sortCategories.map((category, key) =>
                                <MenuItem key={key} value={key}>{category}</MenuItem>
                            )
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <Select
                            value={sortOrder}
                            onChange={sortOrderHandleChange}
                            input={<GazpromInput/>}
                        >
                            <MenuItem value={10}>Возрастанию</MenuItem>
                            <MenuItem value={20}>Убыванию</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box className={classes.table}>
                <Grid container
                      className={clsx(classes.tableCell, classes.borderLabel)}
                      wrap="nowrap"
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                      spacing={2}
                >
                    {sortCategories.map((category, key) =>
                        <Grid key={key}
                              wrap="nowrap"
                              item
                              xs={columnWidths[key].xs}
                              container
                              justify="center"
                        >
                            <Typography
                                component={'span'}
                                noWrap
                                className={clsx(classes.date, classes.listLabel)}>
                                <Box
                                    component="div"
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                >
                                    {category}
                                </Box>
                            </Typography>
                        </Grid>
                    )
                    }
                </Grid>

                {newRequest.map((cellItem, key) =>
                    <Grid key={key}
                          container
                          className={clsx(classes.tableCell, classes.borderCell)}
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                          wrap="nowrap"
                          spacing={2}
                          onClick={() => onRequestClick(cellItem[0])}
                    >
                        {cellItem.map((item1, key1) =>
                            (key1 !== 0) &&
                            <Grid key={key1}
                                  wrap="nowrap"
                                  item
                                  xs={columnWidths[key1 - 1].xs}
                                  container justify="center"
                            >
                                {(Array.isArray(item1)) ?
                                    <Grid container direction="column" alignItems="center">
                                        {item1.map((privilege, key2) =>
                                            <Grid key={key2}
                                                  item
                                                  xs
                                                  zeroMinWidth>
                                                <Tooltip key={key2} title={privilege.title}>
                                                    <Typography component={'span'} noWrap className={classes.date}>
                                                        <Box
                                                            component="div"
                                                            textOverflow="ellipsis"
                                                            overflow="hidden"
                                                        >
                                                            {privilege.title}
                                                        </Box>
                                                    </Typography>
                                                </Tooltip>
                                            </Grid>
                                        )}
                                    </Grid>
                                    :
                                    <Tooltip title={item1}>
                                        <Typography component={'span'} noWrap className={classes.date}>
                                            <Box
                                                component="div"
                                                textOverflow="ellipsis"
                                                overflow="hidden"
                                            >
                                                {item1}
                                            </Box>
                                        </Typography>
                                    </Tooltip>}
                            </Grid>
                        )}
                    </Grid>
                )}
            </Box>

            <Request open={requestOpen} onClose={() => onRequestClick(-1)}/>
        </Box>
    )
}
