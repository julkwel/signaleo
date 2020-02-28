import React from "react";
import {
    IonAlert, IonButton, IonCard,
    IonContent,IonInput, IonItem, IonLabel,
    IonPage, IonSelect, IonSelectOption, IonTextarea,
} from "@ionic/react";
import {CameraResultType, Plugins} from "@capacitor/core";
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import Header from "../components/Navigation/Header";
import axios from "axios";
import HTTP_BASE_URL from "../Constant/HttpConstant";

const {Camera} = Plugins;

export default class CameraServices extends React.Component {
    constructor(props) {
        super(props);

        defineCustomElements(window);
        this.state = {
            photo: '',
            lieu: '',
            cause: '',
            message: '',
            alert: {
                isShow: false,
                message: ''
            }
        }
    }

    async takePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
        });
        const imageUrl = image.webPath;
        this.setState({
            photo: imageUrl
        });
    }

    submit = async () => {
        axios.post(HTTP_BASE_URL + '/api/embouteka/manage', {
            lieu: this.state.lieu,
            type: this.state.cause,
            message: this.state.message,
            photo: this.state.photo
        }).then(res => {
            console.log(res)
            this.setState({
                alert: {
                    isShow: true,
                    message: 'Misaotra nizara !!!'
                }
            });
        }).catch(reject => {
            console.log(reject);
            this.setState({
                alert: {
                    isShow: true,
                    message: 'Une erreur c\'est produite'
                }
            })
        });
    };

    handleLocale = (e) => {
        this.setState({
            lieu: e.target.value
        });
    };

    handleType = (e) => {
        this.setState({
            cause: e.target.value
        });
    };

    handleMessage = (e) => {
        this.setState({
            message: e.target.value
        });
    };

    render() {
        return (
            <IonPage>
                <IonContent>
                    <Header/>
                    <IonAlert isOpen={alert.isShow} message={alert.message}/>
                    <IonCard>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.submit();
                        }}>
                            <IonAlert isOpen={false} message=""/>
                            <IonItem>
                                <IonLabel position="floating">Type</IonLabel>
                                <IonSelect name="type" value={this.state.cause} onIonChange={(e) => this.handleType(e)}>
                                    <IonSelectOption value="accident">Accident</IonSelectOption>
                                    <IonSelectOption value="fiaraMaty">Fiara Maty</IonSelectOption>
                                    <IonSelectOption value="emboutaka">Emboutaka Fotsiny</IonSelectOption>
                                    <IonSelectOption value="malalaka">Malalaka ny lalana</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Toerana</IonLabel>
                                <IonInput name="lieu" value={this.state.lieu}
                                          onIonChange={(e) => this.handleLocale(e)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Hafatra</IonLabel>
                                <IonTextarea name="message" value={this.state.message}
                                             onIonChange={(e) => this.handleMessage(e)}/>
                            </IonItem>
                            <IonItem>
                                <IonButton color="primary" onClick={() => this.takePicture()} expand="block"
                                           type="button">Photo</IonButton>
                            </IonItem>
                            <IonButton color="primary" expand="block" type="submit">Ajouter</IonButton>
                        </form>
                    </IonCard>
                </IonContent>
            </IonPage>
        );
    }
}