import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonButton, IonLabel } from '@ionic/react';
import React from "react";
import { useHistory } from "react-router-dom";


import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  return (
  <IonPage className="Home">
  <IonHeader>
  <IonToolbar>
    <IonTitle>Test Redux</IonTitle>
  </IonToolbar>
  </IonHeader>
  <IonContent fullscreen>
  <IonHeader collapse="condense">
    <IonToolbar>
      <IonTitle size="large">Test Redux</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonList>
    <IonItem>
      <IonButton onClick={e => {
        e.preventDefault();
        history.push('/newscategories')
        }}>
        <IonLabel>News Categories</IonLabel>
      </IonButton>
    </IonItem>
    <IonItem>
      <IonButton onClick={e => {
        e.preventDefault();
        history.push('/articles')
        }}>
        <IonLabel>Articles</IonLabel>
      </IonButton>
    </IonItem>
  </IonList>
  </IonContent>
  </IonPage>
  );
};

export default Home;
