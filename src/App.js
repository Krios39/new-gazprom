import React, {createContext, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import UserView from "./views/user/UserView";
import AdminView from "./views/admin/AdminView";
import Authorization from "./views/authorization/Authorization";

export const accessTokenContext = createContext(undefined)

function App() {
    const [accessToken, setAccessToken] = useState("")

    return (
        <accessTokenContext.Provider value={{accessToken, setAccessToken}}>
            <Switch>
                <Route exact path="/authorization" component={Authorization}/>
                <Route path="/user=:userId" component={UserView}/>
                <Route path="/admin=:adminId" component={AdminView}/>
                <Redirect to="/authorization"/>
            </Switch>
        </accessTokenContext.Provider>
    );
}

export default App;
