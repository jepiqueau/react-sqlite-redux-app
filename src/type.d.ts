interface IArticle {
    id: number
    title: string
    body: string
  }
  
  type ArticleState = {
    articles: IArticle[]
    message: string
    dbname: string
  }
  
  type ArticleAction = {
    type: string
    article: IArticle
    articles: IArticle[]
    message: string
    dbname: string
  }
  
  type DispatchType = (args: ArticleAction) => ArticleAction
  