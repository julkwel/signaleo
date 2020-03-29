import React from 'react';
import {
    IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, withIonLifeCycle,
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import './assets/App.css';

/* Theme variables */
import './theme/variables.css';
import {Plugins} from "@capacitor/core";
import {SignaleoRoute} from "./components/Route/Route";
import {carSportOutline, list, peopleOutline, sunnyOutline} from "ionicons/icons";

const {Storage} = Plugins;

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.getUser().then();
        this.state = {
            user: null,
        };
    }

    async getUser() {
        const ret = await Storage.get({key: 'user'});
        const user = JSON.parse(ret && ret.value ? ret.value : '{"user":null}');

        if (user.id) {
            this.setState({
                user: user
            });
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonApp>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <SignaleoRoute/>
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="actualite" href="/actualite">
                                <IonIcon icon={list}/>
                            </IonTabButton>
                            <IonTabButton tab="demande" href="/demande">
                                <IonIcon icon={carSportOutline}/>
                            </IonTabButton>
                            <IonTabButton tab="offre" href="/offre">
                                <IonIcon icon={peopleOutline}/>
                            </IonTabButton>
                            <IonTabButton tab="phone" href="/phone">
                                <IonIcon icon={sunnyOutline}/>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        )
    }
}

export default withIonLifeCycle(App);
