import { createStore } from 'redux';

const reducer = (state, action) => {
  
  if(action.type === 'SET_MATCHES') {
    return {
      ...state,
      matches: state.matches.concat(action.payload)
    };
  } else if(action.type === 'TOGGLE_LOGIN') {
    return {
      ...state,
      islogged: action.islogged
    }
  } else if(action.type === 'SET_USER') {
    console.warn('user: ',action.payload);
    return {
      ...state,
      user: action.payload
    }
  }
  console.warn(state);
  return state;
} 

export default createStore(reducer, { matches: [], islogged: false, user:"" });