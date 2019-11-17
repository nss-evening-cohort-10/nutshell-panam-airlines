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

export default { makeAPlane };
