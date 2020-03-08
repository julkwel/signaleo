import React from "react";
import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol,
    IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonLabel,
    IonPage, IonRow,
    withIonLifeCycle
} from "@ionic/react";
import Header from "../../../components/Navigation/Header";
import Axios from "axios";
import HTTP_BASE_URL from "../../../Constant/HttpConstant";
import {Plugins} from "@capacitor/core";
import {pencil} from "ionicons/icons";
import avatarGirl from "../../../assets/avatar-girl.png";
import avatarMen from "../../../assets/avatar-men.png";
import avatar from "../../../assets/user-default.png";

const {Storage} = Plugins;

class Profile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: null,
            userData: null,
        }
    }

    async getObject() {
        const ret = await Storage.get({key: 'user'});
        const user = JSON.parse(ret && ret.value ? ret.value : '{"user":null}');

        if (user.id) {
            this.setState({
                user: user.id,
            });
        } else {
            this.props.history.push('/login');
        }
    }

    async getUserDetails() {
        await Axios.post(HTTP_BASE_URL + '/api/user/details/' + this.state.user).then(e => {
            this.setState({
                userData: e.data.user
            })
        }).catch(e => {
            console.log(e)
        })
    }

    handlePhoto(gender: string) {
        let img = avatar;
        if ('Lahy' === gender) {
            img = avatarMen;
        } else if ('Vavy' === gender) {
            img = avatarGirl;
        }

        return img;
    }

    ionViewWillEnter() {
        this.getObject().then(() => this.getUserDetails());
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        console.log(this.state.userData)
        return (
            <IonPage>
                <IonContent>
                    <Header/>
                    <IonCard mode={"ios"}>
                        <IonCardContent>
                            <IonRow>
                                <IonCol size={"3"}>
                                    <IonAvatar>
                                        <IonImg
                                            src={(this.state.userData && this.state.userData.gender) ? this.handlePhoto(this.state.userData.gender) : this.handlePhoto('People')}/>
                                    </IonAvatar>
                                </IonCol>
                                <IonCol size={"9"}>
                                    <IonCardSubtitle>{(this.state.userData && this.state.userData.pseudo) ? this.state.userData.pseudo : 'Signaleo'}</IonCardSubtitle>
                                    <IonCardTitle>{(this.state.userData && this.state.userData.name) ? this.state.userData.name : 'Signaleo'}</IonCardTitle>
                                </IonCol>
                            </IonRow>
                            <IonLabel>
                                {(this.state.userData && this.state.userData.contact) ? this.state.userData.contact : 'Signaleo'}
                            </IonLabel>
                        </IonCardContent>
                    </IonCard>
                    <IonFab vertical="bottom" onClick={(e) => {
                        e.preventDefault();
                        this.props.history.push('/inscription', {user: (this.state.userData && this.state.userData.id) ? this.state.userData.id : null})
                    }} horizontal="end" slot="fixed">
                        <IonFabButton>
                            <IonIcon icon={pencil}/>
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        )
    }
}

export default withIonLifeCycle(Profile);