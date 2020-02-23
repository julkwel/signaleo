import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import './Actualite.css';
import Header from '../../components/Navigation/Header';
import { add } from 'ionicons/icons';
import Emboutaka from '../../images/emboutaka.png';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const Actualite: React.FC = () => {
  const [actu, setActu] = useState([]);

  useEffect(() => {
    Axios.post('http://localhost:8000/api/embouteka/list').then(res => {
      setActu(res.data.data);
    })
  }, []);

  const history = useHistory();

  const onRedirect = () => {
    history.push('/add');
  }

  return (
    <IonPage>
      <IonContent>
        <Header />
        {actu.map((res: any, item) => {
          return (
            <IonCard key={res.id} color={res.type === "accident" ? "danger" : "default"}>
              <img src={res.photo === '' ? Emboutaka : res.photo} alt="" />
              <IonCardHeader>
                <IonCardTitle>{res.lieu}</IonCardTitle>
                <IonCardSubtitle>{res.type}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>{res.message}</IonCardContent>
            </IonCard>
          )
        })}

        <IonFab vertical="center" onClick={(e) => { e.preventDefault(); onRedirect() }} horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Actualite;
