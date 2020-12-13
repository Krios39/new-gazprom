import {Box, FormControl, Grid, InputBase, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";

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
        height: 50,
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

export default function RequestList({data, searchPanel, roles, applicationDate, status}) {
    const classes = useStyles()
    const [selectSortCategory, setSelectSortCategory] = useState(0)
    const [sortOrder, setSortOrder] = useState(10)
    const [cssClass, setCssClass] = useState("")
    const [requests, setRequests] = useState([])

    const [sortCategories, setSortCategories] = useState([])

    const [newRequest, setNewRequest] = useState([])

    useEffect(() => {
        let a = []
        requests.map((reques) => {
            const c = []
            c.push(reques.system)
            if (roles) c.push(reques.role)
            if (applicationDate) c.push(reques.date1)
            c.push(reques.applicationDate)
            if (status) c.push(reques.status)
            a.push(c)
        })
        setNewRequest(a)
    }, [requests])

    useEffect(() => {
        setRequests(data)
    }, [data])

    useEffect(() => {
        let a = []
        a.push("Информационная система")
        if (roles) a.push("Роли")
        if (applicationDate) a.push("Дата подачи")
        a.push("Дата выдачи")
        if (status) a.push("Статус")
        setSortCategories(a)
    }, [])


    useEffect(() => {
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
    }, [selectSortCategory,sortOrder])

    const sortCategoryHandleChange = (event) => {
        setSelectSortCategory(event.target.value)
    }

    const sortOrderHandleChange = (event) => {
        setSortOrder(event.target.value)
    }

    useEffect(() => {
        if (searchPanel) setCssClass(classes.requestBox)
    }, [classes.requestBox, searchPanel])

    return (
        <Box className={cssClass}>
            <Box className={classes.header}>
                <Typography className={classes.label}>
                    Список заявок сотрудника
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
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                >
                    {sortCategories.map((category, key) =>
                        <Grid key={key} item zeroMinWidth>
                            <Typography noWrap
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

                {newRequest.map((item, key) =>
                    <Grid key={key}
                          container
                          className={clsx(classes.tableCell, classes.borderCell)}
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                          spacing={2}
                    >
                        {item.map((item1, key1) =>
                            <Grid key={key1}
                                  item
                                  wrap="nowrap"
                                  zeroMinWidth
                            >
                                <Tooltip title={item1}>
                                    <Typography noWrap className={classes.date}>
                                        <Box
                                            component="div"
                                            textOverflow="ellipsis"
                                            overflow="hidden"
                                        >
                                            {item1}
                                        </Box>
                                    </Typography>
                                </Tooltip>
                            </Grid>
                        )}

                    </Grid>
                )}
            </Box>
        </Box>
    )
}