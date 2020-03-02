import React from "react";
import {
    IonButton,
    IonCard,
    IonCardContent, IonCardHeader,
    IonContent, IonFab, IonFabButton, IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle
} from "@ionic/react";
import Header from "../../components/Navigation/Header";
import Axios from "axios";
import HTTP_BASE_URL from "../../Constant/HttpConstant";
import {Plugins} from "@capacitor/core";
import {personAddOutline} from "ionicons/icons";
import './Login.css'
const {Storage} = Plugins;

/**
 * Handle user login
 */
export default class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            _csrf_token: ''
        }
    }

    componentDidMount(): void {
        Axios.post(HTTP_BASE_URL + '/token/generate').then(res => {
            this.setState({
                _csrf_token: res.data.token
            })
        })
    }

    handleEmail = (e: any) => {
        this.setState({
            email: e.target.value
        })
    };

    handlePassword = (e: any) => {
        this.setState({
            password: e.target.value
        })
    };

    logIn = () => {
        let data = {
            email: this.state.email,
            password: this.state.password,
            _csrf_token: this.state._csrf_token,
            mobile: true
        };

        Axios.post(HTTP_BASE_URL + '/login/api', data).then(res => {
            if (res.data.status === 'success') {
                this.setStorage(res).then(() => {
                    this.props.history.push('/actualite');
                });
            }
        })
    };

    onRedirect() {
        this.props.history.push('/inscription');
    }

    async setStorage(res: any) {
        await Storage.set({
            key: 'user',
            value: res.data.user
        });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <IonContent>
                    <Header/>
                    <IonCard style={{marginTop: "32%"}}>
                        <IonCardHeader>
                            <IonTitle color={"primary"} className={"text-center"}>Hiditra</IonTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.logIn()
                            }}>
                                <IonItem>
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput type={"email"} name="lieu" required value={this.state.email}
                                              onIonChange={(e) => this.handleEmail(e)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Teny miafina</IonLabel>
                                    <IonInput type={"password"} required name="lieu" value={this.state.password}
                                              onIonChange={(e) => this.handlePassword(e)}/>
                                </IonItem>
                                <IonButton color="primary" expand="block" type="submit">Login</IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
                <IonFab vertical="bottom" onClick={(e) => {
                    e.preventDefault();
                    this.onRedirect()
                }} horizontal="end" slot="fixed">
                    <IonFabButton>
                        <IonIcon icon={personAddOutline}/>
                    </IonFabButton>
                </IonFab>
            </IonPage>
        );
    }
}