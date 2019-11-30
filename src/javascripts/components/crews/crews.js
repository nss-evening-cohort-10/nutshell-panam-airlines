import firebase from 'firebase';
import $ from 'jquery';
import './crews.scss';

import utilities from '../../helpers/utilities';
import crewsData from '../../helpers/data/crewsData';

const displayCrews = () => {
  $('#crews-link').on('click', () => {
    $('#crews').show();
    $('#crewMembers').hide();
    $('#airports').hide();
    $('#home').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
  });
};

const printCrewCards = () => {
  const user = firebase.auth().currentUser;
  crewsData.getAllCrews()
    .then((crews) => {
      let domString = '<h1 class="crew-heading">FLIGHT CREWS</h1>';
      if (user !== null) {
      // eslint-disable-next-line max-len
        domString += '<div class="text-center"><button type="button" class="btn btn-primary" data-toggle="modal" id="create-modal" data-target="#exampleModal" data-whatever="@mdo">Create Employee</button></div>';
      }
      domString += '<div id="crew-section" class="d-flex flex-wrap text-center offset-2">';
      crews.forEach((crew) => {
        if (user !== null) {
          domString += `
          <div id="${crew.id}-card" class="card crew-card" style="width: 18rem;">
          <div class="card-body">
          <h5 class="card-title">${crew.name}</h5>
          <p class="card-text">${crew.pilot1}</p>
          <p class="card-text">${crew.pilot2}</p>
          <p class="card-text">${crew.fa1}</p>
          <p class="card-text">${crew.fa2}</p>
          <p class="card-text">${crew.fa3}</p>
          <p class="card-text">${crew.am1}</p>
          </div>
          <div>
          <button class="btn btn-primary crew-update" id="update-${crew.id}">Update Crew</button>
          </div>
          </div>
          `;
        } else {
          domString += `
          <div id="${crew.id}-card" class="card crew-card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${crew.name}</h5>
            <p class="card-text">${crew.pilot1}</p>
            <p class="card-text">${crew.pilot2}</p>
            <p class="card-text">${crew.fa1}</p>
            <p class="card-text">${crew.fa2}</p>
            <p class="card-text">${crew.fa3}</p>
            <p class="card-text">${crew.am1}</p>
          </div>
          </div>
          `;
        }
      });
      domString += '</div>';
      utilities.printToDom('crews', domString);
    // $('#crew').on('click', '.close-crewCard', deleteCrewMember);
    // // eslint-disable-next-line no-use-before-define
    // $(document.body).on('click', '#create-modal', createCrewMembers);
    // // eslint-disable-next-line no-use-before-define
    // $('body').on('click', '.crew-update', showEditCrewMemberModal);
    })
    .catch((error) => console.error(error));
};

export default { displayCrews, printCrewCards };
