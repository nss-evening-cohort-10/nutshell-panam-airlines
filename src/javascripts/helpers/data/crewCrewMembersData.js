import axios from 'axios';
import apiKeys from '../apiKeys.json';
// import crewMemberData from './crewMemberData';
// import crewsData from './crewsData';
const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCrewValuesByCrewId = (crewId) => {
  axios.get(`${baseUrl}/crews/${crewId}.json`)
    .then((response) => {
      const datCrew = response.data;
      const deezCrewMems = [];
      const pilotOne = datCrew.pilot1;
      const pilotTwo = datCrew.pilot2;
      const flightAttendantOne = datCrew.fa1;
      const flightAttendantTwo = datCrew.fa2;
      const flightAttendantThree = datCrew.fa3;
      const airMarshal = datCrew.am1;
      deezCrewMems.push(pilotOne, pilotTwo, flightAttendantOne, flightAttendantTwo, flightAttendantThree, airMarshal);
      console.log(deezCrewMems);
      // crewMemberData.getAllCrewMembers()
      // .then((crewMembers) => {
      //   crewMembers.forEach((crewMember) => {
      //     if () {

      //     }
      //   }
      // )});
    });
};

export default { getCrewValuesByCrewId };
