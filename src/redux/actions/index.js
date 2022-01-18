import axios from 'axios';
import { ARTICLES, AUTH, TOGGLE } from '../constants';

const { API_URL } = process.env;

export const load_articles = () => (dispatch) => {
  axios.get( `${ API_URL }/articles` )
  .then(( res ) => {
    const articles = res.data
    dispatch({ type: ARTICLES.LOAD.SUCCESS, articles })
  })
  .catch(( err ) => dispatch({ type: ARTICLES.LOAD.FAILURE, reason: err }))
}

export const getUser = ( _id ) => {
  return axios.get( `${ API_URL }/users/${_id}` )
  .then(( res ) => res.data )
  .catch(( err ) => console.log( err ))
}

export const getProfile = ( _id ) => ( dispatch ) => {
  axios.get( `${ API_URL }/users/self/profile/${ _id }` )
  .then(( res ) => {
    const profile = res.data
    dispatch({ type: AUTH.SET.PROFILE.SUCCESS, profile })
  })
  .catch(( err ) => dispatch({ type: AUTH.SET.PROFILE.FAILURE, reason: err }))
}

export const getArticle = ( article_id ) => ( dispatch ) => {
  axios.get( `${ API_URL }/articles/${ article_id }` )
  .then(( res ) => {
    const article = res.data
    dispatch({ type: ARTICLES.VIEW.SUCCESS, article })
  })
  .catch(( err ) => dispatch({ type: ARTICLES.VIEW.FAILURE, reason: err }))
}

// article_id, author_id, comment
export const comment = ( article_id, author_id, comment ) => ( dispatch ) => {
  axios.post( `${ API_URL }/articles/${ article_id }?autho_id=${ author_id }`, { comment } )
  .then(( res ) => {
    const article = res.data
    dispatch({ type: ARTICLES.COMMENT.SUCCESS, article })
  })
  .catch(( err ) => dispatch({ type: ARTICLES.COMMENT.FAILURE, reason: err }))
}
//req.body.article_id
export const clap = ( article_id ) => ( dispatch ) => {
  axios.post( `${ API_URL }/articles/clap/${ article_id }` )
  .then(( res ) => dispatch({ type: ARTICLES.CLAP.SUCCESS }))
  .catch(( err ) => dispatch({ type: ARTICLES.CLAP.FAILURE, reason: err }))
}

//id, user_id
// export const follow = (id, user_id) =>  (dispatch) => {
//   axios.post( `${ API_URL }/user/follow` ,{ id, user_id })
//   .then(( res ) => dispatch({type:'FOLLOW_USER', user_id}))
//   .catch(( err )=>console.log(err))        
// }

export const login = ( user_data ) => ( dispatch ) => {
  axios.post( `${ API_URL }/auth/login`, user_data)
  .then(( res ) =>{
    const user = res.data
    // TODO: SQLite for react-native
    localStorage.setItem('Auth', JSON.stringify( user ))
    dispatch({ type: AUTH.SET.USER.SUCCESS, user })
  })
  .catch(( err ) => dispatch({ type: AUTH.SET.USER.FAILURE, user }))
}

export const toggleClose = () => ( dispatch ) => dispatch({ type: TOGGLE.MODAL.SUCCESS, modalMode: false })
export const toggleOpen = () => ( dispatch ) => dispatch({ type: TOGGLE.MODAL.SUCCESS, modalMode: true })
