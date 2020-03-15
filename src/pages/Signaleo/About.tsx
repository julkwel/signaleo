import React from "react";
import {
    IonCard,
    IonCardTitle,
    IonContent,
    IonIcon,
    IonItem, IonLabel, IonList,
    IonPage
} from "@ionic/react";
import Header from "../../components/Navigation/Header";
import {logoGithub, phonePortraitOutline} from "ionicons/icons";

export class About extends React.Component<any, any> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <Header/>
                <IonContent>
                    <IonCard mode={"ios"}>
                        <IonCardTitle className={"text-center"}>SIGNALEO DIA :</IonCardTitle>
                        <IonList lines={"full"}>
                            <IonItem>
                                <IonLabel className={"ion-text-wrap"}>
                                    Application OpenSource natao hifampizarana ireo tranga samy hafa misy
                                    eny rehetra eny azo jerena ao amin'ny
                                    <a href="https://github.com/julkwel/signaleo"> Github </a> ny kaodiny.
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel className={"ion-text-wrap"}>
                                    Tsy tompon'andraikitra ny amin'ireo tranga na SARY izay zarain'ireo
                                    olona mampiasa azy.
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel className={"ion-text-wrap"}>
                                    Tsy mamoaka ary tsy hamoaka velively ny tahirin'olona (données
                                    d'utilisateur) ato anatiny.
                                </IonLabel>
                            </IonItem>
                        </IonList>
                        <IonLabel>
                            <p className={"pt-3 pr-2 text-right"}>© Signaleo</p>
                        </IonLabel>
                    </IonCard>
                    <IonCard mode={"ios"}>
                        <IonCardTitle className={"text-center"}>SERASERA</IonCardTitle>
                        <IonList lines={"full"}>
                            <IonItem>
                                <a href="mailto:julienrajerison5@gmail.com">&nbsp;&nbsp;julienrajerison5@gmail.com</a>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={phonePortraitOutline}/>
                                <a href="tel:+261 32 94 730 33">&nbsp;&nbsp;+261 32 94 730 33</a>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={logoGithub}/>
                                <a href="https://github.com/julkwel/signaleo">&nbsp;&nbsp;github/signaleo</a>
                            </IonItem>
                        </IonList>
                        <IonLabel>
                            <p className={"pt-3 pr-2 text-right"}>© Signaleo</p>
                        </IonLabel>
                    </IonCard>
                </IonContent>
            </IonPage>
        )
    }
}