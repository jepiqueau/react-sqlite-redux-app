import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
         IonButtons, IonBackButton } from '@ionic/react';
import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Category } from "../components/categories/Category";
import { AddCategory } from "../components/categories/AddCategory";
import { initializeCategories, addCategory, removeCategory } from "../store/categories/actions";
import { ICategory } from "../store/categories/types";
import { ApplicationState } from '../store';
import { Dialog } from '@capacitor/dialog';


import './CategoriesPage.css';

const CategoriesPage: React.FC = () => {
    const [init, setInit] = React.useState<boolean>(false);
    const showAlert = async (message: string) => {
        await Dialog.alert({
          title: 'Error Dialog',
          message: message,
        });
    };
    const dbName: string  = useSelector(
      (state: ApplicationState) => state.categories.dbname
    );
    const categories: readonly ICategory[] = useSelector(
      (state: ApplicationState) => state.categories.categories,
      shallowEqual
    );
    const errMess: string = useSelector(
      (state: ApplicationState) => state.categories.message
    );
    const dispatch: Dispatch<any> = useDispatch();
  
    const initCategories = React.useCallback(
      async () => {
        dispatch( initializeCategories(dbName))
      },[dispatch, dbName]);
  
    React.useEffect( () => {
      if(!init) {
        console.log("before initCategories")
        console.log(`before errMess: ${errMess}`)  
        console.log(`before categories: ${categories}`)  
        console.log(`before dbName: ${dbName}`)  
        initCategories();
        console.log("after initCategories")
        console.log(`after errMess: ${errMess}`)  
        console.log(`after categories: ${categories}`)  
        console.log(`after dbName: ${dbName}`)  
        setInit(true);
      } 
      console.log(`errMess: ${errMess}`)  
      console.log(`categories: ${categories}`)  
      if(init && errMess.length > 0 ) {
        showAlert(errMess);
      }
    }, [init, errMess, initCategories, categories, dbName]);

    const saveCategory = React.useCallback(
        (category: ICategory) => {
          dispatch(addCategory(dbName, category))
        },[dispatch, dbName]);
     
    return (
        <IonPage className="Categories">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>My News Categories</IonTitle>
                </IonToolbar>
            </IonHeader>
            {init && <IonContent fullscreen>
              <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">My  News Categories</IonTitle>
                </IonToolbar>
              </IonHeader>
              <AddCategory saveCategory={saveCategory} /> 
              <br></br>
              <p>Slide category to left for accessing Delete</p> 
              {categories && categories.map((category: ICategory) => (
              <Category
                  key={category.id}
                  dbName={dbName}
                  category={category}
                  removeCategory={removeCategory}
              />
              ))}
            </IonContent>}
        </IonPage>
      );
    };
    
export default CategoriesPage;
    