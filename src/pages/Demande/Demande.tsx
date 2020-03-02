import React from 'react';
import {
    IonChip,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    withIonLifeCycle
} from '@ionic/react';
import './Demande.css';
import Header from "../../components/Navigation/Header";
import {
    add,
    alarmOutline,
    ellipsisHorizontalOutline,
    location, people,
    phonePortraitOutline, wallet
} from "ionicons/icons";
import Axios from "axios";
import HTTP_BASE_URL from "../../Constant/HttpConstant";
import {Plugins} from "@capacitor/core";
import img from "../Offre/assets/covoiturage.png";
import {RefresherEventDetail} from "@ionic/core";

const {Storage} = Plugins;

/**
 * Handle all offre data
 */
class Demande extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            listOffre: []
        };
        this.getData = this.getData.bind(this);
    }

    doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            this.getData();
            event.detail.complete();
        }, 2000);
    }

    async getUser() {
        const ret = await Storage.get({key: 'user'});
        const user = JSON.parse(ret && ret.value ? ret.value : '{"user":null}');
        if (user.id) {
            this.setState({
                user: user
            });
        } else {
            this.props.history.push('/login');
        }
    }

    onRedirect() {
        this.props.history.push('/demande');
    }

    getData() {
        Axios.post(HTTP_BASE_URL + '/api/offre/list').then(res => {
            this.setState({
                listOffre: res.data.message
            })
        })
    }

    ionViewWillEnter() {
        this.getUser().then((res: any) => {
            this.getData();
        });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <Header/>
                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={(e) => this.doRefresh(e)}>
                        <IonRefresherContent/>
                    </IonRefresher>
                    {
                        this.state.listOffre.map((item: any) => {
                            console.log(item)
                            return (
                                <IonItem key={item.id}>
                                    <img alt="profile" style={{width: "45px", height: "45px"}} src={img}/>
                                    <IonLabel>
                                        <h2>{item.user ? (item.user.name ? item.user.name : 'Signaleo') : 'Signaleo'}</h2>
                                        <IonChip color="primary">
                                            <IonIcon icon={location} color="primary"/>
                                            <IonLabel  className={"ion-text-wrap"}>{item.depart}</IonLabel>&nbsp;
                                            <IonIcon icon={ellipsisHorizontalOutline}/>&nbsp;
                                            <IonIcon icon={location} color="success"/>
                                            <IonLabel  className={"ion-text-wrap"}>{item.arrive}</IonLabel>
                                        </IonChip>
                                        <p>
                                            <IonChip color="warning">
                                                <IonIcon icon={alarmOutline} color="dark"/>
                                                <IonLabel>{item.dateDepart ? item.dateDepart.split('T')[0] + ' ' + item.dateDepart.split('T')[1].substring(0, 5) : 'Androany'}</IonLabel>
                                            </IonChip>
                                            <IonChip color="warning">
                                                <IonIcon icon={people} color="dark"/>
                                                <IonLabel>{item.nombreDePlace}</IonLabel>
                                            </IonChip>
                                        </p>
                                        <p>
                                            <IonChip color="warning">
                                                <IonIcon icon={wallet} color="dark"/>
                                                <IonLabel>{item.frais}</IonLabel>
                                            </IonChip>
                                            <IonChip color="warning">
                                                <IonIcon icon={phonePortraitOutline} color="dark"/>
                                                <IonLabel>{item.contact}</IonLabel>
                                            </IonChip>
                                        </p>
                                    </IonLabel>
                                </IonItem>
                            )
                        })
                    }

                    <IonFab vertical="center" onClick={(e) => {
                        e.preventDefault();
                        this.onRedirect()
                    }} horizontal="end" slot="fixed">
                        <IonFabButton>
                            <IonIcon icon={add}/>
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        );
    }
}

export default withIonLifeCycle(Demande);