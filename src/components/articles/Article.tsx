import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonText } from '@ionic/react';
import { IArticle } from '../../store/articles/types';

type Props = {
  dbName: string
  article: IArticle
  removeArticle: (dbName: string, article: IArticle) => void
}

export const Article: React.FC<Props> = ({ dbName, article, removeArticle }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const deleteArticle = React.useCallback(
    (dbName: string, article: IArticle) => dispatch(removeArticle(dbName,article)),
    [dispatch, removeArticle]
  )

  return (
    <IonItemSliding className="Article">
        <IonItem lines="inset">
            <IonLabel>
                <IonText>
                    <h3>{article.title}</h3>
                </IonText>
                <p>{article.body}</p>           
            </IonLabel>
            
        </IonItem>
        <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() => deleteArticle(dbName,article)}>
                Delete
            </IonItemOption>
        </IonItemOptions>
    </IonItemSliding>

  )
}
