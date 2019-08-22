import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import '../styles/style.css';
import { loadMatches } from '../actionCreators';
import store from '../store';

class FormMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
      date: Date.now(),
      modality: 'Futbol 5',
      public: false,
      price: '',
      place: '',
      latitude: '',
      longitude: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      date: date
    });
  }
 
  render() {
    return (      
      <Form className="container" onSubmit={this.handleSubmit}>
        {console.log('state', this.state)}
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="gameName">Nombre</Label>
              <Input type="text" name="gameName" id="gameName" placeholder="Nombre de la Pateada" value={this.state.gameName} onChange={this.handleInputChange}/>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="modality">Juego</Label>
              <Input type="select" name="modality" value={this.state.modality} id="modality" onChange={this.handleInputChange}>
                <option>Futbol 5</option>
                <option>Futbol 7</option>
                <option>Futbol 9</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="price">Precio</Label>
              <Input type="text" name="price" value={this.state.price} id="price" onChange={this.handleInputChange} placeholder="Ingresa el valor sin puntos ni comas">
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="date">Cuando?</Label>
          <DatePicker
            id="date"
            selected={this.state.date}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time" 
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="place">Lugar</Label>
              <Input type="text" name="place" id="place" placeholder="Nombre de la cancha" value={this.state.place} onChange={this.handleInputChange}/>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="Latitude">Latitud</Label>
              <Input type="text" name="latitude" id="Latitude" value={this.state.latitude} onChange={this.handleInputChange}/>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="longitude">Longitud</Label>
              <Input type="text" name="longitude" id="longitude" value={this.state.longitude} onChange={this.handleInputChange}/>
            </FormGroup>  
          </Col>
        </Row>
        <Row>
          <FormGroup check>
            <Label check>
              <Input value={this.state.public} type="checkbox" onChange={this.toggleMode}/>{' '}
              Pateada Pública
            </Label>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup>
          <div className=' btn btn-primary mx-4 my-4' onClick={() => this.handleSubmit(this.state)}> REGISTRO </div>
          </FormGroup>
        </Row>
      </Form>
    );
  }

  toggleMode = () => {
    this.setState({
      ...this.state,
      public: !this.state.public
    })

  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (user) => {
    console.log('para manejar en el fetch',JSON.stringify(this.state));
    fetch("http://localhost:3001/matches", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Todos los campos deben estar diligenciados, Intentalo nuevamente');
      } else {
        alert('Match creado');
        store.dispatch(loadMatches());
        this.props.history.push(`/`);
      }
    })
    .catch(error => console.log(error));      
  }
}

export default FormMatch;