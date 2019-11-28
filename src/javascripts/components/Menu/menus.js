import './menus.scss';
import firebase from 'firebase';

const displayMenu = () => {
// insert code here
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `<div id="${menu.id}" class="row">
      <div class="col-sm-6">
      <div class="card menuCard" style="width: 20em; max-width: 500px; height: 100%; margin: 2em;">
      < div class="card-body">
      <h5 class="card-title"id="menu">${menu.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Card link</>
      <a href="#" class="card-link">Another link</a>
      </>
    </div>
    </div>
    </div>`;
  } else {
    domString += `
        <div id="${menu.id}" class="card foodCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
           <img src="${menu.imageURL}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
           <br>
           <h5 class="card-title" id="food">${menu.name}</h5>
            <p>${menu.price}</p>
            <p>${menu.calsPerServing} Cals</p>
            <p>Menu Category: ${menu.menuCategory}</p>
        </div>`;
  }
  return domString;
};

export default { displayMenu };
