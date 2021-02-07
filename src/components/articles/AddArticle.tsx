import React from "react";
import { IonCard, IonList, IonItem, IonButton, IonInput } from '@ionic/react';
import { IArticle } from '../../store/articles/types';

type Props = {
    saveArticle: (article: IArticle | any) => void
}

export const AddArticle: React.FC<Props> = ({ saveArticle }) => {
    const [article, setArticle] = React.useState<IArticle | {}>();
    const [title, setTitle] = React.useState<string>("");
    const [body, setBody] = React.useState<string>("");


    const handleArticleData = (label: string, value: string) => {
        if (label === "title") {
            setTitle(value);
        }
        if (label === "body") {
            setBody(value);
        }
        setArticle({
            ...article,
            [label]: value,
        })     
}


    const addNewArticle = () => {
        saveArticle(article)
    }

  return (
      <IonCard>
        <IonList>
            <IonItem>
                <IonInput value={title} placeholder="Enter Title" onIonChange={e => handleArticleData("title",e.detail.value!)} clearInput></IonInput>
            </IonItem>
            <IonItem>
                <IonInput value={body} placeholder="Enter Body" onIonChange={e => handleArticleData("body",e.detail.value!)} clearInput></IonInput>
            </IonItem>
            <IonItem>
                <IonButton onClick={() => addNewArticle()} expand="block" shape="round">Add Article</IonButton>
            </IonItem>
        </IonList>
      </IonCard>
  )

}
