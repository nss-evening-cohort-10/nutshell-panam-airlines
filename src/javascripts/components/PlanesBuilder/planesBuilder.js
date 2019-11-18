import './planesBuilder.scss';

const makeAPlane = (plane) => {
  const domString = `
  <div class="card col-3">
  <div class="card-body text-center" ${plane.id}>
    <h5 class="card-title">Plane Number: ${plane.planeNum}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${plane.team}</h6>
    <p class="card-text">Airport: ${plane.airport}</p>
    <p class="card-text">Model/Type: ${plane.modelType}</p>
    <p class="card-text">Capacity: ${plane.capacity}</p>
    <button type="button" id="${plane.id}" class="btn btn-warning edit">EDIT</button>
    <button type="button" id="${plane.id}" class="btn btn-danger delete">DELETE</button>
  </div>
 </div>`;
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
          <div class="form-group${plane.id}">
            <label for="planeNum" class="col-form-label">Plane No.</label>
            <input type="text" class="form-control" id="${plane.planeNum}">
          </div>
          <div class="form-group">
            <label for="airport" class="col-form-label">Airport:</label>
            <textarea class="form-control" id="${plane.airport}">${plane.airport}</textarea>
          </div>
          <div class="form-group">
            <label for="team" class="col-form-label">Team:</label>
            <textarea class="form-control" id="${plane.team}">${plane.team}</textarea>
          </div>
          <div class="form-group">
            <label for="modelType" class="col-form-label">Model/Type:</label>
            <textarea class="form-control" id="${plane.modelType}">${plane.modelType}</textarea>
          </div>
          <div class="form-group">
            <label for="capacity" class="col-form-label">Capacity:</label>
            <textarea class="form-control" id="${plane.capacity}">${plane.capacity}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>`;
  return domString;
};
export default { makeAPlane, PlaneModal };
