import firebase from 'firebase';
import $ from 'jquery';
import './crew.scss';

import utilities from '../../helpers/utilities';
import crewData from '../../helpers/data/crewData';

const deleteCrewMember = (e) => {
  e.preventDefault();
  const { crewId } = e.target.id;
  crewData.removeCrewMember(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      createCrewCard(crewId);
    })
    .catch((error) => console.error(error));
};

const displayCrew = () => {
  $('#crew-link').on('click', () => {
    $('#crew').show();
    $('#airports').hide();
    $('#home').hide();
    $('#foodModule').hide();
    $('#planes').hide();
  });
};

const createCrewCard = () => {
  const user = firebase.auth().currentUser;
  crewData.getAllCrewMembers()
    .then((crews) => {
      let domString = '<h1 class="crew-heading">FLIGHT CREW</h1>';
      domString += '<div id="crew-section" class="d-flex flex-wrap text-center offset-2">';
      crews.forEach((crew) => {
        if (user !== null) {
          domString += `
          <div id="${crew.teamId}" class="card crew-card" style="width: 18rem;">
          <button type="button" class="close-crewCard d-flex justify-content-end" data-boardID="${crew.crewId}"  id="${crew.id}" aria-label="Close">x 
          </button>
            <img src="${crew.photo}" class="card-img-top crew-image" alt="${crew.name}">
            <div class="card-body">
              <h5 class="card-title">${crew.name}</h5>
              <p class="card-text">${crew.title}</p>
              <p class="card-text">${crew.bio}</p>
            </div>
            <div>
              <button class="btn btn-primary crew-delete">Update Employee</button>
            </div>
          </div>
          `;
        } else {
          domString += `
          <div id="${crew.teamId}" class="card crew-card" style="width: 18rem;">
            <img src="${crew.photo}" class="card-img-top crew-image" alt="${crew.name}">
            <div class="card-body">
              <h5 class="card-title">${crew.name}</h5>
              <p class="card-text">${crew.title}</p>
              <p class="card-text">${crew.bio}</p>
            </div>
          </div>
          `;
        }
      });
      domString += '</div>';
      utilities.printToDom('crew', domString);
      $('#crew').on('click', '.close-crewCard', deleteCrewMember);
    })
    .catch((error) => console.error(error));
};

export default { createCrewCard, displayCrew };
