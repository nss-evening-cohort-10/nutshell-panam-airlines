import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import flightData from '../../helpers/data/flightData';
import flightsCardBuilder from '../flightsCardBuilder/flightsCardBuilder';
import './flights.scss';

const buildFlightCard = (flight) => {
  const domString = `
  <div class="col-md-12 no-gutters">
    <div class="card">
        <div class="card-body">
        <p class="card-text">Origin: ${flight.flightOrigin}</p>
        <p class="card-text">Destination: ${flight.flightDestination}</p>
        <p class="card-text">Plane: ${flight.planeId}</p>
      </div>
    </div>
  </div>
`;

  return domString;
};

const newFlightBuilder = () => {
  let domString = '<div class="container show-header text-center"><h1 class="header">Flights</h1>';
  const userSignedIn = firebase.auth().currentUser;
  if (userSignedIn != null) {
    // this is not printing
    // eslint-disable-next-line max-len
    domString += '<div class="col"><button type="button" id="add-new-flight" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style="margin-left: 10px; color: white;">Add New Flight</button></div>';
  }
  domString += '<div id="flight-cards" class="d-flex text-center">';
  flightData.getAllFlights()
    .then((flights) => {
      // console.log(flights);
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
    flightOrigin: $('#flightOrigin').val(),
    flightDestination: $('#flightDestination').val(),
    planeId: $('#planeId').val(),

  };
  flightData.addNewFlight(newFlight)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildFlightCard();
    })
    .catch((error) => console.error(error));
};

const newFlightDetails = (flight) => {
  let domString = '';
  domString += buildFlightCard.flights(flight);
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
