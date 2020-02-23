import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonActionSheet, IonIcon, IonButtons, IonMenuButton } from '@ionic/react';
import { car } from 'ionicons/icons';
import './Header.css';
import { useHistory } from 'react-router';

const Header: React.FC = () => {
  const [alert, setAlert] = useState(false);
  const history = useHistory();

  const onBack = () => {
    history.push('/');
  }

  return (
    <IonHeader>
      <IonToolbar color="tertiary">
        <IonButtons slot="start">
          <IonButton onClick={onBack}>
            <IonIcon icon={car}></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle className="text-center">EMBOUTAKA</IonTitle>
        <IonButtons slot="end" onClick={() => setAlert(true)}>
          <IonMenuButton auto-hide="false"></IonMenuButton>
        </IonButtons>
      </IonToolbar>

      <IonActionSheet
        isOpen={alert}
        onDidDismiss={() => setAlert(false)}
        buttons={[
          {
            text: 'Share',
            icon: 'share',
            handler: () => {
              console.log('Share clicked');
            }
          }, {
            text: 'A propos',
            icon: 'heart',
            handler: () => {
              console.log('Favorite clicked');
            }
          }
        ]}
      >
      </IonActionSheet>
    </IonHeader>
  )
}

export default Header;