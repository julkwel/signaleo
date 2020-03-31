import React, {useState} from 'react';
import {
    IonPage,
    IonDatetime,
    IonContent,
    IonCard,
    IonButton,
    IonAlert,
    IonCardTitle,
    useIonViewWillEnter, IonList, IonLoading
} from '@ionic/react';
import Header from '../../../components/Navigation/Header';
import Axios from 'axios';
import HTTP_BASE_URL from '../../../Constant/HttpConstant';
import {useHistory} from 'react-router';
import {Plugins} from "@capacitor/core";
import AsyncCreatableSelect from "react-select/async-creatable";

const AddDemande: React.FC = () => {
    const [depart, setDepart] = useState('');
    const [arrive, setArrive] = useState('');
    const [user, setUser] = useState('');
    const [dateDepart, setDateDepart] = useState('');
    const [contact, setContact] = useState('');
    const history = useHistory();
    const [alert, setAlert] = useState({isOpen: false, message: ''});
    const [showLoading, setShowLoading] = useState(false);
    const {Storage} = Plugins;

    const submit = () => {
        setShowLoading(true);
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

                setShowLoading(false);
                history.push('/demande');
            } else {
                setAlert({
                    isOpen: true,
                    message: 'Misy olana ny tolotra!'
                });

                setShowLoading(false)
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
                <IonLoading
                    mode={"ios"}
                    isOpen={showLoading}
                    message={'Mahandrasa kely azafady ...'}
                />
                <IonAlert mode={"ios"} isOpen={alert.isOpen} message={alert.message}/>
                <IonCard mode={"ios"}>
                    <IonCardTitle>
                        <h2 color={"primary"} className={"text-center"}>Hitady mpitondra</h2>
                    </IonCardTitle>
                    <div>
                        <form onSubmit={(e: any) => {
                            e.preventDefault();
                            submit();
                            e.target.reset();
                        }}>
                            <IonList ion-list lines="full" class="ion-no-margin ion-no-padding">
                                <div className={"mt-2 p-1"}>
                                    <AsyncCreatableSelect
                                        defaultOptions
                                        cacheOptions
                                        required
                                        placeholder={"Toerana hiaingana"}
                                        styles={{
                                            menu: provided => ({...provided, zIndex: 9999})
                                        }}
                                        className={"ion-select-custom"}
                                        onChange={(e) => setDepart(handleSelectValue(e))}
                                        loadOptions={promiseOptions}
                                    />
                                </div>
                                <div className={"mt-2 p-1"}>
                                    <AsyncCreatableSelect
                                        defaultOptions
                                        cacheOptions
                                        required
                                        placeholder={"Toerana haleha"}
                                        styles={{
                                            menu: provided => ({...provided, zIndex: 9999})
                                        }}
                                        className={"ion-select-custom"}
                                        onChange={(e) => setArrive(handleSelectValue(e))}
                                        loadOptions={promiseOptions}
                                    />
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <input type="text"
                                           required
                                           placeholder={"Finday"}
                                           className={"form-control"}
                                           onChange={(e) => setContact(handleContact(e))}/>
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <IonDatetime className={"form-control"}
                                                 placeholder={"Lera Hiaingana"}
                                                 displayFormat="YYYY-MM-DDTHH:mm"
                                                 min={new Date().toISOString().slice(0, 10)}
                                                 onIonChange={(e) => setDateDepart(handleDateDepart(e))}/>
                                </div>
                                <div className={"form-group p-1"}>
                                    <IonButton color="primary" expand="full" type="submit">Alefa</IonButton>
                                </div>
                            </IonList>
                        </form>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default AddDemande;
