import React, {useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonActionSheet,
    IonIcon,
    IonButtons,
    IonMenuButton, useIonViewWillEnter
} from '@ionic/react';
import {car} from 'ionicons/icons';
import './Header.css';
import {useHistory} from 'react-router';
import {Plugins} from "@capacitor/core";

const Header: React.FC = () => {
    const [alert, setAlert] = useState(false);
    const [user, setUser] = useState(false);
    const history = useHistory();
    const {Storage} = Plugins;

    async function getUser() {
        const ret = await Storage.get({key: 'user'});
        const user = JSON.parse(ret && ret.value ? ret.value : '{"user":null}');

        if (user.id) {
            setUser(true);
        }
    }

    useIonViewWillEnter(() => {
        getUser().then();
    });

    return (
        <IonHeader>
            <IonToolbar color="tertiary">
                {
                    user ? (
                        <IonButtons slot="start">
                            <IonButton onClick={() => history.push('/')}>
                                <IonIcon icon={car}/>
                            </IonButton>
                        </IonButtons>
                    ) : ''
                }
                <IonTitle className="text-center">SIGNALEO</IonTitle>
                {
                    user ? (
                        <IonButtons slot="end" onClick={() => setAlert(true)}>
                            <IonMenuButton auto-hide="false"/>
                        </IonButtons>
                    ) : ''
                }
            </IonToolbar>

            {
                user ? (
                    <IonActionSheet
                        isOpen={alert}
                        onDidDismiss={() => setAlert(false)}
                        mode={"ios"}
                        buttons={[
                            {
                                text: 'Logout',
                                handler: () => {
                                    Storage.remove({key: 'user'}).then(() => {
                                        history.push('/login');
                                    });

                                    window.location.reload();
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
                ) : ''
            }
        </IonHeader>
    )
}

export default Header;