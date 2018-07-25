const FETCHED = 'FETCHED';
// Action Creater
const actions = {
  getAllMenu: () => dispatch => {
    axios.get('/api/ajax/getTags').then(({ data }) => {
      dispatch({ type: FETCHED, payload: data.data });
    });
  },
};

// Reducer
const reducer = (state = { menus: [] }, action) => {
  switch (action.type) {
    case FETCHED:
      return {
        ...state,
        menus: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
export { actions };