import React, {useState} from 'react';
import {
    IonPage,
    IonContent,
    IonCard,
    IonInput,
    IonSelect,
    IonItem,
    IonSelectOption,
    IonButton,
    IonLabel,
    IonAlert,
    IonTextarea, IonCardContent, useIonViewWillEnter, IonCardTitle, IonFabButton, IonIcon, IonFab
} from '@ionic/react';
import axios from 'axios'
import {useHistory} from 'react-router';
import Header from '../../../components/Navigation/Header';
import HTTP_BASE_URL from '../../../Constant/HttpConstant'
import {Plugins} from "@capacitor/core";
import {camera} from "ionicons/icons";
import {usePhotoGallery} from '../../../hooks/CameraServices';

/**
 * Add Actualite
 *
 * @constructor
 */
const AddActualite: React.FC = () => {
    const [lieu, setLieu] = useState('');
    const [cause, setCause] = useState('');
    const [message, setMessage] = useState('');
    const [photo, setPhoto] = useState('');
    const history = useHistory();
    const [user, setUser] = useState('');
    const {Storage} = Plugins;
    const {photos, takePhoto} = usePhotoGallery();

    const [alert, setAlert] = useState({
        isShow: false,
        message: ''
    });


    useIonViewWillEnter(() => {
        Storage.get({key: 'user'}).then((res) => {
            let user = JSON.parse(res.value ? res.value : '{"user":null}');
            if (user.id) {
                setUser(user.id);
            } else {
                history.push('/login');
            }
        });
    });

    const submit = async () => {
        var data = new FormData();
        data.append('image', photo);
        data.append('lieu', lieu);
        data.append('cause', cause);
        data.append('message', message);
        data.append('userId', user);

        axios.post(HTTP_BASE_URL + '/api/actualite/manage', data).then(res => {
            setAlert({
                isShow: true,
                message: 'Misaotra nizara !!!'
            });
            if (res.status === 200) {
                history.push('/actualite');
            }
        }).catch(reject => {
            setAlert({
                isShow: true,
                message: 'Une erreur c\'est produite'
            });
        });
    };

    const handleLocale = (e: any) => {
        return e.target.value;
    };

    const handleType = (e: any) => {
        return e.target.value;
    };

    const handleMessage = (e: any) => {
        return e.target.value;
    };

    const handlePhoto = (e: any) => {
        return e.target.files ? e.target.files[0] : '';
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header/>
                <IonAlert isOpen={alert.isShow} message={alert.message}/>
                <IonCard mode={"ios"}>
                    <IonCardTitle>
                        <h2 className={"text-center  title-text"}>Signaleo izay hitanao</h2>
                    </IonCardTitle>
                    <IonCardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                        }}>
                            <IonAlert isOpen={false} message=""/>
                            <IonItem>
                                <IonLabel position="stacked">Olana</IonLabel>
                                <IonSelect mode={"ios"} name="type" value={cause}
                                           onIonChange={(e) => setCause(handleType(e))}>
                                    <IonSelectOption value="Accident">Accident</IonSelectOption>
                                    <IonSelectOption value="FiaraMaty">Fiara Maty</IonSelectOption>
                                    <IonSelectOption value="Embouteillage">Embouteillage be</IonSelectOption>
                                    <IonSelectOption value="Malalaka">Malalaka ny lalana</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Toerana</IonLabel>
                                <IonInput name="lieu" value={lieu} required
                                          onIonChange={(e) => setLieu(handleLocale(e))}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Hafatra</IonLabel>
                                <IonTextarea name="message" required value={message}
                                             onIonChange={(e) => setMessage(handleMessage(e))}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Sary</IonLabel>
                                <input type={"file"} onChange={e => setPhoto(handlePhoto(e))}/>
                            </IonItem>
                            <div className="ion-padding">
                                <IonButton expand="block" type="submit" className="ion-no-margin">Ajouter</IonButton>
                            </div>
                        </form>
                    </IonCardContent>
                </IonCard>
                {/*<IonFab vertical="center" onClick={() => {*/}
                {/*    takePhoto().then(res => {*/}
                {/*        console.log(photos)*/}
                {/*    });*/}
                {/*}} horizontal="end" slot="fixed">*/}
                {/*    <IonFabButton>*/}
                {/*        <IonIcon icon={camera}/>*/}
                {/*    </IonFabButton>*/}
                {/*</IonFab>*/}
            </IonContent>
        </IonPage>
    )
};

export default AddActualite;