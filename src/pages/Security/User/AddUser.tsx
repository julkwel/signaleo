import React, { useState } from 'react';
import {
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonContent,
    IonCard,
    IonButton,
    IonAlert,
    IonTitle, IonCardTitle, IonCardContent, IonFabButton, IonIcon, IonFab
} from '@ionic/react';
import Header from '../../../components/Navigation/Header';
import Axios from 'axios';
import HTTP_BASE_URL from '../../../Constant/HttpConstant';
import { useHistory } from 'react-router';
import { arrowBack } from "ionicons/icons";

/**
 * User inscription
 *
 * @constructor
 */
const AddUser: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const history = useHistory();
    const [alert, setAlert] = useState({ isOpen: false, message: '' });

    const submit = () => {
        if (password === passwordConfirmation) {
            Axios.post(HTTP_BASE_URL + '/add/user/api', { name: name, email: email, password: password }).then((data) => {
                console.log(data);
                if ('success' === data.data.message) {
                    setAlert({
                        isOpen: true,
                        message: 'Voasoratra ny anaranao , ny login hidiranao dia : ' + email + ' !'
                    });

                    history.push('/login');
                } else {
                    setAlert({
                        isOpen: true,
                        message: 'Misy olana ny signaleo na efa nisy naka ny email : ' + email + ' !'
                    })
                }
            })
        } else {
            setAlert({
                isOpen: true,
                message: 'Tsy mifanaraka ny teny miafina sy ny fanamarinany voasoratra !'
            })
        }
    };

    const handleName = (e: any) => {
        return e.target.value;
    };

    const handleEmail = (e: any) => {
        return e.target.value;
    };

    const handlePassword = (e: any) => {
        return e.target.value;
    };

    const handlePasswordConfirmation = (e: any) => {
        return e.target.value;
    }

    // OnDidDismiss set alert state to close, if we not check this event, alert can't show many times.
    return (
        <IonPage>
            <IonContent>
                <Header />
                <IonAlert mode={"ios"} isOpen={alert.isOpen} message={alert.message}
                    onDidDismiss={() => setAlert({ isOpen: false, message: '' })} />
                <IonCard className="dark-orange">
                    <IonCardTitle>
                        <IonTitle color={"primary"} className={"text-center"}>Hisoratra Anarana</IonTitle>
                    </IonCardTitle>
                    <IonCardContent>
                        <form onSubmit={e => {
                            e.preventDefault();
                            submit()
                        }}>
                            <IonItem>
                                <IonLabel position="stacked">Anarana</IonLabel>
                                <IonInput required name="name" value={name}
                                    onIonChange={(e) => setName(handleName(e))} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Email</IonLabel>
                                <IonInput type={"email"} required name="email" value={email}
                                    onIonChange={(e) => setEmail(handleEmail(e))} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Teny miafina</IonLabel>
                                <IonInput type={"password"} required name="password" value={password}
                                    onIonChange={(e) => setPassword(handlePassword(e))} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Fanamarinana ny teny miafina</IonLabel>
                                <IonInput type={"password"} required name="password_confirmation" value={passwordConfirmation}
                                    onIonChange={(e) => setPasswordConfirmation(handlePasswordConfirmation(e))} />
                            </IonItem>
                            <IonButton color="primary" expand="block" type="submit">Hisoratra</IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>

                <IonFab
                    vertical="bottom"
                    onClick={() => {
                        history.push('/login');
                    }}
                    horizontal="end" slot="fixed">
                    <IonFabButton>
                        <IonIcon icon={arrowBack} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
};

export default AddUser;