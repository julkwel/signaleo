import React, {useState} from 'react';
import {
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonContent,
    IonCard,
    IonButton,
    IonAlert,
    IonCardTitle, IonCardContent, useIonViewWillEnter, IonList
} from '@ionic/react';
import Header from '../../../components/Navigation/Header';
import Axios from 'axios';
import HTTP_BASE_URL from '../../../Constant/HttpConstant';
import {useHistory} from 'react-router';
import {Plugins} from "@capacitor/core";
import AsyncCreatableSelect from "react-select/async-creatable";

const AddOffre: React.FC = () => {
    const [depart, setDepart] = useState('');
    const [arrive, setArrive] = useState('');
    const [user, setUser] = useState('');
    const [dateDepart, setDateDepart] = useState('');
    const [contact, setContact] = useState('');
    const history = useHistory();
    const [alert, setAlert] = useState({isOpen: false, message: ''});
    const {Storage} = Plugins;

    const submit = () => {
        Axios.post(HTTP_BASE_URL + '/api/zambaento/manage', {
            depart: depart,
            arrive: arrive,
            dateDepart: dateDepart,
            userId: user,
            contact: contact
        }).then((data) => {
            if ('success' === data.data.message) {
                setAlert({
                    isOpen: true,
                    message: 'Voaray ny fangatahana !'
                });

                history.push('/offre');
            } else {
                setAlert({
                    isOpen: true,
                    message: 'Misy olana ny tolotra!'
                })
            }
        })
    };

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

    const promiseOptions = (inputValue: any) => Axios.post(HTTP_BASE_URL + '/api/actualite/fokontany/find', {search: inputValue}).then(res => {
        return res.data.data;
    });

    const handleContact = (e: any) => {
        return e.target.value;
    };

    const handleDateDepart = (e: any) => {
        return e.detail.value;
    };

    const handleSelectValue = (e: any) => {
        return e.value;
    };


    return (
        <IonPage>
            <IonContent>
                <Header/>
                <IonAlert mode={"ios"} isOpen={alert.isOpen} message={alert.message}/>
                <IonCard mode={"ios"}>
                    <IonCardTitle>
                        <h2 color={"primary"} className={"text-center"}>Hitady mpitondra</h2>
                    </IonCardTitle>
                    <IonCardContent>
                        <form onSubmit={e => {
                            e.preventDefault();
                            submit()
                        }}>
                            <IonList ion-list lines="full" class="ion-no-margin ion-no-padding">
                                <div className={"mt-2 p-1"}>
                                    <AsyncCreatableSelect
                                        defaultOptions
                                        cacheOptions
                                        placeholder={"Toerana hiaingana"}
                                        styles={{
                                            menu: provided => ({...provided, zIndex: 9999})
                                        }}
                                        onChange={(e) => setDepart(handleSelectValue(e))}
                                        loadOptions={promiseOptions}
                                    />
                                </div>
                                <div className={"mt-2 p-1"}>
                                    <AsyncCreatableSelect
                                        defaultOptions
                                        cacheOptions
                                        placeholder={"Toerana hahatongavana"}
                                        styles={{
                                            menu: provided => ({...provided, zIndex: 9999})
                                        }}
                                        onChange={(e) => setArrive(handleSelectValue(e))}
                                        loadOptions={promiseOptions}
                                    />
                                </div>
                                <IonItem>
                                    <IonLabel position="stacked">Contact</IonLabel>
                                    <IonInput required name="lieu" value={contact}
                                              onIonChange={(e) => setContact(handleContact(e))}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Lera Hiaingana</IonLabel>
                                    <IonDatetime displayFormat="YYYY-MM-DDTHH:mm"
                                                 min={new Date().toISOString().slice(0, 10)}
                                                 onIonChange={(e) => setDateDepart(handleDateDepart(e))}/>
                                </IonItem>
                                <IonButton color="primary" expand="block" type="submit">Ajouter</IonButton>
                            </IonList>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default AddOffre;