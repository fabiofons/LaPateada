import React from 'react';
import store from '../store';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      islogged: store.getState().islogged
    };

    store.subscribe(() => {
      this.setState({
        ...this.state,
        islogged: store.getState().islogged
      })
    });
  }

  render() {
    return (
      <Navbar dark className='bg-dark' expand="md">
        <div className='container'>
          <NavbarBrand href="/">La Pateada</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.state.islogged ? 
              <React.Fragment>
                <NavItem>
                  <NavLink className="nav-link active" to="/newmatch">Crea tu pateada!</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link active" to="/profile">Mi perfil</NavLink>
                </NavItem> 
                <NavItem>
                  <Button color="danger" onClick={this.handleSubmit}>Cerrar sesión</Button>
                </NavItem>
              </React.Fragment> : <React.Fragment>
                <NavItem>
                  <NavLink className="nav-link active" to="/login/">Ingresa</NavLink>
                </NavItem>
                <NavItem> 
                  <NavLink className="nav-link active" to="/register/">Regístrate</NavLink>
                </NavItem>               
              </React.Fragment>}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    store.dispatch({
      type: 'TOGGLE_LOGIN',
      islogged: false
    });
  };
}

export default NavigationBar;