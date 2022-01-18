import axios from 'axios';
import { USERS } from '../constants';

const { API_URL } = process.env;
export const get_users = () => async ( dispatch ) => {
  try {
    const response = await axios.get( `${ API_URL }admin/users/admin/all`)

    dispatch({ type: USERS.GET.ALL.SUCCESS, payload: { ...response.data }})
  }
  catch( err ){
    if ( err ) {
      dispatch({ type: USERS.GET.ALL.FAILURE, reason: err })
    }
  }
}