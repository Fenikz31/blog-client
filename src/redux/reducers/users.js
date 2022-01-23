import { USERS } from '../constants'

const initialState = {
  rows:[],
  loading: true
};

export default ( state = initialState, { result, type } ) => {  
  switch ( type ) {
    case USERS.GET.ALL.SUCCESS:
    case USERS.GET.ONE.SUCCESS:
      return {
        ...state,
        rows: result,
        loading: false
      }

    case USERS.GET.ALL.FAILURE:
    case USERS.GET.ONE.FAILURE:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
};