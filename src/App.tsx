import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {list, personAddSharp} from 'ionicons/icons';
import Actualite from './pages/Actualite/Actualite';
import AddActualite from './pages/Actualite/ManageActualite/AddActualite';
import CameraServices from './Services/CameraServices'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddOffre from './pages/Offre/ManageOffre/AddOffre';
import ZaMbaEnto from "./pages/Offre/Offre";
import Login from "./pages/Security/Login";
import AddUser from "./pages/Security/User/AddUser";
import AddProposition from "./pages/Demande/ManageProposition/AddProposition";
import Demande from "./pages/Demande/Demande";

export default class App extends React.Component<any, any> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonApp>
                <IonReactRouter>
                    <IonTabs>
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

                        <IonTabBar slot="bottom">
                            <IonTabButton tab="actualite" href="/actualite">
                                <IonIcon icon={list}/>
                                <IonLabel>Actualite</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="offre" href="/offre">
                                <IonIcon icon={personAddSharp}/>
                                <IonLabel>ZaMbaEnto</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="listDemande" href="/listDemande">
                                <IonIcon icon={list}/>
                                <IonLabel>Co-Voiturage</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        )
    }
}
