import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';

class List extends React.Component {
 
  render() {
    return (
      <ListGroup className="my-3">
        {console.log('matches from props',this.props.state.matches)}
        <ListGroupItem key="header" active>
          <ListGroupItemHeading >Partidos</ListGroupItemHeading>
        </ListGroupItem>
        {this.props.state.matches.filter(m => m.public).map(m => {
          return <ListGroupItem id={m._id} key={m._id}>
            <ListGroupItemHeading key={m.gameName}>{m.gameName}</ListGroupItemHeading>
            <ListGroupItemText key={m.place} className="my-0">
              Lugar: {m.place}
            </ListGroupItemText>
            <ListGroupItemText key={m.modality} className="my-0">
              Modalidad: {m.modality}
            </ListGroupItemText>
            <ListGroupItemText key={m.date} className="my-0">
              Horario: {m.date}
            </ListGroupItemText>
            
            { 
              this.props.state.islogged && <React.Fragment>
                <ListGroupItemText key={m.price} className="my-0">
                  Precio/jugador: COP {
                    (() => { switch(m.modality) {
                      case 'Futbol 5':
                        return m.price/10;
                      case 'Futbol 7':
                        return m.price/14;
                      case 'Futbol 9':
                        return m.price/19;
                      default:
                        return null;
                    }
                  })()
                }
                </ListGroupItemText>
                <ListGroupItemText className='my-3'>
                  { 
                    m.players.includes(this.props.state.user.id) ? 
                    <Button color="success">Ya estas inscrito</Button> : 
                    <Button color="info" onClick={() => this.handleClick(m._id)}> Unirse a esta pateada </Button>
                  }
                </ListGroupItemText>
              </React.Fragment>
            }
          </ListGroupItem>
        })}
      </ListGroup>
    );
  }

  handleClick = (e) => {
    console.log('event handler',e)
    fetch("http://localhost:3001/joinmatch", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({id: e})
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('No se pudo unir a este partido');
      } else {
        if(data.ok){
          alert('Estas inscrito a este partido');
          this.render();
        }
      }
    })
    .catch(error => console.log(error));  
  }
}

export default List;