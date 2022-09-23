import { ARTICLES, AUTH, TOGGLE, USERS } from '../constants';

const defaultState = {
  code: '',
  message: '',
  reason: '',
  status: ''
};

export default ( state = defaultState, { code, message, reason, status, type }) => {

  switch ( type ) {
    case ARTICLES.CLAP.FAILURE:
    case ARTICLES.COMMENT.FAILURE:
    case ARTICLES.LOAD.FAILURE:
    case ARTICLES.PUBLISH.FAILURE:
    case ARTICLES.SAVE.FAILURE:
    case ARTICLES.UNCLAP.FAILURE:
    case ARTICLES.VIEW.FAILURE:
    case AUTH.FOLLOW.FAILURE:
    case AUTH.LOGOUT.FAILURE:
    case AUTH.SET.USER.FAILURE:
    case AUTH.SIGNUP.FAILURE:
    case AUTH.VIEW.FAILURE:
    case USERS.GET.ALL.FAILURE:
    case USERS.GET.ONE.FAILURE:
    case TOGGLE.MODAL.FAILURE:
      return { code, message, reason, status }

    case ARTICLES.CLAP.SUCCESS:
    case ARTICLES.COMMENT.SUCCESS:
    case ARTICLES.LOAD.SUCCESS:
    case ARTICLES.PUBLISH.SUCCESS:
    case ARTICLES.SAVE.SUCCESS:
    case ARTICLES.UNCLAP.SUCCESS:
    case ARTICLES.VIEW.SUCCESS:
    case AUTH.LOGOUT.SUCCESS:
    // case AUTH.SET.USER.SUCCESS:
    case AUTH.SIGNUP.SUCCESS:
    case USERS.GET.ALL.SUCCESS:
    case USERS.GET.ONE.SUCCESS:
      return {
        code: '',
        message,
        reason: '',
        status
      }

    default:
      return state;
  }
};
