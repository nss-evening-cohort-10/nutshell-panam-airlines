import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import flightData from '../../helpers/data/flightData';
import flightsCardBuilder from '../flightsCardBuilder/flightsCardBuilder';
import './flights.scss';

const newFlightBuilder = () => {
  let domString = '<div class="container show-header text-center"><h1 class="header">Flights</h1>';
  const userSignedIn = firebase.auth().currentUser;
  if (userSignedIn != null) {
    // eslint-disable-next-line max-len
    domString += '<div class="col"><button type="button" id="add-new-flight" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style="margin-left: 10px; color: white;">Add New Flight</button></div>';
  }
  domString += '<div id="flight-cards" class="d-flex text-center">';
  flightData.getAllFlights()
    .then((flights) => {
      flights.forEach((flight) => {
        domString += flightsCardBuilder.singleFlightCard(flight);

        domString += '</div>';
      });
      // h1 close
      domString += '</div>';
      utilities.printToDom('flights', domString);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '#add-new-flight', newFlightDetails);
    })
    .catch((err) => console.error('Error getting flights', err));
};

const addNewFlight = (e) => {
  e.stopImmediatePropagation();
  const newFlight = {
    flightOrigin: $('#origin').val(),
    flightDestination: $('#destination').val(),
    planeId: $('#planeId').val(),
  };

  flightData.addNewFlight(newFlight)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      newFlightBuilder();
    })
    .catch((error) => console.error(error));
};

const newFlightDetails = (flight) => {
  let domString = '';
  domString += flightsCardBuilder.flightModal(flight);
  utilities.printToDom('exampleModal', domString);
  $('#submit').click(addNewFlight);
};

const displayFlights = () => {
  $('#flights-link').on('click', () => {
    $('#flights').removeClass('hide');
    $('#home').hide();
    $('#airports').hide();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
    newFlightBuilder();
  });
};

export default { newFlightBuilder, displayFlights };
