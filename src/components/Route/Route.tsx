import React from "react";
import {Redirect, Route} from "react-router-dom";
import ZaMbaEnto from "../../pages/Offre/Offre";
import AddProposition from "../../pages/Demande/ManageProposition/AddProposition";
import Demande from "../../pages/Demande/Demande";
import Actualite from "../../pages/Actualite/Actualite";
import AddActualite from "../../pages/Actualite/ManageActualite/AddActualite";
import AddOffre from "../../pages/Offre/ManageOffre/AddOffre";
import CameraServices from "../../Services/CameraServices";
import Login from "../../pages/Security/Login";
import AddUser from "../../pages/Security/User/AddUser";
import {IonRouterOutlet} from "@ionic/react";

export const SignaleoRoute : React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route path="/offre" component={ZaMbaEnto} exact={true}/>
            <Route path="/demande" component={AddProposition} exact={true}/>
            <Route path="/listDemande" component={Demande} exact={true}/>
            <Route path="/actualite" component={Actualite}/>
            <Route path="/addActu" component={AddActualite}/>
            <Route path="/offreAdd" component={AddOffre}/>
            <Route path="/takePhoto" component={CameraServices}/>
            <Route path="/login" component={Login}/>
            <Route path="/inscription" component={AddUser}/>
            <Route path="/" render={() => <Redirect to="/actualite"/>} exact={true}/>
        </IonRouterOutlet>
    )
}