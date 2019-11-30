import firebase from 'firebase';
import $ from 'jquery';
import './crewMembers.scss';

import utilities from '../../helpers/utilities';
import crewMemberData from '../../helpers/data/crewMemberData';

const deleteCrewMember = (e) => {
  e.preventDefault();
  const { crewId } = e.target.id;
  crewMemberData.removeCrewMember(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      createCrewMemberCard(crewId);
    })
    .catch((error) => console.error(error));
};

const displayCrewMembers = () => {
  $('#crew-member-link').on('click', () => {
    $('#crewMembers').show();
    $('#airports').hide();
    $('#crews').hide();
    $('#home').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
  });
};

const createCrewMemberModal = (crewMember) => {
  const domString = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${crewMember ? 'Update' : 'Create'} Crew Member</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Name:</label>
              <input type="text" class="form-control" id="name" value="${crewMember.name ? crewMember.name : ''}">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Team ID:</label>
              <textarea class="form-control" id="teamId">${crewMember.teamId ? crewMember.teamId : ''}</textarea>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Title:</label>
              <textarea class="form-control" id="title">${crewMember.title ? crewMember.title : ''}</textarea>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Photo:</label>
              <textarea class="form-control" id="photo">${crewMember.photo ? crewMember.photo : ''}</textarea>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Bio:</label>
              <textarea class="form-control" id="bio">${crewMember.bio ? crewMember.bio : ''}</textarea>
            </div>
          </form>
        </div>
        <div id="${crewMember.id ? crewMember.id : ''}" class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="${crewMember.id ? 'update-crew' : 'create-save'}" type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
    `;
  return domString;
};

const createCrewMemberCard = () => {
  const user = firebase.auth().currentUser;
  crewMemberData.getAllCrewMembers()
    .then((crewMembers) => {
      let domString = '<h1 class="crew-heading">FLIGHT CREW MEMBERS</h1>';
      if (user !== null) {
        // eslint-disable-next-line max-len
        domString += '<div class="text-center"><button type="button" class="btn btn-primary" data-toggle="modal" id="create-modal" data-target="#exampleModal" data-whatever="@mdo">Create Employee</button></div>';
      }
      domString += '<div id="crew-section" class="d-flex flex-wrap text-center offset-2">';
      crewMembers.forEach((crewMember) => {
        if (user !== null) {
          domString += `
          <div id="${crewMember.teamId}" class="card crew-card" style="width: 18rem;">
          <button type="button" class="close-crewCard d-flex justify-content-end" data-boardID="${crewMember.crewId}"  id="${crewMember.id}" aria-label="Close">x 
          </button>
            <img src="${crewMember.photo}" class="card-img-top crew-image" alt="${crewMember.name}">
            <div class="card-body">
              <h5 class="card-title">${crewMember.name}</h5>
              <p class="card-text">${crewMember.title}</p>
              <p class="card-text">${crewMember.bio}</p>
            </div>
            <div>
              <button class="btn btn-primary crew-update" id="update-${crewMember.id}">Update Employee</button>
            </div>
          </div>
          `;
        } else {
          domString += `
          <div id="${crewMember.teamId}" class="card crew-card" style="width: 18rem;">
            <img src="${crewMember.photo}" class="card-img-top crew-image" alt="${crewMember.name}">
            <div class="card-body">
              <h5 class="card-title">${crewMember.name}</h5>
              <p class="card-text">${crewMember.title}</p>
              <p class="card-text">${crewMember.bio}</p>
            </div>
          </div>
          `;
        }
      });
      domString += '</div>';
      utilities.printToDom('crew', domString);
      $('#crew').on('click', '.close-crewCard', deleteCrewMember);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '#create-modal', createCrewMembers);
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.crew-update', showEditCrewMemberModal);
    })
    .catch((error) => console.error(error));
};

const addCrewMember = (e) => {
  e.stopImmediatePropagation();
  const crewMember = {
    name: $('#name').val(),
    teamId: $('#teamId').val(),
    title: $('#title').val(),
    photo: $('#photo').val(),
    bio: $('#bio').val(),
  };
  crewMemberData.addNewMember(crewMember)
    .then(() => {
      $('#exampleModal').modal('hide');
      createCrewMemberCard();
    })
    .catch((error) => console.error(error));
};

const createCrewMembers = () => {
  let domString = '';
  domString += createCrewMemberModal();
  utilities.printToDom('exampleModal', domString);
  $('#create-save').click(addCrewMember);
};

const newCrewMemberDetails = (person) => {
  let string = '';
  string += createCrewMemberModal(person);
  utilities.printToDom('exampleModal', string);
};

const updateCrewMemberObj = (e) => {
  e.stopImmediatePropagation();
  const crewMemberToUpdateId = e.target.parentNode.id;
  const changedCrewMember = {
    name: $('#name').val(),
    teamId: $('#teamId').val(),
    title: $('#title').val(),
    photo: $('#photo').val(),
    bio: $('#bio').val(),
  };
  crewMemberData.updateCrewMember(crewMemberToUpdateId, changedCrewMember)
    .then(() => {
      $('#exampleModal').modal('hide');
      createCrewMemberCard();
    })
    .catch((error) => console.error(error));
};

const showEditCrewMemberModal = (e) => {
  e.stopImmediatePropagation();
  const crewMemberId = e.target.id.split('update-')[1];
  crewMemberData.getCrewMemberById(crewMemberId)
    .then((crewMember) => {
      newCrewMemberDetails(crewMember);
      $('#exampleModal').modal('show');
      $('#update-crew').click(updateCrewMemberObj);
    })
    .catch((error) => console.error(error));
};

export default { createCrewMemberCard, displayCrewMembers };
