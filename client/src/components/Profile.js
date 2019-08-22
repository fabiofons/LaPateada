import React from 'react';
import {
  Navbar, NavbarToggler, Nav, NavItem, Button,
  Collapse, Row, Col, Progress, 
  Card, CardText, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import store from '../store';

const gray = {
  borderRight: '1px solid gray',
  padding: '20px'
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      matches: store.getState().matches,
      user: store.getState().user
    };
    
    store.subscribe(() => {
      this.setState({
        matches: store.getState().matches,
        user: store.getState().user
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar color="dark" dark expand="md">
            <div className='container'>
              <NavLink className="navbar-brand" to="/">La Pateada</NavLink>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Button color="danger" onClick={this.handleSubmit} href="/">Cerrar sesión</Button>

                  </NavItem>             
                </Nav>
              </Collapse>
            </div>          
          </Navbar>
        </div>
        <div className="container">
          <Row className="mt-5">
            <Col md="4" style={gray} className="p-3">
              {console.log('profile matches', this.state.matches)}
              <h1>{this.state.user.nickname}</h1>
              <h5>{this.state.user.email}</h5>
              <div>
                <h6>Nivel de Juego:</h6>
                <Progress className='my-2' color="success" value={this.state.user.level*100/5}>{this.state.user.level*100/10}%</Progress>
              </div>
              <div>
                <h6>Puntualidad:</h6>
                <Progress className='my-2' color="info" value={this.state.user.repute*100/5}>{this.state.user.repute*100/5}%</Progress>
              </div>
            </Col>
            <Col md="1">
            </Col>
            <Col md="7">
              {console.log('stage matches', this.state.matches)}
              <h1>Partidos:</h1>
              {this.state.user.matches !== [] ? this.state.matches.filter(games => games.players.includes(this.state.user.id)).map(m => {
                console.warn('m', m)
                return <React.Fragment>
                    <Col md="8">
                      <Card key={m.id} className='mt-2'>
                        <CardBody>
                          <CardTitle><h5>{m.gameName}</h5></CardTitle>
                          <CardSubtitle>{m.date}</CardSubtitle>
                          <CardText>
                            <b>{m.place}</b><br></br>
                            Recuerda estar 15 minutos antes del partido, eso asegura que el partido comience puntual.<br></br>
                            <b>Ten excelente Pateada</b>
                          </CardText>
                          <Button>Button</Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </React.Fragment>
                  
                }) : <h3>No te has unido a un partido aún!</h3> 
              }                
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.setState({
      isOpen: false,
      matches: store.getState().matches,
      user: store.getState().user
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    store.dispatch({
      type: 'TOGGLE_LOGIN',
      islogged: false
    });
    this.props.history.push(`/`);
  };
    
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}
export default Profile;
