// import $ from 'jquery';
import './planes.scss';
import planesData from '../../helpers/data/planesData';
import PlanesBuilder from '../PlanesBuilder/planesBuilder';
import utilities from '../../helpers/utilities';

const buildPlanes = (planeId) => {
  planesData.getPlanesByPlaneId(planeId)
    .then((planes) => {
      let domString = '<h1>Fleet Inventory & Maintenance</h1>';
      planes.forEach((plane) => {
        domString += PlanesBuilder.makeAPlane(plane);
        domString += '</div>';
      });
      utilities.printToDom('planes', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildPlanes };
