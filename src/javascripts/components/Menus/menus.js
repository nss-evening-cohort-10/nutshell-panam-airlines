import './menus.scss';
import firebase from 'firebase';

const displayAllMenus = (menu) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `<div id="${menu.id}" class="row">
      <div class="col-sm-6">
      <div class="card menuCard" style="width: 20em; max-width: 500px; height: 100%; margin: 2em;">
      < div class="card-body">
      <h5 class="card-title"id="menu">${menu.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Edit</>
      <a href="#" class="card-link">Delete</a>
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

const menuModal = (menu) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <a class="navbar-brand d-flex" href="#">
            <img id="panam-logo" src="https://logodix.com/logo/1245241.png" alt="" style="max-width: 180px; align-items: left; justify-content: left;">
        </a>
        <h5 class="modal-title" id="exampleModalLabel" style="margin-top:34px; margin-right:180px; color: #1c69b1;">New Menu</h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group>
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="name" value="${menu.name ? menu.name : ''}">
          </div>
          <div class="form-group">
            <label for="calsPerServing" class="col-form-label">Calories:</label>
            <input type="text" class="form-control" id="calsPerServing" value="${menu.calsPerServing ? menu.calsPerServing : ''}"></input>
          </div>
          <div class="form-group">
            <label for="imageURL" class="col-form-label">Image URL:</label>
            <input type="text" class="form-control" id="imageURL" value="${menu.imageURL ? menu.imageURL : ''}"></input>
          </div>
          <div class="form-group">
            <label for="price" class="col-form-label">Price:</label>
            <input type="text" class="form-control" id="price" value="${menu.price ? menu.price : ''}"></input>
          </div>
          <div class="form-group">
            <label for="menuCategory" class="col-form-label">Menu Category:</label>
            <input type="text" class="form-control" id="menuCategory" value="${menu.menuCategory ? menu.menuCategory : ''}"></input>
          </div>
        </form>
      </div>
      <div class="modal-footer text-center" id="${menu.id}">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="${menu.id ? 'update' : 'submit'}" class="btn" style="background-color: #1c69b1; color: white; font-weight: bold;">Submit</button>
      </div>
    </div>
  </div>`;
  return domString;
};

export default { displayAllMenus, menuModal };
