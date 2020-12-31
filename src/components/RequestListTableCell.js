import clsx from "clsx";
import {Box, Grid, Typography} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({

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
    item1: {
        minWidth: 270
    },
    item2: {
        minWidth: 160
    },
    item3: {
        minWidth: 80
    }
}))

export default function RequestListTableCell({cellItem, columns, admin}) {
    const classes = useStyles()

    const history = useHistory()

    const getWidth = (key) => {
        if (key === 0) return classes.item1
        else if (key === columns - 1) return classes.item3
        else return classes.item2
    }

    const onRequestClick = (requestId) => {
        if (admin) {
            history.push(`${requestId}`)
        }
    }

    return (
        <Grid
            container
            className={clsx(classes.tableCell, classes.borderCell)}
            direction="row"
            justify="space-around"
            alignItems="center"
            wrap="nowrap"

            onClick={() => onRequestClick(cellItem[0])}
        >
            {cellItem.map((item1, key) =>
                (key !== 0) &&
                <Grid key={key}
                      wrap="nowrap"
                      item
                      container justify="center"
                      className={getWidth(key - 1)}
                >
                    {(Array.isArray(item1)) ?
                        <Grid container direction="column" alignItems="center">
                            {item1.map((privilege, key2) =>
                                <Grid key={key2}
                                      item
                                >
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
    )
}