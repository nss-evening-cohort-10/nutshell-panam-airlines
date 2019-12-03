import './flightsCardBuilder.scss';
import firebase from 'firebase';

const singleFlightCard = (flight) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `
          <div id="${flight.id}" class="card flightCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
             <button class="btn delete-button delete-flight"  id="${flight.id}" style="margin-right:0; margin-left: auto; width: 2em; color:#1c69b1; font-weight:bold;">X</button>
             <br>
             <h5 class="card-title" id="flight">${flight.flightOrigin}</h5>
              <p>${flight.flightDestination}</p>
              <p>${flight.planeId}</p>
              <button type="button" class="btn edit-flight" data-toggle="modal" data-target="#exampleModal" id="${flight.id}" style="background-color: #1c69b1; color: white;">Edit</button>
          </div>`;
  } else {
    domString += `
    <div id="${flight.id}" class="card flightCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
    <button class="btn delete-button delete-flight"  id="${flight.id}" style="margin-right:0; margin-left: auto; width: 2em; color:#1c69b1; font-weight:bold;">X</button>
    <br>
    <h5 class="card-title" id="flight">${flight.flightOrigin}</h5>
     <p>${flight.flightDestination}</p>
     <p>${flight.planeId}</p>
 </div>`;
  }
  return domString;
};

const flightModal = (flight) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <a class="navbar-brand d-flex" href="#">
            <img id="panam-logo" src="https://logodix.com/logo/1245241.png" alt="" style="max-width: 180px; align-items: left; justify-content: left;">
        </a>
        <h5 class="modal-title" id="exampleModalLabel" style="margin-top:34px; margin-right:180px; color: #1c69b1;">New Item</h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group>
            <label for="origin" class="col-form-label">Origin:</label>
            <input type="text" class="form-control" id="origin" value="${flight.flightOrigin ? flight.flightOrigin : ''}">
          </div>
          <div class="form-group">
            <label for="destination" class="col-form-label">Destination</label>
            <input type="text" class="form-control" id="destinatior" value="${flight.flightDestination ? flight.flightDestination : ''}"></input>
          </div>
          <div class="form-group">
            <label for="planeId" class="col-form-label">Plane Id</label>
            <input type="text" class="form-control" id="planeId" value="${flight.planeId ? flight.planeId : ''}"></input>
          </div>
      <div class="modal-footer text-center" id="${flight.id}">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="${flight.id ? 'update' : 'submit'}" class="btn" style="background-color: #1c69b1; color: white; font-weight: bold;">Submit</button>
      </div>
    </div>
  </div>`;
  return domString;
};


export default { singleFlightCard, flightModal };
