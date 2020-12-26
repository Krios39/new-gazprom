import {Box, FormControl, InputBase, MenuItem, Select, Typography} from "@material-ui/core";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {makeStyles} from "@material-ui/core/styles";

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
}))

export default function RequestListSortPanel({title, sortCategories, selectSortCategory, setSelectSortCategory, sortOrder, setSortOrder}) {
    const classes = useStyles()

    return (
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
                        onChange={(event) => setSelectSortCategory(event.target.value)}
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
                        onChange={(event) => setSortOrder(event.target.value)}
                        input={<GazpromInput/>}
                    >
                        <MenuItem value={10}>Возрастанию</MenuItem>
                        <MenuItem value={20}>Убыванию</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}