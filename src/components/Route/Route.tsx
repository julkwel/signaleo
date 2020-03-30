import React from "react";
import {Route} from "react-router-dom";
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
import Profile from "../../pages/Security/User/Profile";
import StationService from "../../pages/VieQuotidien/StationService";
import PhoneUtils from "../../pages/VieQuotidien/PhoneUtils";
import CoronaVirus from "../../pages/Actualite/CoronaVirus";

export const SignaleoRoute: React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route path="/profile" component={Profile} exact={true}/>
            <Route path="/apropos" component={About} exact={true}/>
            <Route path="/offre" component={Offre} exact={true}/>
            <Route path="/addOffre" component={AddProposition} exact={true}/>
            <Route path="/actualite" component={Actualite}/>
            <Route path="/addActu" component={AddActualite}/>
            <Route path="/demande" component={Demande} exact={true}/>
            <Route path="/addDemande" component={AddDemande}/>
            <Route path="/login" component={Login}/>
            <Route path="/inscription" component={AddUser}/>
            <Route path="/station" component={StationService}/>
            <Route path="/virus" component={CoronaVirus}/>
            <Route path="/phone" component={PhoneUtils}/>
            <Route path="/" component={Actualite} exact={true}/>
        </IonRouterOutlet>
    )
}
