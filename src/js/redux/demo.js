// state

export default {
  demo_index(state = {}, action) {
    switch (action.type) {
      case 'demo_index_up':
        return {
          action: action.type,
          data: state.index + 1,
        };
      case 'demo_index_down':
        return {
          action: action.type,
          data: state.index - 1,
        };
      case 'demo_index_init':
        return {
          action: action.type,
          data: 0,
        };
      default:
        return {
          action: action.type,
          data: state.index ? state.index : 0,
        };
    }
  },
};
