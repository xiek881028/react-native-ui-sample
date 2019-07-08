// state

export default {
  HELPER_STORAGE(state = {}, action) {
    switch (action.type) {
      case 'helper_storage_add':
        return {
          action: action.type,
          data: {...state.data, [action.key]: action.data},
        };
      case 'helper_storage_del':
        let data = {...state};
        delete data[action.key];
        return {
          ...action,
          data,
        };
      default:
        return {
          action: 'helper_storage_get',
          data: state,
        };
    }
  },
};
