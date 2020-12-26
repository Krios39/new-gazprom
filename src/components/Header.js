import React, {useEffect, useState} from "react";
import {Box, Button, ButtonBase, Container, Typography} from "@material-ui/core";
import Gazprom from "../static/Gazprom.png"
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {GazpromButton} from "./GazpromButton";
import {useHistory, useLocation} from "react-router-dom";
import {useRouteMatch} from "react-router";

export const TextButton = withStyles({
    root: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff'
        }
    }
})(Button)

const useStyles = makeStyles((theme) => ({
    main: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    buttonsBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    setText: {
        color: "#000",
        fontWeight: 500,
    },
    regularText: {
        color: "#888",
        fontWeight: 500,
    }
}))

export default function Header({titles, titleKey, setTitleKey}) {
    const classes = useStyles()

    const history = useHistory()

    const [title, setTitle] = useState([])

    let {url} = useRouteMatch();
    let location = useLocation();
    let match = useRouteMatch();

    useEffect(() => {
        titles.map((title, key) => (location.pathname.indexOf(title.url) + 1) && setTitleKey(key))
    }, [location, match, setTitleKey, titles])

    useEffect(() => {
        let a = []
        titles.map((item) => {
            a.push({
                item: item.title,
                url: item.url,
                className: classes.regularText
            })
            return a
        })
        a[0].className = classes.setText
        setTitle(a)
    }, [classes.regularText, classes.setText, titles])

    const urlChange = (key) => {
        history.push(url + titles[key].url)
    }

    const exit = () => {
        history.push("/authorization")
    }

    return (
        <Container className={classes.main}>
            <img src={Gazprom} height={87} width={185} alt={Gazprom}/>
            <Box className={classes.buttonsBox}>
                {title.map((item, key) =>
                    <Box mx={2} key={key}>
                        <ButtonBase
                            disableRipple={true}>
                            <Typography onClick={() => urlChange(key)}
                                        className={(key === titleKey) ? classes.setText : classes.regularText}>
                                {item.item}</Typography>
                        </ButtonBase>
                    </Box>
                )}
                <GazpromButton
                    variant="contained"
                    color="primary"
                    className="submit"
                    onClick={exit}>
                    Выход
                </GazpromButton>
            </Box>
        </Container>
    )
}

