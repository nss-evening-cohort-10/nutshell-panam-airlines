import './foodService.scss';
import $ from 'jquery';
import firebase from 'firebase';
import utilities from '../../helpers/utilities';
import foodData from '../../helpers/data/foodData';
import foodCardBuilder from '../foodCardBuilder/foodCardBuilder';

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
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += '<div class="text-center"><button type="button" id="add-new-food" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style="margin-left: 10px; color: white;">Add New Food</button></div>';
  }
  domString += '<div id="foodDivs" class="d-flex flex-wrap">';
  foodData.getFood()
    .then((foods) => {
      foods.forEach((food) => {
        domString += foodCardBuilder.singleFoodCard(food);
      });
      domString += '</div>';
      utilities.printToDom('foodModule', domString);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '#add-new-food', newFoodDetails);
    })
    .catch((error) => console.error(error));
};

const addNewFood = (e) => {
  e.stopImmediatePropagation();
  const newFood = {
    name: $('#name').val(),
    calsPerServing: $('#calsPerServing').val(),
    imageURL: $('#imageURL').val(),
    price: $('#price').val(),
    menuCategory: $('#menuCategory').val(),
  };
  foodData.addNewFood(newFood)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createFoodCards();
    })
    .catch((error) => console.error(error));
};

const newFoodDetails = (food) => {
  let domString = '';
  domString += foodCardBuilder.foodModal(food);
  utilities.printToDom('exampleModal', domString);
  $('#submit').click(addNewFood);
};

export default { createFoodCards, displayFood };
