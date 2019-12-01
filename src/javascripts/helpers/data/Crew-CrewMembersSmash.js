// import axios from 'axios';
// import apiKeys from '../apiKeys.json';
import crewMemberData from './crewMemberData';
import crewsData from './crewsData';
// const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCrewMemberNamesByCrewId = (crewId) => new Promise((resolve, reject) => {
  crewsData.getCrewById(crewId)
    .then((crew) => {
      console.log(crew);
      const crewWithMembers = crew;
      
      Object.keys(crew).forEach((crewMemberPosition) => {
        if (crewMemberPosition !== 'name') {
          crewMemberData.getCrewMemberById(crew[crewMemberPosition])
            .then((crewMem) => {
              console.log(crewMem);
              crewWithMembers.pilot1 = {pilot}
            });
        }
      });
      resolve(crewWithMembers);
      // const pilotOne = chosenCrew.pilot1.toString();
      // const pilotTwo = chosenCrew.pilot2.toString();
      // const flightAttendantOne = chosenCrew.fa1.toString();
      // const flightAttendantTwo = chosenCrew.fa2.toString();
      // const flightAttendantThree = chosenCrew.fa3.toString();
      // const airMarshal = chosenCrew.am1.toString();
      // const chosenCrewsMembers = [pilotOne, pilotTwo, flightAttendantOne, flightAttendantTwo, flightAttendantThree, airMarshal];
      // // console.log(chosenCrewsMembers);
      // const crewList = [];
      // chosenCrewsMembers.forEach((ccm) => {
      //   crewMemberData.getCrewMemberById(ccm)
      //     .then((crewMem) => {
      //       crewList.push(crewMem.name);
      //     });
      // });
      // resolve(crewList);
    })
    .catch((error) => reject(error));
});

export default { getCrewMemberNamesByCrewId };
