import { USERS } from '../constants'

const initialState = {
  rows:[],
  message: '',
  reason: '',
  loading: true
};

export default ( state = initialState, { payload, type } ) => {  
  switch ( type ) {
    case USERS.GET.ALL.SUCCESS:
      return {
        ...state,
        message: payload.message,
        rows: payload.result,
        reason: '',
        loading: false
      }

    case USERS.GET.ONE.SUCCESS:
      return {
        ...state,
        message: payload.message,
        rows: payload.result,
        reason: '',
        loading: false
      }

    case USERS.GET.ALL.FAILURE:
    case USERS.GET.ONE.FAILURE:
      return {
        ...state,
        reason: '',
        loading: false
      }

    default:
      return state;
  }
};