import React from 'react';
import {
    IonContent,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonChip,
    IonRefresherContent,
    IonRefresher,
    withIonLifeCycle,
    IonLoading,
    IonInfiniteScrollContent,
    IonInfiniteScroll
} from '@ionic/react';
import './Demande.css';
import Header from '../../components/Navigation/Header';
import {
    add,
    alarmOutline,
    ellipsisHorizontalOutline,
    location,
    phonePortraitOutline,
} from 'ionicons/icons';
import Axios from 'axios';
import HTTP_BASE_URL from '../../Constant/HttpConstant';
import img from "../../assets/covoiturage.png";
import {RefresherEventDetail} from "@ionic/core";
import {Plugins} from "@capacitor/core";
const {Storage} = Plugins;

/**
 * Manage onUserDemande
 */
class Demande extends React.Component<any, any> {
    ionInfiniteScrollRef: React.RefObject<HTMLIonInfiniteScrollElement>;

    constructor(props: any) {
        super(props);
        this.ionInfiniteScrollRef = React.createRef<HTMLIonInfiniteScrollElement>();

        this.state = {
            showLoading: true,
            zambaento: [],
            user: '',
            page: 0,
        };

        this.getData = this.getData.bind(this)
    }

    doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            this.getData();
            event.detail.complete();
        }, 2000);
    }

    onAddDemande = () => {
        this.props.history.push('/addDemande');
    };

    /**
     * Get data from server
     */
    getData = (page: any = 0) => {
        let form = new FormData();
        form.append('limit', page);

        Axios.post(HTTP_BASE_URL + '/api/zambaento/list', form).then((data) => {
            this.setState({
                zambaento: data.data.data
            });

            if (data.status === 200) {
                this.setState({
                    showLoading: false
                })
            }
        })
    };

    loadMoreItems(e: any) {
        this.getData(this.state.page + 10);

        (e.target as HTMLIonInfiniteScrollElement).complete().then(() => {
            this.setState({
                page: this.state.page + 10
            })
        });
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

    async ionViewWillEnter() {
        await this.getUser().then((res: any) => {
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
                    <IonLoading
                        mode={"ios"}
                        isOpen={this.state.showLoading}
                        message={'Mahandrasa kely azafady ...'}
                    />
                    {
                        this.state.zambaento.map((item: any) => {
                            return (
                                <IonItem key={item.id}>
                                    <img alt="profile" style={{width: "45px", height: "45px"}} src={img}/>
                                    <IonLabel>
                                        <h2>Mba ho
                                            ento {item.user.name.charAt(0).toUpperCase() + item.user.name.slice(1)}</h2>
                                        <IonChip color="primary">
                                            <IonIcon icon={location} color="primary"/>
                                            <IonLabel>{item.depart}</IonLabel>&nbsp;
                                            <IonIcon icon={ellipsisHorizontalOutline}/>&nbsp;
                                            <IonIcon icon={location} color="success"/>
                                            <IonLabel>{item.arrive}</IonLabel>
                                        </IonChip>
                                        <p>
                                            <IonChip color="warning">
                                                <IonIcon icon={alarmOutline} color="dark"/>
                                                <IonLabel>{item.dateDepart}</IonLabel>
                                            </IonChip>
                                        </p>
                                        <p>
                                            <IonChip color="warning">
                                                <IonIcon icon={phonePortraitOutline} color="dark"/>
                                                <IonLabel>{item.contact ? item.contact : 'Signaleo'}</IonLabel>
                                            </IonChip>
                                        </p>
                                    </IonLabel>
                                </IonItem>
                            )
                        })
                    }
                    <IonInfiniteScroll threshold="20px"
                                       ref={this.ionInfiniteScrollRef}
                                       onIonInfinite={(e) => this.loadMoreItems(e)}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Loading more data...">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                    <IonFab vertical="bottom" onClick={() => {
                        this.onAddDemande()
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
