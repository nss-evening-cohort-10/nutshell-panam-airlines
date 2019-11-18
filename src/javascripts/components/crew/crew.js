import firebase from 'firebase';
import $ from 'jquery';
import './crew.scss';

import utilities from '../../helpers/utilities';
import crewData from '../../helpers/data/crewData';

const displayCrew = () => {
  $('#crew-link').on('click', () => {
    $('#crew').show();
  });
};

const hideCrew = () => {
  $('.non-crew').on('click', () => {
    $('#crew').hide();
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
            <button class="btn btn-success">Update Employee</button>
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
            <button class="btn btn-success">Update Employee</button>
          </div>
          `;
        }
      });
      domString += '</div>';
      utilities.printToDom('crew', domString);
    })
    .catch((error) => console.error(error));
};

export default { createCrewCard, displayCrew, hideCrew };
