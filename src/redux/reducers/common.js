import { TOGGLE } from '../constants';

const defaultState = {
  appName: '',
  modalMode: false
};

export default ( state = defaultState, action ) => {
  const { modalMode, type } = action;

  switch ( type ) {
    case TOGGLE.MODAL.SUCCESS:
    console.log(`toggling modal: ${ modalMode }`)
    return {
      ...defaultState,
      modalMode
    }

    default:
      return state;
  }
};
