import axios from 'axios';
import { USERS } from '../constants';

const { API_URL } = process.env;
export const get_users = () => async ( dispatch ) => {
  try {
    const { data, status } = await axios.get( `${ API_URL }admin/users/admin/all`)

    dispatch({ type: USERS.GET.ALL.SUCCESS, status, ...data })
  }
  catch( err ){
    const { response } = err,
          { data, status } = response;

    dispatch({ type: USERS.GET.ALL.FAILURE, status, ...data })
  }
}
export const get_user = ( id ) => async ( dispatch ) => {
  try {
    const { data, status } = await axios.get( `${ API_URL }admin/users/${ id }`)

    dispatch({ type: USERS.GET.ONE.SUCCESS, status, ...data })
  }
  catch( err ){
    const { response } = err,
          { data, status } = response;

    dispatch({ type: USERS.GET.ONE.FAILURE, status, ...data })
  }
}
