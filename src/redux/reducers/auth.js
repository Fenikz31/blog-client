import { AUTH } from '../constants'

const initialState = {
  isAuth: false,
  profile: {}
};

export default ( state = initialState, action ) => {
  const { profile, type, result } = action;
  
  switch ( type ) {
    case AUTH.SET.USER.SUCCESS:
      return {
        ...state,
        isAuth: Object.keys( result ).length > 0 ? true : false,
        profile: result
      }

    case AUTH.FOLLOW.SUCCESS:
      user = {
        ...state.user
      }
      user.following.push(action.user_id)
      return {
        ...state,
        user
      }
    case AUTH.SET.PROFILE.SUCCESS:
      return {
        ...state,
        profile
      }

    default:
      return state;
  }
};