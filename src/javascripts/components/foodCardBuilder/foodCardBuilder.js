import './foodCardBuilder.scss';
import firebase from 'firebase';

const singleFoodCard = (food) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `
          <div id="${food.id}" class="card foodCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
             <button class="btn delete-button delete-food"  id="${food.id}" style="margin-right:0; margin-left: auto; width: 2em; color:#1c69b1; font-weight:bold;">X</button>
             <img src="${food.imageURL}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
             <br>
             <h5 class="card-title" id="food">${food.name}</h5>
              <p>${food.price}</p>
              <p>${food.calsPerServing} Cals</p>
              <p>Menu Category: ${food.menuCategory}</p>
              <button type="button" class="btn" data-toggle="modal" data- 
               target="#exampleModal" id="edit-food" style="background-color: #1c69b1; color: white;">
                  Edit
               </button>
          </div>`;
  } else {
    domString += `
        <div id="${food.id}" class="card foodCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
           <img src="${food.imageURL}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
           <br>
           <h5 class="card-title" id="food">${food.name}</h5>
            <p>${food.price}</p>
            <p>${food.calsPerServing} Cals</p>
            <p>Menu Category: ${food.menuCategory}</p>
        </div>`;
  }
  return domString;
};

const foodModal = (food) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <a class="navbar-brand d-flex" href="#">
            <img id="panam-logo" src="https://logodix.com/logo/1245241.png" alt="" style="max-width: 180px; align-items: left; justify-content: left;">
        </a>
        <h5 class="modal-title" id="exampleModalLabel" style="margin-top:34px; margin-right:180px; color: #1c69b1;">New Item</h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group>
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="name" value="${food.name ? food.name : ''}>
          </div>
          <div class="form-group">
            <label for="calsPerServing" class="col-form-label">Calories:</label>
            <input type="text" class="form-control" id="calsPerServing" value="${food.calsPerServing ? food.calsPerServing : ''}></input>
          </div>
          <div class="form-group">
            <label for="imageURL" class="col-form-label">Image URL:</label>
            <input type="text" class="form-control" id="imageURL" value="${food.imageURL ? food.imageURL : ''}></input>
          </div>
          <div class="form-group">
            <label for="price" class="col-form-label">Price:</label>
            <input type="text" class="form-control" id="price" value="${food.price ? food.price : ''}></input>
          </div>
          <div class="form-group">
            <label for="menuCategory" class="col-form-label">Menu Category:</label>
            <input type="text" class="form-control" id="menuCategory" value="${food.menuCategory ? food.menuCategory : ''}></input>
          </div>
        </form>
      </div>
      <div class="modal-footer text-center">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="submit" class="btn" style="background-color: #1c69b1; color: white; font-weight: bold;">Submit</button>
      </div>
    </div>
  </div>`;
  return domString;
};


export default { singleFoodCard, foodModal };
