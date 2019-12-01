// import axios from 'axios';
// import apiKeys from '../apiKeys.json';
import crewMemberData from './crewMemberData';
import crewsData from './crewsData';
// const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCrewValuesByCrewId = (crewId) => new Promise((resolve, reject) => {
  crewsData.getAllCrews()
    .then((crews) => {
      const chosenCrew = crews.find((x) => x.id === crewId);
      console.log(chosenCrew);
      const pilotOne = chosenCrew.pilot1.toString();
      const pilotTwo = chosenCrew.pilot2.toString();
      const flightAttendantOne = chosenCrew.fa1.toString();
      const flightAttendantTwo = chosenCrew.fa2.toString();
      const flightAttendantThree = chosenCrew.fa3.toString();
      const airMarshal = chosenCrew.am1.toString();
      const chosenCrewsMembers = [pilotOne, pilotTwo, flightAttendantOne, flightAttendantTwo, flightAttendantThree, airMarshal];
      console.log(chosenCrewsMembers);
      const crewList = [];
      chosenCrewsMembers.forEach((ccm) => {
        crewMemberData.getCrewMemberById(ccm)
          .then((crewMem) => {
            crewList.push(crewMem);
          });
      });
      resolve(crewList);
    })
    .catch((error) => reject(error));
});

// axios.get(`${baseUrl}/crews/${crewId}.json`)
//   .then((response) => {
//     const datCrew = response.data;
//     const deezCrewMems = [];
//     let allCrewMems = [];
//     let crewMemId = '';
//     const crewMemIds = [];
//     const matchingCrew = [];
//     const pilotOne = datCrew.pilot1;
//     const pilotTwo = datCrew.pilot2;
//     const flightAttendantOne = datCrew.fa1;
//     const flightAttendantTwo = datCrew.fa2;
//     const flightAttendantThree = datCrew.fa3;
//     const airMarshal = datCrew.am1;
//     deezCrewMems.push(pilotOne, pilotTwo, flightAttendantOne, flightAttendantTwo, flightAttendantThree, airMarshal);
//     deezCrewMems.forEach((crewMem) => {
//       crewMemId = crewMem.toString();
//       crewMemIds.push(crewMemId);
//       console.log(crewMemIds);
//     });
//     crewMemberData.getAllCrewMembers()
//       .then((allCrewMembers) => {
//         allCrewMems = allCrewMembers;
//         // console.log(allCrewMems);
//       });
//     allCrewMems.forEach((acM) => {
//       crewMemIds.for((cmid) => {
//         if (cmid === acM) {
//           matchingCrew.push(cmid);
//         }
//       });
//       console.log(matchingCrew);
//     });
// if (myCrewMem.toString() === aCrewMem.id) {
//   console.log(aCrewMem.id);
// }
// deezCrewMems.forEach((mem) => {
// console.log(deezCrewMems);
// const matchingCrewMembers = allCrewMems.some((r) => deezCrewMems.indexOf(r) >= 0);
// console.log(matchingCrewMembers);
// crewMemberData.getAllCrewMembers()
//   .then((crewMembers) => {
//     crewMembers.forEach((crewMember) => {
//       if (crewMember.id === aCrewMem.id) {
//         console.log(crewMember.id);
//       }
//       }
//     });
//   });
// const myBois = crewMembers.filter((x) => x.id === deezCrewMems[i].id);
// // if (deezCrewMems.filter(crewMember)) {
// //   crewMemNames.push(deezCrewMems.filter(crewMember));
// console.log(myCrewMems);
// console.log(myBois);

export default { getCrewValuesByCrewId };
