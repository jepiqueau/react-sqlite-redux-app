import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { Article } from "../components/Article";
import { AddArticle } from "../components/AddArticle";
import { initializeArticles, addArticle, removeArticle } from "../store/actionCreators";
import { Dialog } from '@capacitor/dialog';


import './Home.css';

const Home: React.FC = () => {
  const [init, setInit] = React.useState<boolean>(false);
  const showAlert = async (message: string) => {
      await Dialog.alert({
        title: 'Error Dialog',
        message: message,
      });
  };
  const dbName: string  = useSelector(
    (state: ArticleState) => state.dbname
  );
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  );
  const errMess: string = useSelector(
    (state: ArticleState) => state.message
  );
  const dispatch: Dispatch<any> = useDispatch();

  const initArticles = React.useCallback(
    async () => {
      dispatch( initializeArticles(dbName))
    },[dispatch, dbName]);

  React.useEffect( () => {
    if(!init) {
      initArticles();
      setInit(true);
    }   
    if(errMess.length > 0 ) {
      showAlert(errMess);
    }
  }, [init, errMess, initArticles, articles]);   

  

  const saveArticle = React.useCallback(
    async (article: IArticle) => {
      dispatch(addArticle(dbName, article))
    },[dispatch, dbName]);

  const deleteArticle = React.useCallback(
    async (article: IArticle) => {
      dispatch(removeArticle(dbName, article))
    },[dispatch, dbName]);
  
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
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>My Articles</h1>
        {errMess.length === 0 && <AddArticle saveArticle={saveArticle} />}    
        {articles.map((article: IArticle) => (
          <Article
            key={article.id}
            article={article}
            removeArticle={deleteArticle}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
