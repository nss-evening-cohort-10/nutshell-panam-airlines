/* eslint-disable no-nested-ternary */
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
  $('#crew-link').on('click', () => {
    $('#crew').show();
    $('#airports').hide();
    $('#home').hide();
    $('#foodModule').hide();
    $('#planes').hide();
    $('#menu').hide();
  });
};

const createCrewMemberModal = (crewMember, jobTypes) => {
  let domString = `
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
              <input type="text" class="form-control" id="name" value="${crewMember ? crewMember.name : ''}">
            </div>
            <div class="form-group">
              <label for="jobTypeId" class="col-form-label">Job type:</label>
              <select class="custom-select" id="jobTypeId">
                <option ${crewMember ? '' : 'selected'}>Choose job type</option>
    `;
  if (crewMember && jobTypes) {
    jobTypes.forEach((jobType) => {
      domString += `<option value="${jobType.id}" ${crewMember.jobTypeId === jobType.id ? 'selected' : ''}>${jobType.function}</option>`;
    });
  } else if (jobTypes) {
    jobTypes.forEach((jobType) => {
      domString += `<option value="${jobType.id}">${jobType.function}</option>`;
    });
  }
  domString += `</select>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Title:</label>
              <textarea class="form-control" id="title">${crewMember ? crewMember.title : ''}</textarea>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Photo:</label>
              <textarea class="form-control" id="photo">${crewMember ? crewMember.photo : ''}</textarea>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Bio:</label>
              <textarea class="form-control" id="bio">${crewMember ? crewMember.bio : ''}</textarea>
            </div>
          </form>
        </div>
        <div id="${crewMember ? crewMember.id : ''}" class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="${crewMember ? 'update-crew' : 'create-save'}" type="button" class="btn btn-primary">Save</button>
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
      let domString = '<h1 class="crew-heading">FLIGHT CREW</h1>';
      if (user !== null) {
        // eslint-disable-next-line max-len
        domString += '<div class="text-center"><button type="button" class="btn btn-primary" data-toggle="modal" id="create-modal" data-target="#exampleModal" data-whatever="@mdo">Create Employee</button></div>';
      }
      domString += '<div id="crew-section" class="d-flex flex-wrap text-center offset-2">';
      crewMembers.forEach((crewMember) => {
        if (user !== null) {
          domString += `
          <div class="card crew-card" style="width: 18rem;">
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
          <div class="card crew-card" style="width: 18rem;">
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
    jobTypeId: $('#jobTypeId').val(),
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

const createCrewMembers = (e) => {
  e.stopImmediatePropagation();
  crewMemberData.getAllJobTypes()
    .then((jobTypes) => {
      let domString = '';
      domString += createCrewMemberModal({}, jobTypes);
      utilities.printToDom('exampleModal', domString);
      $('#create-save').click(addCrewMember);
    })
    .catch((error) => console.error(error));
};

const newCrewMemberDetails = (person) => {
  crewMemberData.getAllJobTypes()
    .then((jobTypes) => {
      let string = '';
      string += createCrewMemberModal(person, jobTypes);
      utilities.printToDom('exampleModal', string);
    })
    .catch((error) => console.error(error));
};

const updateCrewMemberObj = (e) => {
  e.stopImmediatePropagation();
  const crewMemberToUpdateId = e.target.parentNode.id;
  const changedCrewMember = {
    name: $('#name').val(),
    jobTypeId: $('#jobTypeId').val(),
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
