import React from "react";
import {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonContent,
    IonIcon,
    IonItem,
    IonPage, IonText
} from "@ionic/react";
import Header from "../../components/Navigation/Header";
import {logoGithub, mail, phonePortraitOutline} from "ionicons/icons";

export class About extends React.Component<any, any> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <IonContent>
                    <Header/>
                    <IonCard mode={"ios"}>
                        <IonCardTitle className={"text-center"}>SIGNALEO</IonCardTitle>
                        <IonCardContent>
                            SIGNALEO DIA :
                            <ul>
                                <li>
                                    Signaleo dia application OpenSource natao hifampizarana ireo tranga samy hafa misy
                                    eny rehetra eny azonao jerena ao amin'ny
                                    <a href="https://github.com/julkwel/signaleo"> Github </a> ny kaodiny.
                                </li>
                                <li>
                                    <IonItem/>
                                    Ny Signaleo dia tsy tompon'andraikitra ny amin'ireo tranga na SARY izay zarain'ireo
                                    olona mampiasa azy.
                                </li>
                                <li>
                                    <IonItem/>
                                    Ny Signaleo dia tsy mamoaka ary tsy hamoaka velively ny tahirin'olona (données
                                    d'utilisateur) ato anatiny.
                                </li>
                            </ul>
                            SERASERA :
                            <ul>
                                <li>
                                    <IonIcon icon={mail}/>
                                    <a href="mailto:julienrajerison5@gmail.com">&nbsp;&nbsp;julienrajerison5@gmail.com</a>
                                </li>
                                <li>
                                    <IonIcon icon={phonePortraitOutline}/>
                                    <a href="tel:+261 32 94 730 33">&nbsp;&nbsp;+261 32 94 730 33</a>
                                </li>
                                <li>
                                    <IonIcon icon={logoGithub}/>
                                    <a href="https://github.com/julkwel/signaleo">&nbsp;&nbsp;Github</a>
                                </li>
                            </ul>
                            <IonText className={"text-right"}>© Signaleo</IonText>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
        )
    }
}