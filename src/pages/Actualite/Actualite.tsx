import React from 'react';
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    withIonLifeCycle,
    IonItem,
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonChip,
    IonText
} from '@ionic/react';
import './Actualite.css';
import {RefresherEventDetail} from '@ionic/core';

import Header from '../../components/Navigation/Header';
import {add, alarmOutline, car, location} from 'ionicons/icons';
import Axios from 'axios';
import HTTP_BASE_URL from '../../Constant/HttpConstant';
import img from "../Offre/assets/covoiturage.png";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

/**
 * Class actualite ,
 *
 * Receive actualite , map actualite
 */
class Actualite extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            actu: [],
            user: null,
        }
    }

    /**
     * Get and manage user from storage
     */
    async getObject() {
        const ret = await Storage.get({key: 'user'});
        const user = JSON.parse(ret && ret.value ? ret.value : '{"user":null}');

        if (user.id) {
            this.setState({
                user: user,
            })
        } else {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        this.getData();
    }

    ionViewWillEnter() {
        this.getObject().then(() => {
            this.getData();
        });
    }

    getData = () => {
        Axios.post(HTTP_BASE_URL + '/api/actualite/list').then(res => {
            if (this.state.actu.length !== res.data.data.length) {
                this.setState({
                    actu: res.data.data
                });
            }
        })
    };

    doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            this.getData();
            event.detail.complete();
        }, 2000);
    }

    onRedirect() {
        this.props.history.push('/addActu');
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
                        this.state.actu.map((res: any) => {
                            return (
                                <IonItem key={res.id}>
                                    <img alt="profile" style={{width: "45px", height: "45px",marginRight:"20px"}} src={img}/>
                                    <IonLabel>
                                        <h2>{res.user ? (res.user.name ? res.user.name.charAt(0).toUpperCase() + res.user.name.slice(1) : 'Signaleo') : 'Signaleo'}</h2>
                                        <h3 className={"dark-orange"}>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol size="6">
                                                        <IonIcon icon={location} color="primary"/> {res.lieu}
                                                    </IonCol>
                                                    <IonCol size="6">
                                                        <IonIcon icon={car} color="danger"/>
                                                        <IonText
                                                            color={res.type === "Accident" ? "danger" : "primary"}>
                                                            {res.type}
                                                        </IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </h3>
                                        <p className={"ion-text-wrap"}>
                                            {res.message.charAt(0).toUpperCase() + res.message.slice(1)}
                                        </p>
                                        <p>
                                            <IonChip color="warning">
                                                <IonIcon icon={alarmOutline} color="dark"/>
                                                <IonLabel>{res.dateAdd ? (res.dateAdd.split('T')[0] + ' - ' + res.dateAdd.split('T')[1].slice(0, 5)) : 'A confirmer'}</IonLabel>
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

export default withIonLifeCycle(Actualite);