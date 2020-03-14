import React from "react";
import {
    IonAvatar,
    IonCard,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSelect,
    IonSelectOption
} from "@ionic/react";
import Header from "../../components/Navigation/Header";
import Axios from "axios";
import HTTP_BASE_URL from "../../Constant/HttpConstant";
import stationImage from '../../assets/stations.png';
import {FabButton} from "../../components/Navigation/FabButton";

export default class StationService extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            region: [],
            stations: []
        }
    }

    componentDidMount(): void {
        this.getRegion();
        this.getListStation();
    }

    getRegion() {
        Axios.post(HTTP_BASE_URL + '/api/station/list/region').then((res) => {
            console.log(res.data.data);
            if (res.status === 200) {
                this.setState({
                    region: res.data.data
                })
            }
        })
    }

    getListStation(region: any = null) {
        Axios.post(HTTP_BASE_URL + '/api/station/by-region', {region: region ? region : 'Analamanga'}).then((res) => {
            this.setState({
                stations: res.data.data
            });
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <Header/>
                <FabButton/>
                <IonContent>
                    <IonCard>
                        <IonSelect placeholder={"Analamanga "} mode={"ios"}
                                   onIonChange={(e: any) => this.getListStation(e.target.value)}>
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
                    <IonList>
                        {
                            this.state.stations.map((item: any, key: any) => {
                                return (
                                    <IonItem key={key} lines={"full"}>
                                        <IonAvatar>
                                            <img src={stationImage} alt="stations"/>
                                        </IonAvatar>
                                        <IonLabel>
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
                </IonContent>
            </IonPage>
        )
    }
}