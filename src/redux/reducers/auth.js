import { AUTH } from '../constants'

const initialState = {
  user: {},
  isAuth: false,
  profile: {}
};

export default ( state = initialState, action ) => {
  const { profile, type, user } = action;
  
  switch ( type ) {
    case AUTH.SET.USER.SUCCESS:
      return {
        ...state,
        isAuth: Object.keys( user ).length > 0 ? true : false,
        user
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