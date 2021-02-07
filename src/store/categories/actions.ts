import { sqlite } from '../../App';
import { SQLiteDBConnection} from 'react-sqlite-hook/dist';
import { createTableNewsCategories } from '../../utils/testReduxUtils';
import { DispatchType } from '../../store';
import { CategoriesActionTypes, CategoryAction, ICategory } from './types';

export const initializeCategories = (dbName: string) => {
    const action: CategoryAction = {
      type: CategoriesActionTypes.INITIALIZE_NEWS_CATEGORY,
      category: {} as ICategory,
      categories: [],
      message: "",
      dbname: dbName,
    }
    return sqliteRequest(action);
}

export const addCategory = (dbName: string, category: ICategory) => {
    const action: CategoryAction = {
      type: CategoriesActionTypes.ADD_NEWS_CATEGORY,
      category,
      categories: [],
      message: "",
      dbname: dbName,
    }
  
    return sqliteRequest(action);
}
export const removeCategory = (dbName: string, category: ICategory) => {
    const action: CategoryAction = {
      type: CategoriesActionTypes.REMOVE_NEWS_CATEGORY,
      category,
      categories: [],
      message: "",
      dbname: dbName,
    }
    return sqliteRequest(action);
  }
  export const sqliteRequest = (action: CategoryAction) => {
      return async (dispatch: DispatchType) => {
        let ret: any;
      console.log(`in sqliteRequest Category ${JSON.stringify(action)}`)      
        switch (action.type) {
          case CategoriesActionTypes.INITIALIZE_NEWS_CATEGORY:
            ret = await createConnectionCategory(action.dbname);
            if(Object.keys(ret).includes("errMess") && ret.errMess.length > 0) {
              action.message = ret.errMess;
            } else {
              action.categories = ret.categories;
            }
            return dispatch(action);
          case CategoriesActionTypes.ADD_NEWS_CATEGORY:
            ret = await createCategory(action.dbname, action.category.kind);
            if(Object.keys(ret).includes("errMess") && ret.errMess.length > 0) {
              action.message = ret.errMess;
            } else {
              action.category.id = ret.lastId;
            }   
            return dispatch(action); 
          case CategoriesActionTypes.REMOVE_NEWS_CATEGORY:
              ret = await deleteCategory(action.dbname, action.category.id);
               if(Object.keys(ret).includes("errMess") && ret.errMess.length > 0) {
                action.message = ret.errMess;
              }   
              return dispatch(action); 
          }
      };
  }
  
  const createConnectionCategory = async (dbName: string): Promise<any>  => {
    let ret: any = {};
    if(sqlite.isAvailable) {
      try {
        const allConnections: Map<string, SQLiteDBConnection> = await sqlite.retrieveAllConnections();
        let db: SQLiteDBConnection;
        if( Array.from( allConnections.keys() ).includes(dbName)) {
          db = allConnections.get(dbName)!;
        } else {
          db = await (sqlite.createConnection(dbName));
        }
        await db.open();
        // Create tables if not exists
        let res: any = await db.execute(createTableNewsCategories);
        if (res.changes.changes < 0) {
            ret.errMess = `Execute createTableNewsCategories changes < 0`;
            return ret;
        }
        // get all categories if any
        res = await db.query("SELECT * FROM categories");
        ret.categories = res.values;
        ret.errMess = "";
        ret.db = db;
        return ret;
      } catch (err) {
        ret.errMess = `${err.message}`;
        return ret;
      }
    } else {
      const res = await sqlite.getPlatform()
      ret.errMess = `Not available for ${res.platform} platform`;
      return ret;
    }
  
  }
  
  const createCategory = async (dbName: string, kind: string): Promise<any> => {
    let ret: any = {};
    if(sqlite.isAvailable) {
      try {
        const db = await sqlite.retrieveConnection(dbName)
        const sqlcmd = "INSERT INTO categories (kind) VALUES (?)";
        const values: Array<any>  = [kind];
        const res: any = await db.run(sqlcmd,values);
        if(res.changes.changes !== 1 || res.changes.lastId < 0) {
          ret.errMess = "Error in inserting the category in db";
          ret.lastId = -1;
          return ret;
        } else {
          ret.errMess = "";
          ret.lastId = res.changes.lastId;
          return ret;
        }
      } catch (err) {
        ret.errMess = `${err.message}`;
        ret.lastId = -1;
        return ret;
      }
    } else {
      const res = await sqlite.getPlatform()
      ret.errMess = `Not available for ${res.platform} platform`;
      ret.lastId = -1;
      return ret;
    }
  }
  const deleteCategory = async (dbName: string, id: number): Promise<any> => {
    let ret: any = {};
    if(sqlite.isAvailable) {
      try {
        const db = await sqlite.retrieveConnection(dbName)
        const sqlcmd = "DELETE FROM categories WHERE id = ?;";
        const values: Array<any>  = [id];
        const res: any = await db.run(sqlcmd,values);
        if(res.changes.changes !== 1) {
          ret.errMess = "Error in deleting the category in db";
          ret.changes = -1;
          return ret;
        } else {
          ret.errMess = "";
          ret.changes = res.changes.changes;
          ret.lastId = id;
          return ret;
        }
      } catch (err) {
        ret.errMess = `${err.message}`;
        ret.changes = -1;
        return ret;
      }
    } else {
      const res = await sqlite.getPlatform()
      ret.errMess = `Not available for ${res.platform} platform`;
      ret.changes = -1;
      return ret;
    }
    
  
  }