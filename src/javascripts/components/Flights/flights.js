// import $ from 'jquery';
// import firebase from 'firebase';
import utilities from '../../helpers/utilities';
import flightData from '../../helpers/data/flightData';
// import flightsCardBuilder from '../flightsCardBuilder/flightsCardBuilder';
import './flights.scss';

const displayFlights = () => {
  $('#flight-link').on('click', () => {
    $('#flightModule').show();
    $('#home').hide();
    $('#crew').hide();
    $('#airports').hide();
    $('#planes').hide();
    $('#menu').hide();
    $('#food').hide();
  });
};

const buildFlightCard = (flight) => {
  let domString = '<h1 class="text-center">Flights</h1>';
    <div class="col-4">
      <div class="card">
        <p class="card-text">${flight.flightOrigin}<p>
        <p class="card-text">${flight.flightDestination}<p>
        <p class="card-text">${flight.planeId}<p>
      </div>
    `;

  return domString;
};

const printFlights = () => {
  flightData.getAllFlights()
    .then((flights) => {
      console.log(flights);
      let domString = '<h1 class="text-center header">Flight Portal</h1><div class="container"><div class="row">';

      flights.forEach((flight) => {
        domString += buildFlightCard(flight);
      });

      domString += '</div></div>';
      utilities.printToDom('flights', domString);
    })
    .catch((err) => console.error('Error getting flights', err));
};

export default { printFlights, displayFlights };
