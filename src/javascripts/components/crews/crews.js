// import firebase from 'firebase';
import $ from 'jquery';
import './crews.scss';

import utilities from '../../helpers/utilities';
// import crewsData from '../../helpers/data/crewsData';
import crewCrewMembersSmash from '../../helpers/data/Crew-CrewMembersSmash';

const createCrewCards = (crewArray) => {
  console.log(crewArray);
  let domString = '';
  for (let i = 0; i < crewArray.length; i += 1) {
    const crewObject = crewArray[i];
    domString += `
      <div class="card crews-card d-flex text-center" style="width: 18rem;">
      <div class="card-body">
      <h5 class="card-title">${crewObject.name}</h5>
      <p class="card-text">Pilot 1: ${crewObject.pilot1.name}</p>
      <p class="card-text">Pilot 2: ${crewObject.pilot2.name}</p>
      <p class="card-text">Flight Attendant 1: ${crewObject.fa1.name}</p>
      <p class="card-text">Flight Attendant 2: ${crewObject.fa2.name}</p>
      <p class="card-text">Flight Attendant 3: ${crewObject.fa3.name}</p>
      <p class="card-text">Air Marshal: ${crewObject.am1.name}</p>
      </div>
      <div>
      <button class="btn btn-primary crews-update" id="update-${crewObject.id}">Update Crew</button>
      </div>
      </div>`;
  }
  console.log(domString);
  utilities.printToDom('crews-container', domString);
};

const printCrewCards = () => {
  crewCrewMembersSmash.getAllCrewsWithMembers()
    .then((allDemCrews) => {
      createCrewCards(allDemCrews);
    });
};

// $('#crews').on('click', '.close-crewCard', deleteCrewMember);
// // eslint-disable-next-line no-use-before-define
// $(document.body).on('click', '#create-modal', createCrewMembers);
// // eslint-disable-next-line no-use-before-define
// $('body').on('click', '.crews-update', showEditCrewMemberModal);

const displayCrews = () => {
  $('#crews-link').on('click', () => {
    $('#crews').removeClass('hide');
    $('#crewMembers').hide();
    $('#airports').hide();
    $('#home').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
    printCrewCards();
  });
};

export default { displayCrews, createCrewCards, printCrewCards };
