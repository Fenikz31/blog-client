import { ARTICLES } from '../constants'

const initialState = {
  rows: [],
  article: {}
};

export default ( state = initialState, { result, type } ) => {
  
  switch ( type ) {
      case ARTICLES.LOAD.SUCCESS :
        return {
          ...state,
          rows: result,
          article: {}
        }

      case ARTICLES.VIEW.SUCCESS:
        return {
          ...state,
          article: result[ 0 ]
        }

      /* case ARTICLES.CLAP.SUCCESS:
        article = {
          ...state.article,
          claps: article.claps++
        }
        
        console.log(article)
        return {
          ...state,
          article
        } */

      default:
        return state
  }
};
