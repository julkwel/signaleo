import React, {useEffect, useState} from "react";
import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonContent,
    IonItem,
    IonLabel, IonLoading,
    IonNote,
    IonPage
} from "@ionic/react";
import Header from "../../components/Navigation/Header";
import mada from '../../assets/madagasikara.png';
import world from '../../assets/world.png';

const CoronaVirus: React.FC = () => {
    const [status, setStatus] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const [worldStatus, setWorldStatus] = useState<any>([]);

    const getStatus = () => {
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=madagascar", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "6971f295e2mshbfe21de8eb8daebp1caec1jsn035d0fc36e9c"
            }
        })
            .then(response => {
                response.json().then(body => {
                    setStatus(body);
                    getWorldStatus();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getWorldStatus = () => {
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "6971f295e2mshbfe21de8eb8daebp1caec1jsn035d0fc36e9c"
            }
        })
            .then(response => {
                response.json().then((body: any) => {
                    setWorldStatus([body]);
                    setShowLoading(false);
                });
            })
            .catch(err => {
                console.log(err);
                setShowLoading(false);
            });
    };

    // eslint-disable-next-line
    useEffect(() => getStatus, []);

    return (
        <IonPage>
            <Header/>
            <IonContent>
                <IonLoading
                    mode={"ios"}
                    isOpen={showLoading}
                    message={'Mahandrasa kely azafady ...'}
                />
                <div className={"col-md-12"}>
                    {
                        status && status.latest_stat_by_country &&
                        status.latest_stat_by_country.length !== 0 ?
                            status.latest_stat_by_country.map((res: any, key: number) => {
                                return (
                                    <IonCard key={key}>
                                        <IonItem lines={"none"}>
                                            <IonAvatar slot="start">
                                                <img src={mada} alt={"mada"}/>
                                            </IonAvatar>
                                            <IonLabel>
                                                <h2>Madagasikara</h2>
                                                <h4 style={{fontSize: "12px"}}>{res.record_date}</h4>
                                            </IonLabel>
                                        </IonItem>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonLabel>Isan'ny voa</IonLabel>
                                                <IonNote slot="end" color="primary">{res.total_cases}</IonNote>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>Olona maty</IonLabel>
                                                <IonNote slot="end"
                                                         color="primary">{res.total_deaths ? res.total_deaths : 0}</IonNote>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>Tranga vaovao</IonLabel>
                                                <IonNote slot="end"
                                                         color="primary">{res.new_cases ? res.new_cases : 0}</IonNote>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>Olona voa ankehitriny</IonLabel>
                                                <IonNote slot="end" color="primary">{res.active_cases}</IonNote>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>Olona sitrana</IonLabel>
                                                <IonNote slot="end"
                                                         color="primary">{res.total_recovered ? res.total_recovered : 0}</IonNote>
                                            </IonItem>
                                        </IonCardContent>
                                    </IonCard>
                                )
                            }) : ''
                    }
                </div>
                <div className={"col-md-12"}>
                    {
                        worldStatus ? worldStatus.map((res: any, key: number) => {
                            return (
                                <IonCard key={key}>
                                    <IonItem lines={"none"}>
                                        <IonAvatar slot="start">
                                            <img src={world} alt={"mada"}/>
                                        </IonAvatar>
                                        <IonLabel>
                                            <h2>Manerantany</h2>
                                            <h4 style={{fontSize: "12px"}}>{res.statistic_taken_at}</h4>
                                        </IonLabel>
                                    </IonItem>
                                    <IonCardContent>
                                        <IonItem>
                                            <IonLabel>Isan'ny olona voa</IonLabel>
                                            <IonNote slot="end" color="primary">{res.total_cases}</IonNote>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Olona maty</IonLabel>
                                            <IonNote slot="end"
                                                     color="primary">{res.total_deaths ? res.total_deaths : 0}</IonNote>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Tranga vaovao</IonLabel>
                                            <IonNote slot="end"
                                                     color="primary">{res.new_cases ? res.new_cases : 0}</IonNote>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Olona sitrana</IonLabel>
                                            <IonNote slot="end" color="primary">{res.total_recovered}</IonNote>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            )
                        }) : ''
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}

export default CoronaVirus;
