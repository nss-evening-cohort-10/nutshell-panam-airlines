// import firebase from 'firebase';
import $ from 'jquery';
import './crews.scss';

import utilities from '../../helpers/utilities';
import crewsData from '../../helpers/data/crewsData';
import crewCrewMembersSmash from '../../helpers/data/Crew-CrewMembersSmash';

const createCrewCards = (crewArray) => {
  console.log(crewArray);
  let domString = '';
  // crewArray.forEach((crewObject) => {
  for (let i = 0; i < crewArray.length; i += 1) {
    const crewObject = crewArray[i];
    domString += `
      <div class="card crews-card" style="width: 18rem;">
      <div class="card-body">
      <h5>class="card-title">${crewObject.name}</h5>
      <p class="card-text">${crewObject.pilot1.name}</p>
      <p class="card-text">${crewObject.pilot2.name}</p>
      <p class="card-text">${crewObject.fa1.name}</p>
      <p class="card-text">${crewObject.fa2.name}</p>
      <p class="card-text">${crewObject.fa3.name}</p>
      <p class="card-text">${crewObject.am1.name}</p>
      </div>
      <div>
      <button class="btn btn-primary crews-update" id="update-${crewObject.id}">Update Crew</button>
      </div>
      </div>`;
  }
  console.log(domString);
  utilities.printToDom('crews', domString);
};

const printCrewCards = () => {
  // const user = firebase.auth().currentUser;
  // let domString = '<h1 class="crew-heading">FLIGHT CREWS</h1>';
  const c = [];
  crewsData.getAllCrews()
    .then((crews) => {
      crews.forEach((crew) => {
        crewCrewMembersSmash.getCrewMembersByCrewId(crew.id) // this is the smash function that the specific crews member objs
          .then((thisCrewList) => {
            // console.log(thisCrewList);
            const cr = {
              id: crew.id,
              name: crew.name,
              pilot1: thisCrewList.pilot1,
              pilot2: thisCrewList.pilot2,
              fa1: thisCrewList.fa1,
              fa2: thisCrewList.fa2,
              fa3: thisCrewList.fa3,
              am1: thisCrewList.am1,
            };
            c.push(cr);
          });
      });
      // utilities.printToDom('crews', domString);
    });
  console.log('j', c);
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

export default { displayCrews, printCrewCards };
