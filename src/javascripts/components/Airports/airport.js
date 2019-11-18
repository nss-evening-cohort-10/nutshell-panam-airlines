import $ from 'jquery';
import './airport.scss';
import airportsData from '../../helpers/data/airportsData';
import utilities from '../../helpers/utilities';

const displayAirports = () => {
  $('#airports-link').on('click', () => {
    $('#home').hide();
    $('#airports').show();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#plane').hide();
  });
};

const hideAirports = () => {
  $('.non-crew').on('click', () => {
    $('#airports').hide();
  });
};

const createAirportCard = () => {
  airportsData.getAllAirports()
    .then((airports) => {
      let domString = '<h1 class="airports-title text-center">Airports</h1>';
      domString += '<div id="airports-section" class="d-flex flex-wrap text-center offset-2">';
      airports.forEach((airport) => {
        domString += `
        <div id="${airport.id}" class="card airport-card" style="width: 18rem;">
          <img src="${airport.imageUrl}" class="card-img-top airport-image" alt="${airport.name}">
          <div class="card-body">
            <h5 class="card-title">${airport.name}</h5>
            <p class="card-text">${airport.location}</p>
            <button type="button" class="hide add-button btn btn-outline-secondary">Add</button>
            <button type="button" class="hide edit-button btn btn-outline-warning">Edit</button>
            <button type="button" class="hide delete-button btn btn-outline-danger">Delete</button>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('airports', domString);
    })
    .catch((error) => console.error(error));
};

export default { createAirportCard, displayAirports, hideAirports };
