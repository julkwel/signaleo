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
    IonAvatar, IonSearchbar, IonInput, IonCardContent, IonButton
} from '@ionic/react';
import './Actualite.css';
import {RefresherEventDetail} from '@ionic/core';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Header from '../../components/Navigation/Header';
import {
    add,
    car, chevronForwardCircleOutline,
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
import {Collapse} from "reactstrap";

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
            commentText: '',
            page: 0,
            user: null,
            showLoading: true,
            dropdownState: false,
            dropdownStateReply: false,
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

    getData = (page: any = 0, valsearch: any = '') => {
        let form = new FormData();
        form.append('limit', page);
        form.append('search', valsearch);
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
        }).catch(err => {
            console.log(err);
            this.setState({
                actu: [],
                alert: {
                    isShow: true,
                    message: 'Misy olana ny connexion anao ...! '
                }
            });

            this.setState({
                showLoading: false
            });
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

    deleteArticle = (id: any) => {
        confirmAlert({
            title: 'Hamafa',
            message: 'Tena hamafa tokoa ve ianao ?',
            buttons: [
                {
                    label: 'Eny',
                    onClick: () => {
                        Axios.post(HTTP_BASE_URL + '/api/actualite/delete/' + id + '/' + this.state.user.id).then((res) => {
                            this.getData();
                        })
                    }
                },
                {
                    label: 'Tsia',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        });
    };

    addComment = (actuId: any) => {
        let form = new FormData();
        form.append('comment', this.state.commentText);
        form.append('user', this.state.user ? this.state.user.id : this.state.user);
        Axios.post(HTTP_BASE_URL + '/api/comment/actu/add/' + actuId, form).then((res) => {
            this.setState({
                commentText: ''
            });
            this.getData();
        })
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <Header/>
                <IonContent fullscreen>
                    <IonSearchbar
                        placeholder={"Hitady ..."}
                        showCancelButton="focus"
                        cancelButtonText="Hamafa ..."
                        onIonChange={(e: any) => this.getData(this.state.page, e.detail.value)}/>
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
                        onDidDismiss={(e) => {
                            this.setState({alert: {isShow: false}})
                        }}
                        header={this.state.alert.message}
                        buttons={['OK']}
                    />
                    <IonList>
                        {
                            this.state.actu && Array.isArray(this.state.actu) && this.state.actu.map((res: any) => {
                                let comments: any = [];
                                res.comments.map((item: any, key: any) => {
                                    let responses: any = [];
                                    item.responses.map((response: any, keyRes: any) => {
                                        return responses.push(
                                            <IonItem lines={"none"}
                                                     style={{paddingBottom: "10px"}}
                                                     key={keyRes}>
                                                <div
                                                    className="comment-content d-block w-100">
                                                    <div
                                                        className="parent-comment d-flex">
                                                        <IonAvatar slot="start">
                                                            <img alt={"user-profile"}
                                                                 style={{width: "30px", height: "30px"}}
                                                                 src={response.user.gender === 'Lahy' ? avatarMen : avatarGirl}/>
                                                        </IonAvatar>
                                                        <IonLabel className={"ml-1"}>
                                                            <h3>{response.user.name}</h3>
                                                            <h6 style={{fontSize: "10px"}}>{response.date}</h6>
                                                            <p style={{fontSize: "12px"}}
                                                               className={"ion-text-wrap"}>{response.comment}</p>
                                                        </IonLabel>
                                                    </div>
                                                </div>
                                            </IonItem>
                                        )
                                    });

                                    return comments.push(
                                        <IonItem lines={"none"} style={{paddingBottom: "10px"}} key={key}>
                                            <div className="comment-content d-block w-100">
                                                <div className="parent-comment d-flex pb-2">
                                                    <IonAvatar slot="start">
                                                        <img alt={"user"}
                                                             style={{width: "30px", height: "30px"}}
                                                             src={item.user.gender === 'Lahy' ? avatarMen : avatarGirl}/>
                                                    </IonAvatar>
                                                    <IonLabel className={"ml-1 comment-content-comment"}>
                                                        <h3>{item.user.name}</h3>
                                                        <h6 style={{fontSize: "10px"}}>{item.date}</h6>
                                                        <p style={{fontSize: "12px"}}
                                                           className={"ion-text-wrap"}>{item.comment}</p>
                                                    </IonLabel>
                                                </div>
                                                <div className="comment-reply" style={{padding: "0 10% 0 10%"}}>
                                                    {
                                                        responses.length > 2 ? (
                                                                <div className={"col-md-12"}>
                                                                    <button
                                                                        type={"button"}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            this.setState({dropdownStateReply: !this.state.dropdownStateReply})
                                                                        }}
                                                                        style={{
                                                                            padding: '1rem',
                                                                            textAlign: "center",
                                                                            display: "block",
                                                                            width: "100%",
                                                                            background: "transparent",
                                                                            color: "blue"
                                                                        }}
                                                                    >
                                                                        {this.state.dropdownStateReply ? 'Hanafina' : 'Hijery'} ny
                                                                        navalin'ny olona
                                                                        an'i {item.user.name} {responses.length} +
                                                                    </button>
                                                                    <Collapse style={{marginTop: "1rem"}}
                                                                              isOpen={this.state.dropdownStateReply}>
                                                                        {responses}
                                                                    </Collapse>
                                                                </div>
                                                            ) :
                                                            responses
                                                    }
                                                    <div className="d-flex">
                                                        <IonInput className={"comment-input"}
                                                                  defaultValue={this.state.commentText}
                                                                  onIonChange={(e: any) => {
                                                                      this.setState({
                                                                          commentText: e.target.value
                                                                      });
                                                                  }} mode={"md"}
                                                                  type={"text"}
                                                                  style={{fontSize: "12px"}}
                                                                  placeholder={"hamaly an'i " + item.user.name + "..."}/>
                                                        <IonButton onClick={() => this.addComment(res.id)}
                                                                   color="light"
                                                                   className={"comment-button"}
                                                                   fill={"clear"}
                                                                   size={"small"}>
                                                            <IonIcon style={{
                                                                fontSize: "25px",
                                                                border: "none",
                                                                color: "black"
                                                            }}
                                                                     icon={chevronForwardCircleOutline}/>
                                                        </IonButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </IonItem>)
                                });

                                return (
                                    <IonCard className={"actualite-card"} mode={"ios"} key={res.id}>
                                        <IonItem mode={"ios"} lines={"none"}>
                                            <IonLabel>
                                                <IonRow>
                                                    <IonCol size={"3"}>
                                                        <IonAvatar>
                                                            <IonImg alt={"Signaleo"}
                                                                    src={(res.user.gender !== 'Vavy' && res.user.gender === 'Lahy') ?
                                                                        (res.user.gender === 'Vavy' ? avatarGirl : avatarMen) :
                                                                        avatar}
                                                            />
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
                                                    className={res.photo ? "ion-text-wrap" : "ion-text-wrap just-text"}>
                                                    {res.message.charAt(0).toUpperCase() + res.message.slice(1)}
                                                </IonLabel>
                                            </IonLabel>
                                        </IonItem>
                                        {
                                            res.photo ? <IonImg src={res.photo}/> : ''
                                        }
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
                                        <IonCardContent>
                                            <div className="d-flex">
                                                <IonInput className={"comment-input"}
                                                          defaultValue={this.state.commentText}
                                                          onIonChange={(e: any) => {
                                                              this.setState({
                                                                  commentText: e.target.value
                                                              });
                                                          }}
                                                          style={{fontSize: "12px"}}
                                                          mode={"md"}
                                                          type={"text"}
                                                          placeholder={"Ny hevitrao ..."}/>
                                                <IonButton onClick={() => this.addComment(res.id)} color="light"
                                                           className={"comment-button"} fill={"clear"}
                                                           size={"small"}>
                                                    <IonIcon style={{fontSize: "25px", border: "none", color: "black"}}
                                                             icon={chevronForwardCircleOutline}/>
                                                </IonButton>
                                            </div>
                                        </IonCardContent>
                                        {
                                            comments.length > 1 ?
                                                (
                                                    <div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                this.setState({dropdownState: !this.state.dropdownState})
                                                            }}
                                                            style={{
                                                                padding: '1rem',
                                                                textAlign: "center",
                                                                display: "block",
                                                                width: "100%",
                                                                background: "transparent",
                                                                color: "blue"
                                                            }}>
                                                            {this.state.dropdownState ? 'Hanafina' : 'Hijery'} ny
                                                            hevitrin'ny olona {comments.length} +
                                                        </button>
                                                        <Collapse style={{marginTop: "1rem"}}
                                                                  isOpen={this.state.dropdownState}>
                                                            {comments}
                                                        </Collapse>
                                                    </div>
                                                ) :
                                                comments
                                        }
                                    </IonCard>
                                )
                            })
                        }
                    </IonList>
                    <IonInfiniteScroll threshold="100px"
                                       ref={this.ionInfiniteScrollRef}
                                       onIonInfinite={(e) => this.loadMoreItems(e)}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Mahandrasa kely azafady...">
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
