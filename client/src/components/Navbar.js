import React from 'react';
import store from '../store';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      islogged: false
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
                  <NavLink href="/newmatch/">Crea tu pateada!</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/profile/" active>Mi perfil</NavLink>
                </NavItem> 
                <NavItem>
                  <Button color="danger" onClick={this.handleSubmit} href="/">Cerrar sesión</Button>
                </NavItem>
              </React.Fragment> : <React.Fragment>
                <NavItem>
                  <NavLink href="/login/" active>Ingresa!</NavLink>
                </NavItem>
                <NavItem> 
                  <NavLink href="/register/" active>Registrarse</NavLink>
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
      type: 'TOGGLE_LOGIN'
    });
  };
}

export default NavigationBar;