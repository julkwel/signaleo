import React, {useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent, IonCardTitle,
    IonContent, IonDatetime, IonInput,
    IonItem,
    IonLabel, IonPage,
} from "@ionic/react";
import Header from "../../../components/Navigation/Header";
import Axios from "axios";
import HTTP_BASE_URL from "../../../Constant/HttpConstant";
import {useHistory} from "react-router";

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

    const handleContact = (e: any) => {
        return e.target.value;
    };

    const handleFrais = (e: any) => {
        return e.target.value;
    };

    const handleAxe = (e: any) => {
        return e.target.value;
    };

    const handleArrive = (e: any) => {
        return e.target.value;
    };

    const handleNombreDePlace = (e: any) => {
        return e.target.value;
    };

    const handleDateDepart = (e: any) => {
        return e.detail.value;
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
                            <IonItem>
                                <IonLabel position="stacked">Toerana Hiaingana</IonLabel>
                                <IonInput name="lieu" value={depart} required
                                          onIonChange={(e) => setDepart(handleAxe(e))}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Toerana Hahatongavana</IonLabel>
                                <IonInput name="message" required value={arrive}
                                          onIonChange={(e) => setArrive(handleArrive(e))}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Toerana Malalaka</IonLabel>
                                <IonInput name="message" required value={nombreDePlace}
                                          onIonChange={(e) => setNombreDePlace(handleNombreDePlace(e))}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Frais</IonLabel>
                                <IonInput name="message" required value={frais}
                                          onIonChange={(e) => setFrais(handleFrais(e))}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Contact</IonLabel>
                                <IonInput name="message" required value={contact}
                                          onIonChange={(e) => setContact(handleContact(e))}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Lera Hiaingana</IonLabel>
                                <IonDatetime displayFormat="YYYY-MM-DDTHH:mm"
                                             onIonChange={(e) => setDateDepart(handleDateDepart(e))}/>
                            </IonItem>
                            <div className="ion-padding">
                                <IonButton expand="block" type="submit" className="ion-no-margin">Ajouter</IonButton>
                            </div>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default AddProposition;