import $ from 'jquery';
import firebase from 'firebase';
import './airport.scss';
import airportsData from '../../helpers/data/airportsData';
import AirportsBuilder from '../AirportsBuilder/airportsBuilder';
import utilities from '../../helpers/utilities';

const displayAirports = () => {
  $('#airports-link').on('click', () => {
    $('#home').hide();
    $('#airports').show();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
  });
};

const deleteAirport = (e) => {
  e.preventDefault();
  const airportId = e.target.parentNode.id;
  airportsData.removeAirport(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildAirports(airportId);
    })
    .catch((error) => console.error(error));
};

const addAirport = (e) => {
  e.stopImmediatePropagation();
  const newAirport = {
    imageUrl: $('#image').val(),
    name: $('#name').val(),
    location: $('#location').val(),
    isInternational: $('#isInternational').prop('checked'),
  };
  airportsData.addNewAirport(newAirport)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAirports();
    })
    .catch((error) => console.error(error));
};

const newAirportInfo = (airport) => {
  let domString = '';
  // eslint-disable-next-line no-use-before-define
  domString += AirportsBuilder.AirportModal(airport);
  utilities.printToDom('exampleModal', domString);
  $('.save').on('click', addAirport);
};

const editAirportInfo = (e) => {
  e.stopImmediatePropagation();
  const airportid = e.target.parentNode.id;
  const updatedAirport = {
    imageUrl: $('#image').val(),
    name: $('#name').val(),
    location: $('#location').val(),
    isInternational: $('#isInternational').prop('checked'),
  };
  airportsData.updateAirport(airportid, updatedAirport)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAirports();
    })
    .catch((error) => console.error(error));
};

const updateAnAirport = (e) => {
  airportsData.getAirportById(e.target.id)
    .then((response) => {
      $('#exampleModal').modal('show');
      response.id = e.target.parentNode.id;
      newAirportInfo(response);
      $('.save').click(editAirportInfo);
    });
};

const buildAirports = () => {
  airportsData.getAllAirports()
    .then((airports) => {
      let domString = '<h1 class="airports-title text-center">Airports</h1>';
      const user = firebase.auth().currentUser;
      if (user != null) {
        // eslint-disable-next-line max-len
        domString += '<button type="button" class="add-button btn btn-outline-info ml-5"data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Airport</button>';
      }
      domString += '<div class="d-flex flex-wrap text-center">';
      // airports.forEach((airport) => {
      // eslint-disable-next-line no-use-before-define
      domString += AirportsBuilder.createAirportCard(airports);
      domString += '</div>';
      utilities.printToDom('airports', domString);
      $('.delete-button').on('click', deleteAirport);
      $('.add-button').on('click', newAirportInfo);
      $('#airports').on('click', '.edit-button', updateAnAirport);
    })
    .catch((error) => console.error(error));
};


export default { buildAirports, displayAirports };
