import React from "react";
import {
    IonAvatar,
    IonCard,
    IonContent, IonInfiniteScroll, IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonPage, IonSearchbar, IonSegment, IonSegmentButton,
    IonSelect,
    IonSelectOption
} from "@ionic/react";
import Header from "../../components/Navigation/Header";
import Axios from "axios";
import HTTP_BASE_URL from "../../Constant/HttpConstant";
import logoShell from '../../assets/logo/shell.png';
import logoGalana from '../../assets/logo/galana.jpg';
import logoJovenna from '../../assets/logo/jovenna.jpeg';
import logoTotal from '../../assets/logo/total.png';

class StationService extends React.Component<any, any> {
    ionInfiniteScrollRef: React.RefObject<HTMLIonInfiniteScrollElement>;

    constructor(props: any) {
        super(props);
        this.ionInfiniteScrollRef = React.createRef<HTMLIonInfiniteScrollElement>();

        this.state = {
            region: [],
            limit: 10,
            stations: [],
            search: '',
            regionSearch: 'Analamanga'
        }
    }

    componentDidMount(): void {
        this.getRegion();

        this.search()
    }

    loadMoreItems(e: any) {
        this.search(this.state.limit + 10);

        (e.target as HTMLIonInfiniteScrollElement).complete().then(() => {
            this.setState({
                limit: this.state.limit + 10
            })
        });
    }

    getRegion(limit: any = 10) {
        Axios.post(HTTP_BASE_URL + '/api/station/list/region', {limit: limit}).then((res) => {
            if (res.status === 200) {
                this.setState({
                    region: res.data.data
                })
            }
        })
    }

    search(limit: any = 10) {
        Axios.post(HTTP_BASE_URL + '/api/station/search/station', {
            search: this.state.search,
            limit: limit,
            region: this.state.regionSearch
        }).then((res) => {
            this.setState({
                stations: res.data.data
            });
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {history} = this.props;

        return (
            <IonPage>
                <Header/>
                <IonSegment value="all" scrollable={true}
                            onIonChange={(e) => {
                                if (e.detail.value === 'sos'){
                                    history.push('/phone');
                                }else {
                                    e.preventDefault();
                                }
                            }}>
                    <IonSegmentButton value="sos">SOS</IonSegmentButton>
                    <IonSegmentButton value="station">STATION</IonSegmentButton>
                </IonSegment>
                <IonSearchbar placeholder={"Hitady ..."} onIonChange={e => {
                    this.setState({
                        search: e.detail.value
                    });

                    this.search();
                }}/>
                <IonCard>
                    <IonSelect placeholder={"Analamanga "} mode={"ios"}
                               onIonChange={(e: any) => {
                                   this.setState({regionSearch: e.target.value});

                                   this.search();
                               }}>
                        {
                            this.state.region.map((item: any) => {
                                return (
                                    <IonSelectOption key={item.region}
                                                     value={item.region}>
                                        {item.region}
                                    </IonSelectOption>
                                )
                            })
                        }
                    </IonSelect>
                </IonCard>
                <IonContent>
                    <IonList>
                        {
                            this.state.stations.map((item: any, key: any) => {
                                return (
                                    <IonItem key={key} lines={"full"}>
                                        <IonAvatar>
                                            <img src={
                                                item.distributeur === "Vivo" ? logoShell :
                                                    item.distributeur === "Jovena" ? logoJovenna :
                                                        item.distributeur === "Galana" ? logoGalana :
                                                            logoTotal
                                            }
                                                 alt="stations"/>
                                        </IonAvatar>
                                        <IonLabel className={"station-label"}>
                                            <h2 className={
                                                item.distributeur === "Vivo" ? "text-warning" :
                                                    item.distributeur === "Jovena" ? "text-primary" :
                                                        item.distributeur === "Galana" ? "text-success" : "text-danger"
                                            }>{item.distributeur === 'Vivo' ? 'Shell' : item.distributeur}</h2>
                                            <h3>{item.name}</h3>
                                            <p>{item.localite}</p>
                                        </IonLabel>
                                    </IonItem>
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
                </IonContent>
            </IonPage>
        )
    }
}

export default StationService;
