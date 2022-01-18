import { ARTICLES } from '../constants'

const initialState = {
  articles: [],
  article: {}
};

export default ( state = initialState, action ) => {
  const { article, articles, type } = action;
  
  switch ( type ) {
      case ARTICLES.LOAD.SUCCESS :
        return {
          ...state,
          articles
        }

      case ARTICLES.VIEW.SUCCESS:
        return {
          ...state,
          article
        }

      case ARTICLES.CLAP.SUCCESS:
        article = {
          ...state.article,
          claps: article.claps++
        }
        
        console.log(article)
        return {
          ...state,
          article
        }

      default:
        return state
  }
};
