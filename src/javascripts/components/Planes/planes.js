import $ from 'jquery';
import './planes.scss';
import planesData from '../../helpers/data/planesData';
import PlanesBuilder from '../PlanesBuilder/planesBuilder';
import utilities from '../../helpers/utilities';

const planesDiv = $('#planes');

const showPlanesDiv = () => {
  planesDiv.removeClass('hide');
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

const buildPlanes = (planeId) => {
  planesData.getPlanesByPlaneId(planeId)
    .then((planes) => {
      let domString = '<h1>Fleet Inventory & Maintenance</h1>';
      domString += '<div class="d-flex flex-wrap text-center">';
      planes.forEach((plane) => {
        domString += PlanesBuilder.makeAPlane(plane);
      });
      domString += '</div>';
      utilities.printToDom('planes', domString);
      $('#planes').on('click', '.delete', deleteAPlane);
      $('#show-planes').on('click', showPlanesDiv);
    })
    .catch((error) => console.error(error));
};

export default { buildPlanes };
