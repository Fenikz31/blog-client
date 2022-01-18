import { ARTICLES, AUTH, TOGGLE } from '../constants';

const defaultState = {
  reason: ''
};

export default ( state = defaultState, action ) => {
  const { err, message, reason, type } = action;

  switch ( type ) {
    case ARTICLES.CLAP.FAILURE:
    case ARTICLES.COMMENT.FAILURE:
    case ARTICLES.LOAD.FAILURE:
    case ARTICLES.UNCLAP.FAILURE:
    case ARTICLES.VIEW.FAILURE:
    case AUTH.FOLLOW.FAILURE:
    case AUTH.SET.FAILURE:
    case AUTH.VIEW.FAILURE:
    case TOGGLE.MODAL.FAILURE:
      return {
        ...defaultState,
        reason: { err, message, reason, type }
      }

    default:
      return state;
  }
};
