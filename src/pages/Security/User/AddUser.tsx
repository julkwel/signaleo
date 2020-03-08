import React, {useState} from 'react';
import {
    IonPage,
    IonLabel,
    IonContent,
    IonCard,
    IonButton,
    IonAlert,
    IonTitle,
    IonCardTitle,
    IonCardContent,
    IonFabButton,
    IonIcon,
    IonFab,
    IonSelectOption,
    IonSelect,
    IonLoading
} from '@ionic/react';
import Header from '../../../components/Navigation/Header';
import Axios from 'axios';
import HTTP_BASE_URL from '../../../Constant/HttpConstant';
import {useHistory} from 'react-router';
import {arrowBack} from "ionicons/icons";

/**
 * User inscription
 *
 * @constructor
 */
const AddUser: React.FC = (props: any) => {
    const [id, setId] = useState('');
    const [user, setUser] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const history = useHistory();
    const [alert, setAlert] = useState({isOpen: false, message: ''});
    let userParams = props.history.location.state ? props.history.location.state.user : null;

    if (userParams && !user) {
        Axios.post(HTTP_BASE_URL + '/api/user/details/' + userParams).then(res => {
            setUser(res.data.user);

            setGender(res.data.user.gender);
            setId(res.data.user.id);
            setEmail(res.data.user.contact);
            setName(res.data.user.name)
        })
    }
    const submit = () => {
        if (password === passwordConfirmation) {
            setLoading(true);
            Axios.post(HTTP_BASE_URL + '/add/user/api', {
                id: id,
                name: name,
                email: email,
                password: password,
                gender: gender
            }).then((data) => {
                if ('success' === data.data.message && user){
                    setAlert({
                        isOpen: true,
                        message: 'Voaray ny fanovana'
                    });

                    history.push('/actualite');
                    setLoading(false)
                }else if ('success' === data.data.message) {
                    setAlert({
                        isOpen: true,
                        message: 'Voasoratra ny anaranao , ny login hidiranao dia : ' + email + ' !'
                    });

                    history.push('/login');
                    setLoading(false)
                } else {
                    setAlert({
                        isOpen: true,
                        message: 'Misy olana ny signaleo na efa nisy naka ny email : ' + email + ' !'
                    })
                }
            })
        } else {
            setAlert({
                isOpen: true,
                message: 'Tsy mifanaraka ny teny miafina sy ny fanamarinany voasoratra !'
            })
        }
    };

    const handleName = (e: any) => {
        return e.target.value;
    };

    const handleEmail = (e: any) => {
        return e.target.value;
    };

    const handlePassword = (e: any) => {
        return e.target.value;
    };

    const handlePasswordConfirmation = (e: any) => {
        return e.target.value;
    };

    const handleGender = (e: any) => {
        return e.target.value;
    };

    // OnDidDismiss set alert state to close, if we not check this event, alert can't show many times.
    return (
        <IonPage>
            <IonContent>
                <Header/>
                <IonAlert mode={"ios"} isOpen={alert.isOpen} message={alert.message}
                          onDidDismiss={() => setAlert({isOpen: false, message: ''})}/>
                <IonCard className="dark-orange">
                    <IonCardTitle>
                        <IonTitle color={"primary"}
                                  className={"text-center"}>{user ? 'Hanova ny mombamomba' : 'Hisoratra Anarana'}</IonTitle>
                    </IonCardTitle>
                    <IonCardContent>
                        <IonLoading
                            mode={"ios"}
                            isOpen={loading}
                            message={'Mahandrasa kely azafady ...'}
                        />
                        <form onSubmit={e => {
                            e.preventDefault();
                            submit()
                        }}>
                            <IonLabel position="stacked">Lahy ianao sa vavy</IonLabel>
                            <IonSelect placeholder={"..."} className={"form-control"} mode={"ios"}
                                       name="type"
                                       value={gender}
                                       onIonChange={(e) => setGender(handleGender(e))}>
                                <IonSelectOption value="Vavy">Vavy</IonSelectOption>
                                <IonSelectOption value="Lahy">Lahy</IonSelectOption>
                            </IonSelect>
                            <div className={"form-group mt-2 p-1"}>
                                <IonLabel position="stacked">Anarana</IonLabel>
                                <input type="text"
                                       required
                                       value={name}
                                       className={"form-control"}
                                       onChange={(e) => setName(handleName(e))}/>
                            </div>
                            <div className={"form-group mt-2 p-1"}>
                                <IonLabel position="stacked">Email</IonLabel>
                                <input type="text"
                                       required
                                       value={email}
                                       className={"form-control"}
                                       onChange={(e) => setEmail(handleEmail(e))}/>
                            </div>
                            <div className={"form-group mt-2 p-1"}>
                                <IonLabel position="stacked">Teny miafina</IonLabel>
                                <input type="password"
                                       required
                                       className={"form-control"}
                                       onChange={(e) => setPassword(handlePassword(e))}/>
                            </div>
                            <div className={"form-group mt-2 p-1"}>
                                <IonLabel position="stacked">Fanamafisana teny miafina</IonLabel>
                                <input type={"password"}
                                       name="password_confirmation"
                                       required
                                       className={"form-control"}
                                       onChange={(e) => setPasswordConfirmation(handlePasswordConfirmation(e))}/>
                            </div>
                            <IonButton color="primary" expand="full" type="submit">{user ? 'Hanova' : 'Hisoratra'}</IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>

                <IonFab
                    vertical="bottom"
                    onClick={() => {
                        user ? history.push('/actualite') : history.push('/login');
                    }}
                    horizontal="end" slot="fixed">
                    <IonFabButton>
                        <IonIcon icon={arrowBack}/>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
};

export default AddUser;