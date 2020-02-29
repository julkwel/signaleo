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
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonChip,
    IonSegment,
    IonSegmentButton,
    IonAlert,
    IonBadge,
    IonCard,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import './Actualite.css';
import {RefresherEventDetail} from '@ionic/core';

import Header from '../../components/Navigation/Header';
import {add, alarmOutline, car, location, thumbsDownOutline, thumbsUpOutline} from 'ionicons/icons';
import Axios from 'axios';
import HTTP_BASE_URL from '../../Constant/HttpConstant';
import img from "../../assets/emboutaka.png";
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
            alert: {
                isShow: false,
                message: ''
            },
        }
    }

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

    addVote(uri: any, value: any) {
        if (this.state.user && this.state.user.id) {
            Axios.post(uri, {vote: value, user: this.state.user.id}).then(res => {
                if (res.data.status === 'success') {
                    this.setState({
                        alert: {
                            isShow: true,
                            message: 'Misaotra',
                        }
                    })
                } else {
                    this.setState({
                        alert: {
                            isShow: true,
                            message: 'Misy olana ny signaleo',
                        }
                    })
                }

                Axios.post(HTTP_BASE_URL + '/api/actualite/list').then(res => {
                    this.setState({
                        actu: res.data.data
                    });
                })
            });
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <Header/>
                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={(e) => this.doRefresh(e)}>
                        <IonRefresherContent/>
                    </IonRefresher>
                    <IonAlert
                        mode={"ios"}
                        isOpen={this.state.alert.isShow}
                        onDidDismiss={() => this.setState({alert: {isShow: false}})}
                        header={this.state.alert.message}
                        buttons={['OK']}
                    />

                    {
                        this.state.actu.map((res: any) => {
                            let marina = 0;
                            let diso = 0;

                            res.vote.map((vote: any) => {
                                if (vote.type === true) {
                                    ++marina
                                }
                                if (vote.type === false) {
                                    ++diso;
                                }
                            });

                            return (
                                <IonCard mode={"ios"} key={res.id}>
                                    <img alt="profile" style={{width:'100%',height:"150px"}}
                                         src={(res.photo && true && res.photo !== '') ? res.photo : img}/>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCardTitle>{res.user ? (res.user.name ? res.user.name.charAt(0).toUpperCase() + res.user.name.slice(1) : 'Signaleo') : 'Signaleo'}</IonCardTitle>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="6">
                                                <IonChip color={res.type === "Accident" ? "danger" : "primary"}>
                                                    <IonIcon icon={location} color="primary"/>
                                                    <IonLabel >{res.lieu.charAt(0).toUpperCase() + res.lieu.slice(1)}</IonLabel>
                                                </IonChip>
                                            </IonCol>
                                            <IonCol size="6">
                                                <IonChip color={res.type === "Accident" ? "danger" : "primary"}>
                                                    <IonIcon icon={car} color={res.type === "Accident" ? "danger" : "primary"}/>
                                                    <IonLabel
                                                        color={res.type === "Accident" ? "danger" : "primary"}>{res.type}</IonLabel>
                                                </IonChip>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                    <IonCardContent>
                                        {res.message.charAt(0).toUpperCase() + res.message.slice(1)}
                                    </IonCardContent>
                                    <IonChip color="dark" className={"actualite-date-chip"} mode={"ios"}>
                                        <IonIcon icon={alarmOutline} color="dark"/>
                                        <IonLabel>{res.dateAdd ? (res.dateAdd.split('T')[0] + ' - ' + res.dateAdd.split('T')[1].slice(0, 5)) : 'A confirmer'}</IonLabel>
                                    </IonChip>
                                    <IonSegment
                                        onIonChange={e => this.addVote(HTTP_BASE_URL + '/api/actualite/vote/' + res.id, e.detail.value === 'marina')}>
                                        <IonSegmentButton value="marina">
                                            <IonIcon icon={thumbsUpOutline}/>
                                            <IonLabel>Marina</IonLabel> <IonBadge
                                            color="primary">{marina}</IonBadge>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="diso">
                                            <IonIcon icon={thumbsDownOutline}/>
                                            <IonLabel>Diso</IonLabel> <IonBadge
                                            color="primary">{diso}</IonBadge>
                                        </IonSegmentButton>
                                    </IonSegment>
                                </IonCard>
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