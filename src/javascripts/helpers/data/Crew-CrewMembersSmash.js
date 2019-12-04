// import axios from 'axios';
// import apiKeys from '../apiKeys.json';
import crewMemberData from './crewMemberData';
import crewsData from './crewsData';
// const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCrewMembersByCrewId = (crewId) => new Promise((resolve, reject) => {
  crewsData.getCrewById(crewId)
    .then((crew) => {
      crewMemberData.getAllCrewMembers()
        .then((crewMems) => {
          const crewWithMembers = crew;
          Object.keys(crew).forEach((crewMemberPosition) => {
            if (crewMemberPosition !== 'name') {
              const crewMem = crewMems.find((x) => x.id === crewWithMembers[crewMemberPosition]);
              crewWithMembers[crewMemberPosition] = crewMem;
            }
          });
          resolve(crewWithMembers);
        });
    })
    .catch((error) => reject(error));
});

const getAllCrewsWithMembers = () => new Promise((resolve, reject) => {
  crewsData.getAllCrews()
    .then((allTheCrews) => {
      console.log(allTheCrews);
      crewMemberData.getAllCrewMembers()
        .then((allCrewMems) => {
          const allMyCrews = [];
          allTheCrews.forEach((crew) => {
            const crewWithMembers = crew;
            Object.keys(crew).forEach((crewMemberPosition) => {
              if (crewMemberPosition !== 'name') {
                const crewMem = allCrewMems.find((x) => x.id === crew[crewMemberPosition]);
                crewWithMembers[crewMemberPosition] = crewMem;
                console.log(crewMem);
              }
            });
            allMyCrews.push(crewWithMembers);
          });
          resolve(allMyCrews);
        });
    })
    .catch((error) => reject(error));
});

export default { getCrewMembersByCrewId, getAllCrewsWithMembers };
