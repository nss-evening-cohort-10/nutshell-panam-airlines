import './airportsBuilder.scss';
import firebase from 'firebase';

const createAirportCard = (airports) => {
  const user = firebase.auth().currentUser;
  // airportsData.getAllAirports()
  //   .then((airports) => {
  let domString = '<h1 class="airports-title text-center">Airports</h1>';
  if (user != null) {
    domString += '<button type="button" class="add-button btn btn-outline-info ml-5"data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Airport</button>';
  }
  domString += '<div id="airports-section" class="d-flex flex-wrap text-center offset-2">';
  airports.forEach((airport) => {
    if (user != null) {
      domString += `
        <div id="${airport.id}" class="card airport-card" style="width: 18rem;">
          <img src="${airport.imageUrl}" class="card-img-top airport-image" alt="${airport.name}">
          <div class="card-body">
            <h5 class="card-title">${airport.name}</h5>
            <p class="card-text">${airport.location}</p>
            <button type="button" id="${airport.id}" class="edit-button btn btn-outline-warning">Edit</button>
            <button type="button" class="delete-button btn btn-outline-danger" id=${airport.id}>Delete</button>
          </div>
        </div>
        `;
    } else {
      domString += `
        <div id="${airport.id}" class="card airport-card" style="width: 18rem;">
          <img src="${airport.imageUrl}" class="card-img-top airport-image" alt="${airport.name}">
          <div class="card-body">
            <h5 class="card-title">${airport.name}</h5>
            <p class="card-text">${airport.location}</p>
          </div>
        </div>
        `;
    }
    domString += '</div>';
    // utilities.printToDom('airports', domString);
    // $('.delete-button').on('click', deleteAirport);
    // $('.add-button').on('click', newAirportInfo);
  });
  return domString;
};
const AirportModal = (airport) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Airport</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group>
            <label for="image" class="col-form-label">ImageUrl:</label>
            <input type="text" class="form-control" id="image" value="${airport.imageUrl ? airport.imageUrl : ''}">
          </div>
          <div class="form-group">
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="name" value="${airport.name ? airport.name : ''}"></input>
          </div>
          <div class="form-group">
            <label for="location" class="col-form-label">Location:</label>
            <input type="text" class="form-control" id="location" value="${airport.location ? airport.location : ''}"></input>
          </div>
          <div class="form-group">
            <label for="isInternational" class="col-form-label">International:</label>
            <input type="checkbox" id="isInternational" name="isInternational" value="true" checked>
          </div>
        </form>
      </div>
      <div class="modal-footer id="${airport.id}">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="${airport.id ? 'edit' : 'save'}" class="save" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>`;
  return domString;
};

export default { createAirportCard, AirportModal };
