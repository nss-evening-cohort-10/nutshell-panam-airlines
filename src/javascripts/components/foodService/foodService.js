import './foodService.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import foodData from '../../helpers/data/foodData';

const displayFood = () => {
  $('#food-link').on('click', () => {
    $('#foodModule').show();
    $('#home').hide();
    $('#crew').hide();
    $('#airports').hide();
    $('#plane').hide();
  });
};

const createFoodCards = () => {
  let domString = '<h1>Food Service</h1>';
  domString += '<div id="foodDivs" class="d-flex flex-wrap">';
  foodData.getFoodByID()
    .then((foods) => {
      // modulesToHide.empty();
      foods.forEach((food) => {
        domString += `
        <div class="card col-4 foodCard card-body">
           <button class="btn btn-danger delete-foodItem"  id="${food.id}" style=" float: 
              right;">X</button>
           <img src="${food.imageURL}" class="card-img-top" alt="..."/>
           <h5 class="card-title" id="food">${food.name}</h5>
            <p>${food.price}</p>
            <p>${food.calsPerServing} Cals</p>
            <p>Menu Category: ${food.menuCategory}</p>
            <button type="button" class="btn btn-success" data-toggle="modal" data- 
             target="#exampleModal">
                Edit
             </button>`;
      });
      domString += '</div></div>';
      utilities.printToDom('foodModule', domString);
    })
    .catch((error) => console.error(error));
};

export default { createFoodCards, displayFood };
