import React from "react";
import {IonFab, IonFabButton, IonFabList, IonIcon} from "@ionic/react";
import {callOutline, speedometerOutline, sunnyOutline} from "ionicons/icons";
import {useHistory} from "react-router";

export const FabButton: React.FC = () => {
    const history = useHistory();

    return (
        <IonFab horizontal="start" vertical="bottom" slot="fixed">
            <IonFabButton color={"danger"}>
                <IonIcon icon={sunnyOutline}/>
            </IonFabButton>
            <IonFabList side={"top"}>
                <IonFabButton onClick={() => history.push('/station')} color="danger">
                    <IonIcon icon={speedometerOutline}/>
                </IonFabButton>
                <IonFabButton onClick={() => history.push('/phone')} color="danger">
                    <IonIcon icon={callOutline}/>
                </IonFabButton>
            </IonFabList>
        </IonFab>
    )
}