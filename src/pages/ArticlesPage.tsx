import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonButtons, IonBackButton } from '@ionic/react';
import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Dispatch } from "redux"
import { Article } from "../components/articles/Article";
import { AddArticle } from "../components/articles/AddArticle";
import { initializeArticles, addArticle, removeArticle } from "../store/articles/actions";
import { ArticleState, IArticle } from "../store/articles/types";
import { ApplicationState } from '../store';
//import { Dialog } from '@capacitor/dialog';


import './ArticlesPage.css';

const ArticlesPage: React.FC = () => {
    const [init, setInit] = React.useState<boolean>(false);
    const showAlert = async (message: string) => {
/*        await Dialog.alert({
          title: 'Error Dialog',
          message: message,
        });
*/
    };

    const dbName: string  = useSelector(
        (state: ApplicationState) => state.articles.dbname
    );
    const articles: readonly IArticle[] = useSelector(
        (state: ApplicationState) => state.articles.articles,
        shallowEqual
    );
    const errMess: string = useSelector(
        (state: ApplicationState) => state.articles.message
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
        if(init && errMess.length > 0 ) {
            showAlert(errMess);
        }
    }, [init, errMess, initArticles, articles]); 

    const saveArticle = React.useCallback(
        (article: IArticle) => {
            dispatch(addArticle(dbName, article))
        },[dispatch, dbName]);
        
      
    return (
        <IonPage className="Articles">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>My Articles</IonTitle>
                </IonToolbar>
            </IonHeader>
            {init && <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                    <IonTitle size="large">My  News Categories</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <AddArticle saveArticle={saveArticle} />
                <br></br>
                <p>Slide article to left for accessing Delete</p>    
                {articles.map((article: IArticle) => (
                    <Article
                    key={article.id}
                    dbName={dbName}
                    article={article}
                    removeArticle={removeArticle}
                    />
                ))}
            </IonContent>}
        </IonPage>
    );
};

export default ArticlesPage;
