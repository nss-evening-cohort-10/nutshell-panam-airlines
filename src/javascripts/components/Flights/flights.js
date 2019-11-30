import flightData from '../../helpers/data/flightData';

const printFlights = () => {
  flightData.getAllFlights()
    .then((flights) => {
      console.log(flights);
    })
    .catch((err) => console.error('Error getting flights', err));
};

export default { printFlights };
