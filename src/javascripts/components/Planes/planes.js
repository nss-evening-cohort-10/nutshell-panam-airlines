import $ from 'jquery';
import './planes.scss';
import planesData from '../../helpers/data/planesData';
import PlanesBuilder from '../PlanesBuilder/planesBuilder';
import utilities from '../../helpers/utilities';

const displayPlanes = () => {
  $('#planes-link').on('click', () => {
    $('#planes').show();
  });
};

const deleteAPlane = (e) => {
  e.preventDefault();
  const { planeId } = e.target.id;
  planesData.deletePlane(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildPlanes(planeId);
    })
    .catch((error) => console.log(error));
};

const addNewPlane = (e) => {
  e.stopImmediatePropagation();
  const { planeId } = e.target.id;
  const newPlane = {
    // id: $('#plane-id').val(),
    team: $('#team').val(),
    airport: $('#airport').val(),
    planeNum: $('#planeNum').val(),
    modelType: $('#modelType').val(),
    capacity: $('#capacity').val(),
    planeId,
  };
  planesData.addNewPlane(newPlane)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildPlanes(planeId);
    })
    .catch((error) => console.error(error));
};

const newPlaneInfo = (plane) => {
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
        <div class="form-group${plane.id}">
          <label for="planeNum" class="col-form-label">Plane No.</label>
          <input type="text" class="form-control" id="${plane.planeNum}">
        </div>
        <div class="form-group">
          <label for="airport" class="col-form-label">Airport:</label>
          <textarea class="form-control" id="${plane.airport}"></textarea>
        </div>
        <div class="form-group">
          <label for="team" class="col-form-label">Team:</label>
          <textarea class="form-control" id="${plane.team}"></textarea>
        </div>
        <div class="form-group">
          <label for="modelType" class="col-form-label">Model/Type:</label>
          <textarea class="form-control" id="${plane.modelType}"></textarea>
        </div>
        <div class="form-group">
          <label for="capacity" class="col-form-label">Capacity:</label>
          <textarea class="form-control" id="${plane.capacity}"></textarea>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button"  id="save" class="btn btn-primary">Save</button>
    </div>
  </div>
</div>`;
  utilities.printToDom('exampleModal', domString);
  $('#save').click(addNewPlane);
};

const buildPlanes = (planeId) => {
  planesData.getPlanesByPlaneId(planeId)
    .then((planes) => {
      let domString = '<h1 class="title">Fleet Inventory & Maintenance</h1>';
      domString += '<button type="button" id="add-new-plane" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Plane</button>';
      domString += '<div class="d-flex flex-wrap text-center">';
      planes.forEach((plane) => {
        domString += PlanesBuilder.makeAPlane(plane);
      });
      domString += '</div>';
      utilities.printToDom('planes', domString);
      $('#planes').on('click', '.delete', deleteAPlane);
      $('#add-new-plane').click(newPlaneInfo);
    })
    .catch((error) => console.error(error));
};


export default { buildPlanes, displayPlanes };
