import React, {useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonActionSheet,
    IonIcon,
    IonButtons,
    IonMenuButton
} from '@ionic/react';
import {car} from 'ionicons/icons';
import './Header.css';
import {useHistory} from 'react-router';
import {Plugins} from "@capacitor/core";

const Header: React.FC = () => {
    const [alert, setAlert] = useState(false);
    const history = useHistory();
    const {Storage} = Plugins;

    function onLogout() {
        Storage.remove({key: 'user'}).then(() => {
            history.push('/login');
        });
    };

    const onBack = () => {
        history.push('/');
    };

    return (
        <IonHeader>
            <IonToolbar color="tertiary">
                <IonButtons slot="start">
                    <IonButton onClick={onBack}>
                        <IonIcon icon={car}/>
                    </IonButton>
                </IonButtons>
                <IonTitle className="text-center">SIGNALEO</IonTitle>
                <IonButtons slot="end" onClick={() => setAlert(true)}>
                    <IonMenuButton auto-hide="false"/>
                </IonButtons>
            </IonToolbar>

            <IonActionSheet
                isOpen={alert}
                onDidDismiss={() => setAlert(false)}
                mode={"ios"}
                buttons={[
                    {
                        text: 'Logout',
                        handler: () => {
                            onLogout();
                        }
                    }, {
                        text: 'A propos',
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