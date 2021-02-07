import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonText } from '@ionic/react';
import { ICategory } from '../../store/categories/types';

type Props = {
  dbName: string
  category: ICategory
  removeCategory: (dbName: string, category: ICategory) => void
}

export const Category: React.FC<Props> = ({ dbName, category, removeCategory }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deleteCategory = React.useCallback(
    (dbName: string, category: ICategory) => dispatch(removeCategory(dbName, category)),
    [dispatch, removeCategory]
  )

  return (
    <IonItemSliding className="Category">
        <IonItem lines="inset">
            <IonLabel>
                <IonText>
                    <h3>{category.kind}</h3>
                </IonText>
            </IonLabel>
            
        </IonItem>
        <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() => deleteCategory(dbName,category)}>
                Delete
            </IonItemOption>
        </IonItemOptions>
    </IonItemSliding>

  )
}
