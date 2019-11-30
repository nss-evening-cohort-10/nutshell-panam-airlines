import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllCrewMembers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crewMembers.json`)
    .then((response) => {
      const demCrewMembers = response.data;
      const crewMembers = [];
      Object.keys(demCrewMembers).forEach((fbId) => {
        demCrewMembers[fbId].id = fbId;
        crewMembers.push(demCrewMembers[fbId]);
      });
      resolve(crewMembers);
    })
    .catch((error) => reject(error));
});

const getCrewMemberById = (crewMemberId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crewMembers/${crewMemberId}.json`)
    .then((response) => {
      const datCrewMember = response.data;
      datCrewMember.id = crewMemberId;
      resolve(datCrewMember);
    })
    .catch((error) => reject(error));
});

const removeCrewMember = (id) => axios.delete(`${baseUrl}/crewMembers/${id}.json`);

const addNewMember = (crewMember) => axios.post(`${baseUrl}/crewMembers.json`, crewMember);

const updateCrewMember = (crewMemberId, updatedCrewMember) => axios.put(`${baseUrl}/crewMembers/${crewMemberId}.json`, updatedCrewMember);

export default {
  getAllCrewMembers,
  removeCrewMember,
  addNewMember,
  updateCrewMember,
  getCrewMemberById,
};
