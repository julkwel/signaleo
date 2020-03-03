import React, {useState} from 'react';
import {
    IonPage,
    IonContent,
    IonCard,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonAlert,
    useIonViewWillEnter,
    IonCardTitle,
    IonList,
} from '@ionic/react';
import axios from 'axios'
import {useHistory} from 'react-router';
import Header from '../../../components/Navigation/Header';
import HTTP_BASE_URL from '../../../Constant/HttpConstant'
import {Plugins} from "@capacitor/core";
// import {camera} from "ionicons/icons";
// import {usePhotoGallery} from '../../../hooks/CameraServices';
import {CustomInput, FormGroup, Label} from 'reactstrap';
import AsyncSelect from 'react-select/async';
import Axios from "axios";

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
    // const {photos, takePhoto} = usePhotoGallery();

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

    const handleType = (e: any) => {
        return e.target.value;
    };

    const handleMessage = (e: any) => {
        return e.target.value;
    };

    const promiseOptions = (inputValue: any) => Axios.post(HTTP_BASE_URL + '/api/actualite/fokontany/find', {search: inputValue}).then(res => {
        return res.data.data;
    });

    const handleValue = (e: any) => {
        setLieu(e.value);
    };

    const handlePhoto = (e: any) => {
        const maxAllowedSize = 2 * 1024 * 1024;
        if (e.target.files[0].size > maxAllowedSize) {
            setAlert({
                isShow: true,
                message: 'Mavesatra loatra ny sary alefanao!'
            });

            return e.target.value = ''
        }

        return e.target.files ? e.target.files[0] : '';
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header/>
                <IonAlert mode={"ios"} isOpen={alert.isShow} message={alert.message}/>
                <IonCard mode={"ios"}>
                    <IonCardTitle>
                        <h2 className={"text-center  title-text"}>Signaleo izay hitanao</h2>
                    </IonCardTitle>
                    <div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            submit().then();
                         }}>
                            <IonList ion-list lines="full" class="ion-no-margin ion-no-padding">
                                <IonAlert isOpen={false} message=""/>
                                <div className={"form-group mt-2 p-1"}>
                                    <IonSelect placeholder={"Inona no mitrange ?"} className={"form-control"} mode={"ios"} name="type" value={cause}
                                               onIonChange={(e) => setCause(handleType(e))}>
                                        <IonSelectOption value="Accident">Accident</IonSelectOption>
                                        <IonSelectOption value="FiaraMaty">Fiara Maty</IonSelectOption>
                                        <IonSelectOption value="Embouteillage">Embouteillage be</IonSelectOption>
                                        <IonSelectOption value="Malalaka">Malalaka ny lalana</IonSelectOption>
                                    </IonSelect>
                                </div>
                                <div className={"mt-2 p-1"}>
                                    <AsyncSelect
                                        placeholder={"Toerana"}
                                        required
                                        styles={{
                                            menu: provided => ({...provided, zIndex: 9999})
                                        }}
                                        onChange={handleValue} cacheOptions defaultOptions
                                        loadOptions={promiseOptions}
                                    />
                                </div>
                                <div className={"mt-2 p-1"}>
                                    <FormGroup>
                                        <Label for="uploadImage"/>
                                        <CustomInput accept="image/*"
                                                     capture="camera"
                                                     onChange={e => setPhoto(handlePhoto(e))} type="file"
                                                     id="uploadImage"
                                                     name="customFile"
                                                     label="Asio sary!"
                                        />
                                    </FormGroup>
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <textarea placeholder={"Hafatra"}
                                              required
                                              onChange={(e) => setMessage(handleMessage(e))}
                                              className={"form-control"}/>
                                </div>
                                <IonButton expand="block" type="submit" >Hampiditra</IonButton>
                            </IonList>
                        </form>
                    </div>
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