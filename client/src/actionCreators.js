import moment from 'moment';

const toggleLogin = () => {
  return {
    type: 'TOGGLE_LOGIN',
    islogged:true
  };
}

const loadUser = () => {
  return dispatch => {
    return fetch('http://localhost:3001/user', {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    }).then(response => response.json())
    .then(data => {
      console.warn('data user in the request', data);
      dispatch({
        type: 'SET_USER',
        payload: data
      })
    })    
  }
}

const loadMatches = () => {
  return dispatch => {
    return fetch('http://localhost:3001/matches')
    .then(response => response.json())
    .then(data => {
      data.forEach(m => {
        m.date = moment(m.date).format("lll");
      })
      dispatch({
        type: 'SET_MATCHES',
        payload: data
      });
    });
  }
}

const joinMatch = (id) => {
  return dispatch => {
    return fetch("http://localhost:3001/joinmatch", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({id: id})
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("data error",data.error);
      } else {
        data.forEach(m => {
          m.date = moment(m.date).format("lll");
        })
        dispatch({
          type: 'SET_MATCHES',
          payload: data
        });
      }
    })
    .catch(error => console.log(error)); 
  }
}

export {joinMatch, toggleLogin, loadUser, loadMatches }