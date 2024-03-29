import './planesBuilder.scss';
import firebase from 'firebase';

// eslint-disable-next-line consistent-return
const makeAPlane = (plane) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  domString += `<div class="card col-3">
  <div class="card-body text-center" ${plane.id}>
  <h5 class="card-title">Plane Number: ${plane.planeNum}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${plane.team}</h6>
  <p class="card-text">Airport: ${plane.airport}</p>
  <p class="card-text">Model/Type: ${plane.modelType}</p>
  <p class="card-text">Capacity: ${plane.capacity}</p>
  </div>
  <div>`;
  if (user != null) {
    domString += ` <button type="button" id="${plane.id}" class="btn btn-warning edit">EDIT</button>
    <button type="button" id="${plane.id}" class="btn btn-danger delete">DELETE</button>`;
  }
  domString += '</div> </div>';
  return domString;
};

const PlaneModal = (plane) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Plane Maintenance</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group>
            <label for="planeNum" class="col-form-label">Plane No.</label>
            <input type="text" class="form-control" id="planeNum" value="${plane.planeNum ? plane.planeNum : ''}">
          </div>
          <div class="form-group">
            <label for="airport" class="col-form-label">Airport:</label>
            <input type="text" class="form-control" id="airport" value="${plane.airport ? plane.airport : ''}"></>
          </div>
          <div class="form-group">
            <label for="team" class="col-form-label">Team:</label>
            <input type="text" class="form-control" id="team" value="${plane.team ? plane.team : ''}"></>
          </div>
          <div class="form-group">
            <label for="modelType" class="col-form-label">Model/Type:</label>
            <input type="text" class="form-control" id="modelType" value="${plane.modelType ? plane.modelType : ''}"></>
          </div>
          <div class="form-group">
            <label for="capacity" class="col-form-label">Capacity:</label>
            <input type="text" class="form-control" id="capacity" value="${plane.capacity ? plane.capacity : ''}"></>
          </div>
        </form>
      </div>
      <div class="modal-footer" id="${plane.id}">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="${plane.id ? 'edit' : 'save'}" class="btn btn-primary">Save</button>
        </div>
    </div>
  </div>`;
  return domString;
};

export default { makeAPlane, PlaneModal };
