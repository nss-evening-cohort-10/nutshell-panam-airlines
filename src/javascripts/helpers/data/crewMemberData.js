import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllCrewMembers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew.json`)
    .then((response) => {
      const demCrews = response.data;
      const crews = [];
      Object.keys(demCrews).forEach((fbId) => {
        demCrews[fbId].id = fbId;
        crews.push(demCrews[fbId]);
      });
      resolve(crews);
    })
    .catch((error) => reject(error));
});

const getCrewMemberById = (crewMemberId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew/${crewMemberId}.json`)
    .then((response) => {
      const datCrewMember = response.data;
      datCrewMember.id = crewMemberId;
      resolve(datCrewMember);
    })
    .catch((error) => reject(error));
});

const removeCrewMember = (id) => axios.delete(`${baseUrl}/crew/${id}.json`);

const addNewMember = (crewMember) => axios.post(`${baseUrl}/crew.json`, crewMember);

const updateCrewMember = (crewMemberId, updatedCrewMember) => axios.put(crewMemberId, updatedCrewMember);

export default {
  getAllCrewMembers,
  removeCrewMember,
  addNewMember,
  updateCrewMember,
  getCrewMemberById,
};
