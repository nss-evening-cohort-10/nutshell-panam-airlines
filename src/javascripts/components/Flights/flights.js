import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import flightData from '../../helpers/data/flightData';
import flightsCardBuilder from '../flightsCardBuilder/flightsCardBuilder';
import './flights.scss';

const displayFlights = () => {
  $('#flights-link').on('click', () => {
    $('#flights').removeClass('hide');
    $('#home').hide();
    $('#airports').hide();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
  });
};

const buildFlightCard = (flight) => {
  const domString = `
  <div class="col-12">
    <div class="card">
        <div class="card-body">
        <p class="card-text">Origin: ${flight.flightOrigin}</p>
        <p class="card-text">Destination: ${flight.flightDestination}</p>
        <p class="card-text">Plane: ${flight.planeId}</p>
      </div>
    </div>
  </div>
`;

  flightData.getFlight()
    .then((flights) => {
      flights.forEach((flight) => {
        domString += buildFlightCard.singleFlightCard(flight);
      });
      domString += '</div>';
      utilities.printToDom('flights', domString);
      // eslint-disable-next-line no-use-before-define
    })
    .catch((error) => console.error(error));

  return domString;
};

const printFlights = () => {
  const userSignedIn = firebase.auth().currentUser;
  flightData.getAllFlights()
    .then((flights) => {
      console.log(flights);
      let domString = '<div class="show-header text-center"><h1 class="header">Flights</h1>';
      if (userSignedIn) {
        // this is not printing
        domString += '<button class="btn btn-primary">Add New Flight</button>';
      }
      domString += '</div>';
      domString += '<div class="container"><div class="row">';
      flights.forEach((flight) => {
        buildFlightCard(flight);
        domString += flightsCardBuilder.singleFlightCard(flight);
      });

      domString += '</div>';
      console.log(domString);
      utilities.printToDom('flights', domString);
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

// const newFoodDetails = (food) => {
//   let domString = '';
//   domString += foodCardBuilder.foodModal(food);
//   utilities.printToDom('exampleModal', domString);
//   $('#submit').click(addNewFood);
// };



// const addNewFood = (e) => {
//   e.stopImmediatePropagation();
//   const newFood = {
//     name: $('#name').val(),
//     calsPerServing: $('#calsPerServing').val(),
//     imageURL: $('#imageURL').val(),
//     price: $('#price').val(),
//     menuCategory: $('#menuCategory').val(),
//   };
//   foodData.addNewFood(newFood)
//     .then(() => {
//       $('#exampleModal').modal('hide');
//       // eslint-disable-next-line no-use-before-define
//       createFoodCards();
//     })
//     .catch((error) => console.error(error));
// };

// const newFoodDetails = (food) => {
//   let domString = '';
//   domString += foodCardBuilder.foodModal(food);
//   utilities.printToDom('exampleModal', domString);
//   $('#submit').click(addNewFood);
// };

export default { printFlights, displayFlights };
