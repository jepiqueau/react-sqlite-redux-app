import React from "react"
import { IonCard, IonList, IonItem, IonButton, IonInput } from '@ionic/react';
import { ICategory } from '../../store/categories/types';

type Props = {
    saveCategory: (category: ICategory | any) => void
}

export const AddCategory: React.FC<Props> = ({ saveCategory }) => {
    const [category, setCategory] = React.useState<ICategory | {}>()
    const [kind, setKind] = React.useState<string>("");


    const handleCategoryData = (label: string, value: string) => {
        if (label === "kind") {
            setKind(value);
        }
        setCategory({
            ...category,
            [label]: value,
        })     
    }


    const addNewCategory = () => {
        saveCategory(category)
    }

  return (
      <IonCard>
        <IonList>
            <IonItem>
                <IonInput value={kind} placeholder="Enter Category Kind" onIonChange={e => handleCategoryData("kind",e.detail.value!)} clearInput></IonInput>
            </IonItem>
            <IonItem>
                <IonButton onClick={() => addNewCategory()} expand="block" shape="round">Add Category</IonButton>
            </IonItem>
        </IonList>
      </IonCard>
  )

}
