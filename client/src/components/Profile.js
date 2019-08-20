import React from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import store from '../store';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      matches: ""
    }

    store.subscribe(() => {
      this.setState({
        matches: store.getState().matches
      })
    })
  }

  render () {
    return (
      <React.Fragment>
        <div className='container'>
        {console.warn("state login: ",this.state)}
          { this.state.matches.length !== 0 && this.state.matches.map(m => {
            return (
              <Card>
                <CardBody>
                  <CardTitle>{m.gameName}</CardTitle>
                  <CardSubtitle>{m.date}</CardSubtitle>
                  <CardText></CardText>
                  <Button>Eliminar</Button>
                </CardBody>
              </Card>
            )}
          )}
        </div>        
      </React.Fragment>
    );
  };
}
  
export default Profile;
