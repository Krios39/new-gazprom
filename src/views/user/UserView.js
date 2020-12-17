import React, {useState} from "react";
import Header from "../../components/Header";
import {Box, Container} from "@material-ui/core";
import CreateRequest from "./userComponents/CreateRequest";
import { useRouteMatch} from "react-router";
import UserArchive from "./userComponents/UserArchive";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import UserInformation from "./userComponents/UserInformation";


const titles = [
    {
        title: "Информация о сотруднике",
        url: "/info"
    },
    {
        title: "Создать заявку",
        url: "/create"
    },
    {
        title: "Архив заявок",
        url: "/archive"
    }]

export default function UserView() {

    const [titleKey, setTitleKey] = useState(0)
    const {path} = useRouteMatch()

    return (
        <Container>
            <Box>
                <Header titles={titles} titleKey={titleKey} setTitleKey={setTitleKey}/>
                <Switch>
                    <Route exact path={`${path}/info`}>
                        <UserInformation/>
                    </Route>
                    <Route path={`${path}/create`}>
                        <CreateRequest/>
                    </Route>
                    <Route path={`${path}/archive`}>
                        <UserArchive/>
                    </Route>
                </Switch>
            </Box>
        </Container>
    )
}