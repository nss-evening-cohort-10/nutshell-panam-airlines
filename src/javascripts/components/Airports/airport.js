import $ from 'jquery';
import './airport.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import airportsData from '../../helpers/data/airportsData';
import utilities from '../../helpers/utilities';

const displayAirports = () => {
  $('#airports-link').on('click', () => {
    $('#home').hide();
    $('#airports').show();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#planes').hide();
  });
};

const deleteAirport = (e) => {
  e.preventDefault();
  const { airportId } = e.target.id;
  airportsData.removeAirport(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      createAirportCard(airportId);
    })
    .catch((error) => console.error(error));
};

const addAirport = (e) => {
  e.stopImmediatePropagation();
  const newAirport = {
    name: $('#name').val(),
    imageUrl: $('#image').val(),
    location: $('#location').val(),
  };
  airportsData.addAirport(newAirport)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createAirportCard();
    })
    .catch((error) => console.error(error));
};

const newAirportInfo = (airport) => {
  let domString = '';
  // eslint-disable-next-line no-use-before-define
  domString += createAirportCard.AirportModal(airport);
  utilities.printToDom('exampleModal', domString);
  $('#save-button').on('click', addAirport);
};

const createAirportCard = () => {
  const user = firebase.auth().currentUser;
  airportsData.getAllAirports()
    .then((airports) => {
      let domString = '<h1 class="airports-title text-center">Airports</h1>';
      if (user != null) {
        domString += '<button type="button" class="add-button btn btn-info">Add Airport</button>';
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
            <button type="button" class="edit-button btn btn-outline-warning">Edit</button>
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
      });
      domString += '</div>';
      utilities.printToDom('airports', domString);
      $('.delete-button').on('click', deleteAirport);
      $('.add-button').on('click', newAirportInfo);
    })
    .catch((error) => console.error(error));
};

export default { createAirportCard, displayAirports };
