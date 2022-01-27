import axios from 'axios';
import { ARTICLES } from '../constants';

const { API_URL } = process.env;
export const load_articles = () => ( dispatch ) => {
  axios.get( `${ API_URL }blog/articles` )
  .then(( res ) => {
    const { data, status } = res
    dispatch({ type: ARTICLES.LOAD.SUCCESS, status, ...data })
  })
  .catch(( err ) => {
    const { data, status } = err.response
    dispatch({ type: ARTICLES.LOAD.FAILURE, status, ...data })
  })
}

export const publish_article = ( values ) => ( dispatch ) => {
  console.log( values )
  const data = new FormData()
  data.append( 'title', values.title )
  data.append( 'description', values.description )
  data.append( 'tags', values.tags )
  data.append( 'text', values.text )
  data.append( 'files', values.files )
  axios.post( `${ API_URL }blog/articles`,  data, { headers: {
    'x-access-token': values.token
  }} )
  .then(( res ) => {
    const { data, status } = res
    dispatch({ type: ARTICLES.PUBLISH.SUCCESS, status, ...data })
  })
  .catch(( err ) => {
    const { data, status } = err.response
    dispatch({ type: ARTICLES.PUBLISH.FAILURE, status, ...data })
  })
}

export const get_article = ( article_id ) => ( dispatch ) => {
  axios.get( `${ API_URL }blog/articles/${ article_id }` )
  .then(( res ) => {
    const { data, status } = res
    dispatch({ type: ARTICLES.VIEW.SUCCESS, status, ...data })
  })
  .catch(( err ) => {
    const { data, status } = err.response
    dispatch({ type: ARTICLES.VIEW.FAILURE, status, ...data })
  })
}

// article_id, author_id, comment
export const comment = ( article_id, author_id, comment ) => ( dispatch ) => {
  axios.post( `${ API_URL }blog/articles/${ article_id }?autho_id=${ author_id }`, { comment } )
  .then(( res ) => {
    const article = res.data
    dispatch({ type: ARTICLES.COMMENT.SUCCESS, article })
  })
  .catch(( err ) => dispatch({ type: ARTICLES.COMMENT.FAILURE, reason: err }))
}
//req.body.article_id
export const clap = ( article_id ) => ( dispatch ) => {
  axios.post( `${ API_URL }blog/articles/clap/${ article_id }` )
  .then(( res ) => dispatch({ type: ARTICLES.CLAP.SUCCESS }))
  .catch(( err ) => dispatch({ type: ARTICLES.CLAP.FAILURE, reason: err }))
}
