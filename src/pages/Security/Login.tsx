import React from "react";
import {
    IonAlert,
    IonButton,
    IonCard,
    IonCardContent, IonCardHeader,
    IonContent, IonFab, IonFabButton, IonIcon,
    IonLabel,
    IonPage,
    IonSpinner,
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
            isLoggedIn: true,
            email: '',
            password: '',
            _csrf_token: '',
            inputDisabled: false,
            alert: {
                isOpen: false,
                message: '',
            }
        };

        document.getElementsByTagName("ion-tab-bar")[0].style.display = 'none';
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

        this.setState({
            isLoggedIn: false,
            inputDisabled: true,
        });

        Axios.post(HTTP_BASE_URL + '/login/api', data).then(res => {
            if (res.data.status === 'success') {
                this.setStorage(res).then(() => {
                    this.props.history.push('/actualite');
                });

                this.setState({
                    isLoggedIn: true,
                });
            } else {
                this.setState({
                    alert: {
                        isShow: true,
                        message: 'Diso ny email na ny teny miafina !',
                    },
                    isLoggedIn: true,
                    inputDisabled: false,
                });
            }
        }).catch(e => {
            this.setState({
                alert: {
                    isShow: true,
                    message: 'Diso ny email na ny teny miafina !',
                },
                isLoggedIn: true,
                inputDisabled: false,
            });
        })
    };

    onRedirect() {
        this.props.history.push('/inscription');
    }

    async setStorage(res: any) {
        await Storage.set({
            key: 'user',
            value: JSON.stringify(res.data.user)
        });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <IonPage>
                <IonContent>
                    <Header/>
                    <IonAlert mode={"ios"}
                              buttons={['OK']}
                              onDidDismiss={() => this.setState({alert: {isShow: false}})}
                              header={this.state.alert.message}
                              isOpen={this.state.alert.isShow}/>
                    <IonCard style={{marginTop: "32%"}}>
                        <IonCardHeader>
                            <IonTitle color={"primary"} className={"text-center"}>Hiditra</IonTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className={"text-center"}>
                                <IonSpinner hidden={this.state.isLoggedIn} duration={1000} name="lines"
                                            color="tertiary"/>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.logIn()
                            }}>
                                <div className={"form-group mt-2 p-1"}>
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <input disabled={this.state.inputDisabled} type={"email"} name="email" required
                                           value={this.state.email}
                                           className={"form-control"}
                                           autoComplete={"username"}
                                           onChange={(e) => this.handleEmail(e)}/>
                                </div>
                                <div className={"form-group mt-2 p-1"}>
                                    <IonLabel position="stacked">Teny miafina</IonLabel>
                                    <input disabled={this.state.inputDisabled}
                                           type={"password"}
                                           autoComplete="current-password"
                                           required
                                           name="password"
                                           value={this.state.password}
                                           className={"form-control"}
                                           onChange={(e) => this.handlePassword(e)}/>
                                </div>
                                <IonButton color="primary" expand="block" type="submit">Hiditra</IonButton>
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
