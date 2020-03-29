import React from 'react';
import {
    IonChip,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon, IonInfiniteScroll, IonInfiniteScrollContent,
    IonItem,
    IonLabel, IonLoading,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    withIonLifeCycle
} from '@ionic/react';
import './Offre.css';
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
import img from "../../assets/covoiturage.png";
import {RefresherEventDetail} from "@ionic/core";
const {Storage} = Plugins;

/**
 * Handle all offre data
 */
class Offre extends React.Component<any, any> {
    ionInfiniteScrollRef: React.RefObject<HTMLIonInfiniteScrollElement>;

    constructor(props: any) {
        super(props);
        this.ionInfiniteScrollRef = React.createRef<HTMLIonInfiniteScrollElement>();

        this.state = {
            listOffre: [],
            showLoading: true,
        };

        this.getData = this.getData.bind(this);
    }

    loadMoreItems(e: any) {
        this.getData(this.state.page + 10);

        (e.target as HTMLIonInfiniteScrollElement).complete().then(() => {
            this.setState({
                page: this.state.page + 10
            })
        });
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
        this.props.history.push('/addOffre');
    }

    getData(page: any = 0) {
        let form = new FormData();
        form.append('limit', page);

        Axios.post(HTTP_BASE_URL + '/api/offre/list', form).then(res => {
            this.setState({
                listOffre: res.data.message
            });

            if (res.status === 200) {
                this.setState({
                    showLoading: false,
                })
            }
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
                    <IonLoading
                        mode={"ios"}
                        isOpen={this.state.showLoading}
                        message={'Mahandrasa kely azafady ...'}
                    />
                    {
                        this.state.listOffre.map((item: any) => {
                            return (
                                <IonItem key={item.id}>
                                    <img alt="profile" style={{width: "45px", height: "45px"}} src={img}/>
                                    <IonLabel>
                                        <h2>{item.user}</h2>
                                        <IonChip color="primary">
                                            <IonIcon icon={location} color="primary"/>
                                            <IonLabel className={"ion-text-wrap"}>{item.depart}</IonLabel>&nbsp;
                                            <IonIcon icon={ellipsisHorizontalOutline}/>&nbsp;
                                            <IonIcon icon={location} color="success"/>
                                            <IonLabel className={"ion-text-wrap"}>{item.arrive}</IonLabel>
                                        </IonChip>
                                        <p>
                                            <IonChip color="warning">
                                                <IonIcon icon={alarmOutline} color="dark"/>
                                                <IonLabel>{item.dateDepart}</IonLabel>
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
                    <IonInfiniteScroll threshold="20px"
                                       ref={this.ionInfiniteScrollRef}
                                       onIonInfinite={(e) => this.loadMoreItems(e)}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Loading more data...">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>

                    <IonFab vertical="bottom" onClick={(e) => {
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

export default withIonLifeCycle(Offre);
