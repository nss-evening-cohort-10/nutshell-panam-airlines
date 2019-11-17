import getAllAirports from '../../helpers/data/airportsData';
import utilities from '../../helpers/utilities';

const createAirportCard = () => {
  getAllAirports.getAirports()
    .then((airports) => {
      let domString = '';
      domString += '<div id="airports" class="d-flex flex-wrap">';
      airports.forEach((airport) => {
        domString += `
        <div class="card col-4" id="${airport.id}">
          <div class="card-header">
            <h2>${airport.name}</h2>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between">
              <img class="card-title">${airport.image}</img>
              <p class="card-text">${airport.location}</p>
            </div>
            <button class="btn btn-light" id="add-airport">Add</button>
            <button class="btn btn-light" id="edit-airport">Edit</button>
            <button class="btn btn-light" id="delete-airport">Delete</button>
          </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('airports', domString);
    })
    .catch((error) => console.error(error));
};

export default { createAirportCard };
