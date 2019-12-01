import $ from 'jquery';
// import firebase from 'firebase';
import utilities from '../../helpers/utilities';
import flightData from '../../helpers/data/flightData';
// import flightsCardBuilder from '../flightsCardBuilder/flightsCardBuilder';
import './flights.scss';

const displayFlights = () => {
  $('#flight-link').on('click', () => {
    $('#home').hide();
    $('#airports').hide();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
    $('#flights').show();
  });
};

const buildFlightCard = (flight) => {
  const domString = `
  <div class="col-4">
    <div class="card">
        <div class="card-body">
        <p class="card-text">Location: ${flight.flightOrigin}</p>
        <p class="card-text">Destination: ${flight.flightDestination}</p>
        <p class="card-text">Plane: ${flight.planeId}</p>
      </div>
    </div>
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
