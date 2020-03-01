import React, {useState} from "react";
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardTitle,
    IonContent, IonDatetime, IonInput,
    IonItem,
    IonLabel, IonList, IonPage,
} from "@ionic/react";
import Header from "../../../components/Navigation/Header";
import Axios from "axios";
import HTTP_BASE_URL from "../../../Constant/HttpConstant";
import {useHistory} from "react-router";
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

const AddProposition: React.FC = () => {
    const [frais, setFrais] = useState('');
    const [arrive, setArrive] = useState('');
    const [depart, setDepart] = useState('');
    const [nombreDePlace, setNombreDePlace] = useState('');
    const [contact, setContact] = useState('');
    const [dateDepart, setDateDepart] = useState('');
    const history = useHistory();

    let data = {
        userId: 0,
        destination: arrive,
        depart: depart,
        nombreDePlace: nombreDePlace,
        contact: contact,
        frais: frais,
        dateDepart: dateDepart
    };

    const submit = () => {
        Axios.post(HTTP_BASE_URL + '/api/offre/manage', data).then(res => {
            if (res.data.status === 'success') {
                history.push('/listDemande');
            }
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
                <IonCard mode={"ios"}>
                    <IonCardTitle>
                        <h2 color={"primary"} className={"text-center title-text"}>Hitondra olona</h2>
                    </IonCardTitle>
                    <IonCardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            submit();
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
                                        placeholder={"Toerana aleha"}
                                        styles={{
                                            menu: provided => ({...provided, zIndex: 9999})
                                        }}
                                        onChange={(e) => setArrive(handleSelectValue(e))}
                                        loadOptions={promiseOptions}
                                    />
                                </div>
                                <IonItem>
                                    <IonLabel position="stacked">Isan'ny toerana malalaka</IonLabel>
                                    <IonInput name="message" required value={nombreDePlace}
                                              onIonChange={(e) => setNombreDePlace(handleValue(e))}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Frais</IonLabel>
                                    <IonInput name="message" required value={frais}
                                              onIonChange={(e) => setFrais(handleValue(e))}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Contact</IonLabel>
                                    <IonInput name="message" required value={contact}
                                              onIonChange={(e) => setContact(handleValue(e))}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Lera Hiaingana</IonLabel>
                                    <IonDatetime displayFormat="YYYY-MM-DDTHH:mm"
                                                 min={new Date().toISOString().slice(0, 10)}
                                                 onIonChange={(e) => setDateDepart(handleDate(e))}/>
                                </IonItem>
                                <div className="ion-padding">
                                    <IonButton expand="block" type="submit"
                                               className="ion-no-margin">Ajouter</IonButton>
                                </div>
                            </IonList>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default AddProposition;