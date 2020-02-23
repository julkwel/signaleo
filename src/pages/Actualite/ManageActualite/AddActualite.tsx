import React, { useState } from 'react';
import { IonPage, IonContent, IonCard, IonInput, IonSelect, IonItem, IonSelectOption, IonButton, IonLabel, IonAlert, IonTextarea } from '@ionic/react';
import axios from 'axios'
import { useHistory } from 'react-router';
import Header from '../../../components/Navigation/Header';
import '../../../Constant/HttpConstant'

const AddActualite: React.FC = () => {
    const [lieu, setLieu] = useState('');
    const [cause, setCause] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();
    const [alert, setAlert] = useState({
        isShow: false,
        message: ''
    });

    const submit = async () => {
        axios.post(HTTP_BASE_URL + '/api/embouteka/manage', { lieu: lieu, type: cause, message: message }).then(res => {
            setAlert({
                isShow: true,
                message: 'Misaotra nizara !!!'
            });
            if (res.status === 200) {
                history.push('/');
            }
        }).catch(reject => {
            console.log(reject);
            setAlert({
                isShow: true,
                message: 'Une erreur c\'est produite'
            });
        });
    }

    const handleLocale = (e: any) => {
        return e.target.value;
    }

    const handleType = (e: any) => {
        return e.target.value;
    }

    const handleMessage = (e: any) => {
        return e.target.value;
    }

    return (
        <IonPage>
            <IonContent>
                <Header></Header>
                <IonAlert isOpen={alert.isShow} message={alert.message}></IonAlert>
                <IonCard>
                    <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
                        <IonAlert isOpen={false} message=""></IonAlert>
                        <IonItem>
                            <IonLabel position="floating">Type</IonLabel>
                            <IonSelect name="type" value={cause} onIonChange={(e) => setCause(handleType(e))}>
                                <IonSelectOption value="accident">Accident</IonSelectOption>
                                <IonSelectOption value="fiaraMaty">Fiara Maty</IonSelectOption>
                                <IonSelectOption value="emboutaka">Emboutaka Fotsiny</IonSelectOption>
                                <IonSelectOption value="malalaka">Malalaka ny lalana</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Toerana</IonLabel>
                            <IonInput name="lieu" value={lieu} onIonChange={(e) => setLieu(handleLocale(e))} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Hafatra</IonLabel>
                            <IonTextarea name="message" value={message} onIonChange={(e) => setMessage(handleMessage(e))} />
                        </IonItem>
                        <IonButton color="primary" expand="block" type="submit">Ajouter</IonButton>
                    </form>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default AddActualite;