import './crew.scss';

import utilities from '../../helpers/utilities';
import crewData from '../../helpers/data/crewData';

const createCrewCard = () => {
  crewData.getAllCrewMembers()
    .then((crews) => {
      let domString = '<h1>CREW MEMBERS</h1>';
      domString += '<div id="crew-section" class="d-flex flex-wrap text-center">';
      crews.forEach((crew) => {
        domString += `
        <div id="${crew.teamId}" class="card crew-card" style="width: 18rem;">
          <img src="${crew.photo}" class="card-img-top crew-image" alt="${crew.name}">
          <div class="card-body">
            <h5 class="card-title">${crew.name}</h5>
            <p class="card-text">${crew.title}</p>
            <p class="card-text">${crew.bio}</p>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('crew', domString);
    })
    .catch((error) => console.error(error));
};

export default { createCrewCard };
