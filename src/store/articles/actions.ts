import { sqlite } from '../../App';
import { SQLiteDBConnection} from 'react-sqlite-hook/dist';
import { createTableArticles } from '../../utils/testReduxUtils';
import { ArticlesActionTypes, ArticleAction, IArticle } from './types';
import { DispatchType } from '../../store';

export const initializeArticles = (dbName: string) => {
    const action: ArticleAction = {
      type: ArticlesActionTypes.INITIALIZE_ARTICLES,
      article: {} as IArticle,
      articles: [],
      message: "",
      dbname: dbName,
    }
    return sqliteRequest(action);
}

export const addArticle = (dbName: string, article: IArticle) => {
    const action: ArticleAction = {
      type: ArticlesActionTypes.ADD_ARTICLE,
      article,
      articles: [],
      message: "",
      dbname: dbName,
    }
  
    return sqliteRequest(action);
}
  
export const removeArticle = (dbName: string, article: IArticle) => {
    const action: ArticleAction = {
      type: ArticlesActionTypes.REMOVE_ARTICLE,
      article,
      articles: [],
      message: "",
      dbname: dbName,
    }
    return sqliteRequest(action);
}
export const sqliteRequest = (action: ArticleAction) => {
  return async (dispatch: DispatchType) => {
    let ret: any;
    console.log(`in sqliteRequest Article ${JSON.stringify(action)}`)
    switch (action.type) {
      case ArticlesActionTypes.INITIALIZE_ARTICLES:
        ret = await createConnectionRedux(action.dbname);
        if(Object.keys(ret).includes("errMess") && ret.errMess.length > 0) {
          action.message = ret.errMess;
        } else {
          action.articles = ret.articles;
        }
        return dispatch(action);
      case ArticlesActionTypes.ADD_ARTICLE:
        ret = await createArticle(action.dbname, action.article.title, action.article.body);
        if(Object.keys(ret).includes("errMess") && ret.errMess.length > 0) {
          action.message = ret.errMess;
        } else {
          action.article.id = ret.lastId;
        }   
        return dispatch(action); 
      case ArticlesActionTypes.REMOVE_ARTICLE:
        ret = await deleteArticle(action.dbname, action.article.id);
          if(Object.keys(ret).includes("errMess") && ret.errMess.length > 0) {
          action.message = ret.errMess;
        }   
        return dispatch(action); 
    }
  };
}

const createConnectionRedux = async (dbName: string): Promise<any>  => {
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
      let res: any = await db.execute(createTableArticles);
      if (res.changes.changes < 0) {
          ret.errMess = `Execute createTablesNoEncryption changes < 0`;
          return ret;
      }
      // get all articles if any
      res = await db.query("SELECT * FROM articles");
      ret.articles = res.values;
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


const createArticle = async (dbName: string, title: string, body: string): Promise<any> => {
  let ret: any = {};
  if(sqlite.isAvailable) {
    try {
      const db = await sqlite.retrieveConnection(dbName)
      const sqlcmd = "INSERT INTO articles (title,body) VALUES (?,?)";
      const values: Array<any>  = [title,body];
      const res: any = await db.run(sqlcmd,values);
      if(res.changes.changes !== 1 || res.changes.lastId < 0) {
        ret.errMess = "Error in inserting the article in db";
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
const deleteArticle = async (dbName: string, id: number): Promise<any> => {
  let ret: any = {};
  if(sqlite.isAvailable) {
    try {
      const db = await sqlite.retrieveConnection(dbName)
      const sqlcmd = "DELETE FROM articles WHERE id = ?;";
      const values: Array<any>  = [id];
      const res: any = await db.run(sqlcmd,values);
      console.log(`&&&in delete res ${JSON.stringify(res)}`)
      if(res.changes.changes !== 1) {
        ret.errMess = "Error in deleting the article in db";
        ret.changes = -1;
        return ret;
      } else {
        ret.errMess = "";
        ret.changes = res.changes.changes;
        ret.lastId = id;
        return ret;
      }
    } catch (err) {
      console.log(`&&& in catch Error ${err.message}`)
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
/* 
export const simulateHttpRequest = (action: ArticleAction, dbName: string) => {
    return (dispatch: (arg0: ArticleAction) => void) => {
      setTimeout(() => {
          console.log(`Going to dispatch ${dbName}`)
        dispatch(action)
      }, 500)
    }
}
*/