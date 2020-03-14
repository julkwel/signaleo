import React from "react";
import Axios from "axios";
import HTTP_BASE_URL from "../../Constant/HttpConstant";
import {IonAvatar, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage} from "@ionic/react";
import {alertCircleOutline, magnetOutline, medkitOutline, radioOutline, walletOutline} from "ionicons/icons";
import Header from "../../components/Navigation/Header";
import {FabButton} from "../../components/Navigation/FabButton";

export default class PhoneUtils extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            phones: []
        }
    }

    componentDidMount(): void {
        this.getPhoneList();
    }

    getPhoneList() {
        Axios.post(HTTP_BASE_URL + '/api/numero/list').then(res => {
            this.setState({
                phones: res.data.data
            })
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <IonContent>
                    <Header/>
                    <FabButton/>
                    <IonList lines={"full"}>
                        {
                            this.state.phones.map((item: any, key: any) => {
                                return (
                                    <IonItem key={key} lines={"full"}>
                                        <IonAvatar>
                                            <IonIcon icon={
                                                item.type === 'Banque' ? walletOutline :
                                                    item.type === "SOS" ? radioOutline :
                                                        item.type === "Commissariat de police" ? alertCircleOutline :
                                                            item.type === 'Jirama' ? magnetOutline :
                                                                item.type === 'Services sanitaires' ? medkitOutline : ''
                                            }/>
                                        </IonAvatar>
                                        <IonLabel>
                                            <h2>{item.type}</h2>
                                            <h3 className={"ion-text-wrap"}>{item.name}</h3>
                                            <p className={"ion-text-wrap"}>{item.numero}</p>
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