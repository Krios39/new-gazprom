import {Box, Grid, Typography} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tableCell: {
        backgroundColor: "#fff",
        minHeight: 50,
        margin: theme.spacing(1),
        maxWidth: 900,
        width: '97%',
        borderRadius: 6,
    },
    borderLabel: {
        border: "1px solid rgba(38, 38, 38, 0.4)",
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

export default function RequestListTableTitle({sortCategories, columns}) {
    const classes = useStyles()

    const getWidth = (key) => {
        if (key === 0) return classes.item1
        else if (key === columns - 1) return classes.item3
        else return classes.item2
    }

    return (
        <Grid container
              className={clsx(classes.tableCell, classes.borderLabel)}
              wrap="nowrap"
              direction="row"
              justify="space-around"
              alignItems="center"

        >
            {sortCategories.map((category, key) =>
                <Grid key={key}
                      wrap="nowrap"
                      item
                      container
                      justify="center"
                      className={getWidth(key)}
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
    )
}