import React, {useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardTitle,
    IonContent, IonDatetime, IonList, IonLoading, IonPage, useIonViewWillEnter,
} from "@ionic/react";
import Header from "../../../components/Navigation/Header";
import Axios from "axios";
import HTTP_BASE_URL from "../../../Constant/HttpConstant";
import {useHistory} from "react-router";
import AsyncCreatableSelect from 'react-select/async-creatable';
import {Plugins} from "@capacitor/core";

/**
 * Add proposition covoiturage
 *
 * @constructor
 */
const AddProposition: React.FC = () => {
    const [frais, setFrais] = useState('');
    const [arrive, setArrive] = useState('');
    const [depart, setDepart] = useState('');
    const [nombreDePlace, setNombreDePlace] = useState('');
    const [contact, setContact] = useState('');
    const [dateDepart, setDateDepart] = useState('');
    const [userId, setUser] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const history = useHistory();
    const {Storage} = Plugins;

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

    let data = {
        userId: userId,
        destination: arrive,
        depart: depart,
        nombreDePlace: nombreDePlace,
        contact: contact,
        frais: frais,
        dateDepart: dateDepart
    };

    const submit = () => {
        setShowLoading(true);
        Axios.post(HTTP_BASE_URL + '/api/offre/manage', data).then(res => {
            if (res.data.status === 'success') {
                history.push('/offre');
            }

            setShowLoading(false)
        })
    };

    const promiseOptions = (inputValue: any) => Axios.post(HTTP_BASE_URL + '/api/actualite/fokontany/find', {search: inputValue}).then(res => {
        return res.data.data;
    });

    const handleValue = (e: any) => {
        return e.target.value;
    };

    const handleDate = (e: any) => {
        return e.detail.value;
    };

    const handleSelectValue = (e: any) => {
        return e.value;
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header/>
                <IonLoading
                    mode={"ios"}
                    isOpen={showLoading}
                    message={'Mahandrasa kely azafady ...'}
                />
                <IonCard mode={"ios"}>
                    <IonCardTitle>
                        <h2 color={"primary"} className={"text-center title-text"}>Hitondra olona</h2>
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
                                        required
                                        cacheOptions
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
                                        required
                                        defaultOptions
                                        cacheOptions
                                        placeholder={"Toerana aleha"}
                                        styles={{
                                            menu: provided => ({...provided, zIndex: 9999})
                                        }}
                                        className={"ion-select-custom"}
                                        onChange={(e) => setArrive(handleSelectValue(e))}
                                        loadOptions={promiseOptions}
                                    />
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <input type="text" placeholder={"Isan'ny toerana malalaka"}
                                           required
                                           value={nombreDePlace}
                                           className={"form-control"}
                                           onChange={(e) => setNombreDePlace(handleValue(e))}/>
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <input name="frais"
                                           className={"form-control"}
                                           required
                                           placeholder={"Saran-dalana"}
                                           value={frais}
                                           onChange={(e) => setFrais(handleValue(e))}/>
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <input className={"form-control"} name="contact"
                                           required
                                           value={contact}
                                           placeholder={"Finday"}
                                           onChange={(e) => setContact(handleValue(e))}/>
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <IonDatetime placeholder={"Lera hiaingana"} className={"form-control"}
                                                 displayFormat="YYYY-MM-DDTHH:mm"
                                                 min={new Date().toISOString().slice(0, 10)}
                                                 onIonChange={(e) => setDateDepart(handleDate(e))}/>
                                </div>
                                <div className={"form-group p-1"}>
                                    <IonButton color="primary"
                                               expand="full"
                                               type="submit">Alefa</IonButton>
                                </div>
                            </IonList>
                        </form>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default AddProposition;
