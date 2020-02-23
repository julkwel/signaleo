import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { settings,list } from 'ionicons/icons';
import Offre from './pages/Offre/Offre';
import Demande from './pages/Demande/Demande';
import Actualite from './pages/Actualite/Actualite';
import AddActualite from './pages/Actualite/ManageActualite/AddActualite';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/offre" component={Offre} exact={true} />
          <Route path="/demande" component={Demande} exact={true} />
          <Route path="/actualite" component={Actualite} />
          <Route path="/add" component={AddActualite} />
          <Route path="/" render={() => <Redirect to="/actualite" />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="actualite" href="/actualite">
            <IonIcon icon={list} />
            <IonLabel>Actualite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="offre" href="/offre">
            <IonIcon icon={settings} />
            <IonLabel>Offre</IonLabel>
          </IonTabButton>
          <IonTabButton tab="demande" href="/demande">
            <IonIcon icon={list} />
            <IonLabel>Demande</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
