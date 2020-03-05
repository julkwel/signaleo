import React from "react";
import {Redirect, Route} from "react-router-dom";
import AddProposition from "../../pages/Offre/ManageProposition/AddProposition";
import Demande from "../../pages/Demande/Demande";
import Actualite from "../../pages/Actualite/Actualite";
import AddActualite from "../../pages/Actualite/ManageActualite/AddActualite";
import Login from "../../pages/Security/Login";
import AddUser from "../../pages/Security/User/AddUser";
import {IonRouterOutlet} from "@ionic/react";
import AddDemande from "../../pages/Demande/ManageDemande/AddDemande";
import Offre from "../../pages/Offre/Offre";
import {About} from "../../pages/Signaleo/About";

export const SignaleoRoute : React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route path="/apropos" component={About} exact={true}/>
            <Route path="/offre" component={Offre} exact={true}/>
            <Route path="/addOffre" component={AddProposition} exact={true}/>
            <Route path="/actualite" component={Actualite}/>
            <Route path="/addActu" component={AddActualite}/>
            <Route path="/demande" component={Demande} exact={true}/>
            <Route path="/addDemande" component={AddDemande}/>
            <Route path="/login" component={Login}/>
            <Route path="/inscription" component={AddUser}/>
            <Route path="/" render={() => <Redirect to="/actualite"/>} exact={true}/>
        </IonRouterOutlet>
    )
}