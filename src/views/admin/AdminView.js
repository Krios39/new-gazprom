import Box from "@material-ui/core/Box";
import React, {useState} from "react";
import {useRouteMatch} from "react-router";
import {Container} from "@material-ui/core";
import Header from "../../components/Header";
import {Route, Switch} from "react-router-dom";
import AdminInformation from "./adminComponents/AdminInformation";
import WorkerRegistration from "./adminComponents/WorkerRegistration";


const titles = [
    {
        title: "Список заявок",
        url: "/info/-1"
    },
    {
        title: "Регистрация сотрудника",
        url: "/create"
    },
   ]

export default function AdminView(){

    const [titleKey, setTitleKey] = useState(0)
    const {path} = useRouteMatch()

    return (
        <Container>
            <Box>
                <Header titles={titles} titleKey={titleKey} setTitleKey={setTitleKey}/>
                <Switch>
                    <Route exact path={`${path}/info/:requestId`} component={AdminInformation}/>
                    <Route path={`${path}/create`} component={WorkerRegistration}/>
                </Switch>
            </Box>
        </Container>
    )
}