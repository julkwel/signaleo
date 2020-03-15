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
    IonCardSubtitle,
    IonImg,
    IonItem,
    IonList,
    IonLoading,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonAvatar, IonSearchbar
} from '@ionic/react';
import './Actualite.css';
import {RefresherEventDetail} from '@ionic/core';

import Header from '../../components/Navigation/Header';
import {
    add,
    car,
    ellipsisVertical, happy, happyOutline,
    location,
    thumbsDown, thumbsDownOutline,
    thumbsUp, thumbsUpOutline,
} from 'ionicons/icons';
import Axios from 'axios';
import HTTP_BASE_URL from '../../Constant/HttpConstant';
import img from "../../assets/emboutaka.png";
import avatarGirl from "../../assets/avatar-girl.png";
import avatarMen from "../../assets/avatar-men.png";
import avatar from "../../assets/user-default.png";
import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from '@capacitor/core';
import {FabButton} from "../../components/Navigation/FabButton";

const {Storage, PushNotifications} = Plugins;

const INITIAL_STATE = {
    notifications: [{id: 'id', title: "Test Push", body: "This is my first push notification"}],
};

/**
 * Class actualite ,
 *
 * Receive actualite , map actualite
 */
class Actualite extends React.Component<any, any> {
    ionInfiniteScrollRef: React.RefObject<HTMLIonInfiniteScrollElement>;

    constructor(props: any) {
        super(props);
        this.ionInfiniteScrollRef = React.createRef<HTMLIonInfiniteScrollElement>();

        this.state = {
            actu: [],
            hasMore: true,
            page: 0,
            user: null,
            showLoading: true,
            alert: {
                isShow: false,
                message: ''
            },
            pushNotification: {...INITIAL_STATE}
        };
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

        document.getElementsByTagName("ion-tab-bar")[0].style.display = 'inherit';
    }

    getData = (page: any = 0, search: any = '') => {
        let form = new FormData();
        form.append('limit', page);
        form.append('search', search);
        form.append('user', this.state.user ? this.state.user.id : this.state.user);

        Axios.post(HTTP_BASE_URL + '/api/actualite/list', form).then(res => {
            this.setState({
                actu: res.data.data
            });

            if (res.status === 200) {
                this.setState({
                    showLoading: false
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

    // TODO implement notification push
    push() {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register().then();

        // On succcess, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
                alert('Push registration success, token: ' + token.value);
            }
        );

        // Some issue with your setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                let notif = this.state.pushNotification.notifications;
                notif.push({id: notification.id, title: notification.title, body: notification.body});
                this.setState({
                    pushNotification: {
                        notifications: notif
                    }
                })

            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                let notif = this.state.pushNotification.notifications;
                notif.push({
                    id: notification.notification.data.id,
                    title: notification.notification.data.title,
                    body: notification.notification.data.body
                });

                this.setState({
                    pushNotification: {
                        notifications: notif
                    }
                })
            }
        );
    }

    loadMoreItems(e: any) {
        this.getData(this.state.page + 10);

        (e.target as HTMLIonInfiniteScrollElement).complete().then(() => {
            this.setState({
                page: this.state.page + 10
            })
        });
    }

    addVote(uri: any, value: any) {
        console.log(value);

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

                this.getData();
            });
        }
    }

    deleteArticle(id: any) {
        if (window.confirm('Hofafana?')) {
            Axios.post(HTTP_BASE_URL + '/api/actualite/delete/' + id + '/' + this.state.user.id).then((res) => {
                this.getData();
            })
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <Header/>
                <IonSearchbar placeholder={"Hitady ..."}
                              onIonChange={e => this.getData(this.state.page, e.detail.value)}/>
                <FabButton/>
                <IonContent fullscreen>
                    <IonRefresher slot="fixed" onIonRefresh={(e) => this.doRefresh(e)}>
                        <IonRefresherContent/>
                    </IonRefresher>
                    <IonLoading
                        mode={"ios"}
                        isOpen={this.state.showLoading}
                        message={'Mahandrasa kely azafady ...'}
                    />
                    <IonAlert
                        mode={"ios"}
                        isOpen={this.state.alert.isShow}
                        onDidDismiss={() => this.setState({alert: {isShow: false}})}
                        header={this.state.alert.message}
                        buttons={['OK']}
                    />
                    <IonList>
                        {
                            this.state.actu.map((res: any) => {
                                return (
                                    <IonCard mode={"ios"} key={res.id}>
                                        <IonItem mode={"ios"} lines={"none"}>
                                            <IonLabel>
                                                <IonRow>
                                                    <IonCol size={"3"}>
                                                        <IonAvatar>
                                                            <IonImg alt={"Signaleo"}
                                                                    src={(res.user.gender !== 'Vavy' && res.user.gender === 'Lahy') ? (res.user.gender === 'Vavy' ? avatarGirl : avatarMen) : avatar}/>
                                                        </IonAvatar>
                                                    </IonCol>
                                                    <IonCol size={"8"}>
                                                        <IonCardSubtitle>{res.user.name.charAt(0).toUpperCase() + res.user.name.slice(1)} |
                                                            ({(res.user.point < 0) ? 0 : res.user.point + '+'})</IonCardSubtitle>
                                                        <p className={"ion-p-small"}>{res.dateAdd}</p>
                                                    </IonCol>
                                                    <IonCol size={"1"}>
                                                        <IonIcon icon={ellipsisVertical} onClick={() => {
                                                            if (this.state.user.id === res.user.id) {
                                                                this.deleteArticle(res.id);
                                                            }
                                                        }}/>
                                                    </IonCol>
                                                </IonRow>
                                                <IonLabel
                                                    className={"ion-text-wrap"}>{res.message.charAt(0).toUpperCase() + res.message.slice(1)}</IonLabel>
                                            </IonLabel>
                                        </IonItem>
                                        <IonImg src={(res.photo && true && res.photo !== '') ? res.photo : img}/>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="6">
                                                    <IonChip color={res.type === "Accident" ? "danger" : "primary"}>
                                                        <IonIcon icon={location}
                                                                 color={res.type === "Accident" ? "danger" : "primary"}/>
                                                        <IonLabel>{res.lieu.charAt(0).toUpperCase() + res.lieu.slice(1)}</IonLabel>
                                                    </IonChip>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <IonChip color={res.type === "Accident" ? "danger" : "primary"}>
                                                        <IonIcon icon={car}
                                                                 color={res.type === "Accident" ? "danger" : "primary"}/>
                                                        <IonLabel
                                                            color={res.type === "Accident" ? "danger" : "primary"}>{res.type}</IonLabel>
                                                    </IonChip>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                        <IonSegment className={"ion-segment-actu"}
                                                    color={res.actu.isOk ? "default" : "danger"}
                                                    onIonChange={(e: any) => this.addVote(HTTP_BASE_URL + '/api/actualite/vote/' + res.id, e.detail.value)}>
                                            <IonSegmentButton value="marina" layout="icon-end">
                                                <span role={"img"} aria-label={"marina"}>
                                                    <IonIcon className={"reaction-icon"}
                                                             color={
                                                                 res.vote.user && res.vote.user[0] && res.vote.user[0].type === "marina" ?
                                                                     "primary" : "medium"
                                                             }
                                                             icon={
                                                                 res.vote.user && res.vote.user[0] && res.vote.user[0].type === "marina" ?
                                                                     thumbsUp : thumbsUpOutline
                                                             }
                                                             mode={"ios"}/>
                                                             <span className={
                                                                 res.vote.user && res.vote.user[0] && res.vote.user[0].type === "marina" ?
                                                                     "icon-text text-primary" : "icon-text text-default"
                                                             }>Marina</span>
                                                </span>
                                                <IonLabel>
                                                    <IonBadge color="primary">{res.vote.marina}</IonBadge>
                                                </IonLabel>
                                            </IonSegmentButton>
                                            <IonSegmentButton value="diso" layout="icon-end">
                                                <span role={"img"} aria-label={"diso"}>
                                                    <IonIcon className={"reaction-icon"}
                                                             color={
                                                                 res.vote.user && res.vote.user[0] && res.vote.user[0].type === "diso" ?
                                                                     "danger" : "medium"
                                                             }
                                                             icon={
                                                                 res.vote.user && res.vote.user[0] && res.vote.user[0].type === "diso" ?
                                                                     thumbsDown : thumbsDownOutline
                                                             }
                                                             mode={"ios"}/>
                                                             <span className={
                                                                 res.vote.user && res.vote.user[0] && res.vote.user[0].type === "diso" ?
                                                                     "icon-text text-danger" : "icon-text text-default"
                                                             }>Diso</span>
                                                </span>
                                                <IonLabel>
                                                    <IonBadge color="primary">{res.vote.diso}</IonBadge>
                                                </IonLabel>
                                            </IonSegmentButton>
                                            <IonSegmentButton value="haha" layout="icon-end">
                                                <span role={"img"} aria-label={"haha"}>
                                                    <IonIcon
                                                        color={
                                                            res.vote.user && res.vote.user[0] && res.vote.user[0].type === "haha" ?
                                                                "warning" : "medium"
                                                        }
                                                        className={"reaction-icon"}
                                                        mode={"ios"}
                                                        icon={
                                                            res.vote.user && res.vote.user[0] && res.vote.user[0].type === "haha" ?
                                                                happy : happyOutline
                                                        }/>
                                                             <span className={
                                                                 res.vote.user && res.vote.user[0] && res.vote.user[0].type === "haha" ?
                                                                     "icon-text text-warning" : "icon-text text-default"
                                                             }>Haha</span>
                                                </span>
                                                <IonLabel>
                                                    <IonBadge color="primary">{res.vote.haha}</IonBadge>
                                                </IonLabel>
                                            </IonSegmentButton>
                                        </IonSegment>
                                    </IonCard>
                                )
                            })
                        }
                    </IonList>
                    <IonInfiniteScroll threshold="20px"
                                       ref={this.ionInfiniteScrollRef}
                                       onIonInfinite={(e) => this.loadMoreItems(e)}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Loading more data...">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                    <IonFab onClick={(e) => {
                        e.preventDefault();
                        this.onRedirect()
                    }} vertical="bottom" horizontal="end" slot="fixed">
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