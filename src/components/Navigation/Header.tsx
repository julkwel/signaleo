import React, {useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonActionSheet,
    IonIcon,
    IonButtons,
    useIonViewWillEnter,
    IonItem,
    IonPopover,
    IonLabel,
    IonBadge,
    IonAvatar,
} from '@ionic/react';
import {
    car, menu,
    notificationsCircle,
    notificationsCircleOutline,
} from 'ionicons/icons';
import './Header.css';
import {useHistory} from 'react-router';
import {Plugins} from "@capacitor/core";
import Axios from "axios";
import HTTP_BASE_URL from "../../Constant/HttpConstant";
import avatar from '../../assets/user-default.png';

const Header: React.FC = () => {
    const [alert, setAlert] = useState(false);
    const [urgence, setUrgence] = useState(false);
    const [user, setUser] = useState(false);
    const [userId, setUserId] = useState('');
    const history = useHistory();
    const {Storage} = Plugins;
    const [showPopover, setShowPopover] = useState(false);
    const [notifs, setNotifs] = useState([]);
    const [notifLength, setNotifLength] = useState();

    async function getUser() {
        const ret = await Storage.get({key: 'user'});
        const user = JSON.parse(ret && ret.value ? ret.value : '{"user":null}');

        if (user.id) {
            setUser(true);
            setUserId(user.id);
        }
    }

    const getNotifications = () => {
        Axios.post(HTTP_BASE_URL + '/api/user/notifications/' + userId).then((res) => {
            if (notifs.length !== res.data.notifs.length) {
                setNotifLength(res.data.notifs.length);
                setNotifs(res.data.notifs);
            }
        })
    };

    const showAllNotifications = () => {
        Axios.post(HTTP_BASE_URL + '/api/user/viewAll/notifications/' + userId).then();
    };

    useIonViewWillEnter(() => {
        getUser().then();
    });

    if (userId) {
        getNotifications();
    }

    return (
        <IonHeader>
            <IonToolbar color="primary">
                {
                    user ? (
                        <IonButtons slot="start">
                            <IonButton onClick={() => history.push('/')}>
                                <IonIcon icon={car} size={"large"}/>
                            </IonButton>
                        </IonButtons>
                    ) : ''
                }


                <IonTitle className="text-center font-weight-bold">SIGNALEO</IonTitle>
                {
                    user ? (
                        <>
                            <IonButtons slot="end" onClick={() => {
                                setShowPopover(true);
                            }}>
                                <IonIcon size="large" icon={notificationsCircleOutline}/>
                                {
                                    notifLength !== 0 ? <IonBadge color={"danger"}>{notifLength}</IonBadge> : ''
                                }
                                <IonPopover
                                    isOpen={showPopover}
                                    onDidDismiss={() => {
                                        setShowPopover(false);
                                        showAllNotifications();
                                    }
                                    }
                                >
                                    {
                                        notifs.length !== 0 ?
                                            notifs.map((item: any) => {
                                                return (
                                                    <IonItem key={item.id}>
                                                        <IonAvatar slot="start">
                                                            <img src={avatar} alt={"Avatar"}/>
                                                        </IonAvatar>
                                                        <IonLabel>
                                                            <p className={"ion-text-wrap"}>{item.title}</p>
                                                        </IonLabel>
                                                    </IonItem>
                                                )
                                            }) :
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={notificationsCircle} size={"large"}/>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <p className={"ion-text-wrap"}>Tsy manana fanairana vaovao
                                                        ianao!</p>
                                                </IonLabel>
                                            </IonItem>
                                    }
                                </IonPopover>
                            </IonButtons>
                            <IonButtons slot="end" onClick={() => setAlert(true)}>
                                <IonIcon icon={menu} size={"large"}/>
                            </IonButtons>
                        </>
                    ) : ''
                }
            </IonToolbar>

            {
                user ? (
                    <>
                        <IonActionSheet
                            isOpen={urgence}
                            onDidDismiss={() => setUrgence(false)}
                            mode={"ios"}
                            buttons={[
                                {
                                    text: 'Stations services',
                                    handler: () => {
                                        console.log('station')
                                    }
                                },
                                {
                                    text: 'Pharmacie',
                                    handler: () => {
                                        console.log('pharmacie')
                                    }
                                },
                                {
                                    text: 'Police',
                                    handler: () => {
                                        console.log('police')
                                    }
                                }
                            ]}
                        >
                        </IonActionSheet>

                        <IonActionSheet
                            isOpen={alert}
                            onDidDismiss={() => setAlert(false)}
                            mode={"ios"}
                            buttons={[
                                {
                                    text: 'Profile',
                                    handler: () => {
                                        history.push('/profile');
                                    }
                                },
                                {
                                    text: 'Signaleo',
                                    handler: () => {
                                        history.push('/apropos');
                                    }
                                },
                                {
                                    text: 'Hiala',
                                    handler: () => {
                                        Storage.remove({key: 'user'}).then(() => {
                                            history.push('/login');
                                        });

                                        window.location.reload();
                                    }
                                }
                            ]}
                        >
                        </IonActionSheet>
                    </>
                ) : ''
            }
        </IonHeader>
    )
}

export default Header;
