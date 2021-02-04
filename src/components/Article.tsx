import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonText } from '@ionic/react';

type Props = {
  article: IArticle
  removeArticle: (article: IArticle) => void
}

export const Article: React.FC<Props> = ({ article, removeArticle }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deleteArticle = React.useCallback(
    (article: IArticle) => dispatch(removeArticle(article)),
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
            <IonItemOption color="danger" onClick={() => deleteArticle(article)}>
                Delete
            </IonItemOption>
        </IonItemOptions>
    </IonItemSliding>

  )
}
/*
    <div className="Article">
      <div>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </div>
      <button onClick={() => deleteArticle(article)}>Delete</button>
    </div>
*/