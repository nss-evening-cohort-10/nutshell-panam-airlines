import './foodService.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import foodData from '../../helpers/data/foodData';

const displayFood = () => {
  $('#food-link').on('click', () => {
    $('#foodModule').show();
    $('#home').hide();
    $('#crew').hide();
    $('#airports').hide();
    $('#planes').hide();
  });
};

const createFoodCards = () => {
  let domString = '<h1 class="text-center">Food Service</h1>';
  domString += '<div id="foodDivs" class="d-flex flex-wrap">';
  foodData.getFood()
    .then((foods) => {
      foods.forEach((food) => {
        const user = firebase.auth().currentUser;
        if (user != null) {
          domString += `
          <div class="card foodCard card-body text-center" style=" width: 25em; height: 100%; margin: 2em;">
             <button class="btn delete-foodItem"  id="${food.id}" style="margin-right:0; margin-left: auto; width: 2em;">X</button>
             <img src="${food.imageURL}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
             <br>
             <h5 class="card-title" id="food">${food.name}</h5>
              <p>${food.price}</p>
              <p>${food.calsPerServing} Cals</p>
              <p>Menu Category: ${food.menuCategory}</p>
              <button type="button" class="btn btn-success" data-toggle="modal" data- 
               target="#exampleModal">
                  Edit
               </button>
          </div>`;
        } else {
          domString += `
        <div class="card foodCard card-body text-center" id="${food.id}" style=" width: 25em; height: 100%; margin: 2em;">
           <img src="${food.imageURL}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
           <br>
           <h5 class="card-title" id="food">${food.name}</h5>
            <p>${food.price}</p>
            <p>${food.calsPerServing} Cals</p>
            <p>Menu Category: ${food.menuCategory}</p>
        </div>`;
        }
      });
      domString += '</div>';
      utilities.printToDom('foodModule', domString);
    })
    .catch((error) => console.error(error));
};

export default { createFoodCards, displayFood };
