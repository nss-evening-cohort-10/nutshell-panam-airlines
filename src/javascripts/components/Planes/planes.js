import $ from 'jquery';
import firebase from 'firebase';
import './planes.scss';
import planesData from '../../helpers/data/planesData';
import PlanesBuilder from '../PlanesBuilder/planesBuilder';
import utilities from '../../helpers/utilities';


const displayPlanes = () => {
  $('#planes-link').on('click', () => {
    $('#planes').show();
    $('#airports').hide();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#home').hide();
    $('#menu').hide();
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
    .catch((error) => console.error(error));
};

const addNewPlane = (e) => {
  e.stopImmediatePropagation();
  const newPlane = {
    team: $('#team').val(),
    airport: $('#airport').val(),
    planeNum: $('#planeNum').val(),
    modelType: $('#modelType').val(),
    capacity: $('#capacity').val(),
  };
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

const editPlaneInfo = (e) => {
  e.stopImmediatePropagation();
  const planeid = e.target.parentNode.id;
  const updatedPlane = {
    team: $('#team').val(),
    airport: $('#airport').val(),
    planeNum: $('#planeNum').val(),
    modelType: $('#modelType').val(),
    capacity: $('#capacity').val(),
  };
  planesData.updatePlane(planeid, updatedPlane)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildPlanes();
    })
    .catch((error) => console.error(error));
};

const updateAPlane = (e) => {
  planesData.getPlaneById(e.target.id)
    .then((response) => {
      $('#exampleModal').modal('show');
      response.id = e.target.id;
      newPlaneInfo(response);
      $('#edit').click(editPlaneInfo);
    });
};

const buildPlanes = () => {
  planesData.getPlanes()
    .then((planes) => {
      let domString = '<h1 class="title">Fleet Inventory & Maintenance</h1>';
      const user = firebase.auth().currentUser;
      if (user != null) {
        // eslint-disable-next-line max-len
        domString += '<button type="button" id="add-new-plane" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style="margin-left: 10px;">Add Plane</button>';
      }
      domString += '<div class="d-flex flex-wrap text-center">';
      planes.forEach((plane) => {
        domString += PlanesBuilder.makeAPlane(plane);
      });
      domString += '</div>';
      utilities.printToDom('planes', domString);
      $('#planes').on('click', '.delete', deleteAPlane);
      $('#add-new-plane').click(newPlaneInfo);
      $('#planes').on('click', '.edit', updateAPlane);
    })
    .catch((error) => console.error(error));
};


export default { buildPlanes, displayPlanes };
