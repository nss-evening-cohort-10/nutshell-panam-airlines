import $ from 'jquery';
import './planes.scss';
import planesData from '../../helpers/data/planesData';
import PlanesBuilder from '../PlanesBuilder/planesBuilder';
import utilities from '../../helpers/utilities';
import authData from '../../helpers/data/authData';

const displayPlanes = () => {
  $('#planes-link').on('click', () => {
    $('#planes').show();
    authData.checkLoginStatus();
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
  const newPlane = {
    // id: $('#plane-id').val(),
    team: $('#team').val(),
    airport: $('#airport').val(),
    planeNum: $('#planeNum').val(),
    modelType: $('#modelType').val(),
    capacity: $('#capacity').val(),
  };
  console.log(newPlane);
  planesData.addNewPlane(newPlane)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildPlanes();
    })
    .catch((error) => console.error(error));
};

const newPlaneInfo = (plane) => {
  let domString = '';
  domString += PlanesBuilder.PlaneModal(plane);
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
