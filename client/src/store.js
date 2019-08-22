import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  
  if(action.type === 'SET_MATCHES') {
    return {
      ...state,
      matches: action.payload
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
  return state;
} 

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export default createStore(reducer, { matches: [], islogged: false, user:"" }, applyMiddleware(logger, thunk));