import $ from 'jquery';
import firebase from 'firebase';
import './foodService.scss';
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
    $('#menu').hide();
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
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '.delete-food', deleteFood);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '.edit-food', updateFoodValues);
    })
    .catch((error) => console.error(error));
};

const addNewFood = (e) => {
  e.stopImmediatePropagation();
  // ={} is an object
  const newFood = {
    name: $('#name').val(),
    calsPerServing: $('#calsPerServing').val(),
    imageURL: $('#imageURL').val(),
    price: $('#price').val(),
    menuCategory: $('#menuCategory').val(),
  };
  foodData.addNewFood(newFood)
  // reach out, make sure it's saved at firebase and then hide of the modal
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

const deleteFood = (e) => {
  e.preventDefault();
  foodData.deleteFood(e.target.id)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      createFoodCards();
    })
    .catch((error) => console.error(error));
};

const updateFoodValues = (e) => {
  foodData.getFoodByID(e.target.id)
    .then((response) => {
      $('#exampleModal').modal('show');
      // setting up a new property on the object that comes back as id.
      response.id = e.target.id;
      newFoodDetails(response);
      // eslint-disable-next-line no-use-before-define
      $('#update').click(editedFood);
    });
};

const editedFood = (e) => {
  e.stopImmediatePropagation();
  const editedFoodId = e.target.parentNode.id;
  const updatedFood = {
    name: $('#name').val(),
    calsPerServing: $('#calsPerServing').val(),
    imageURL: $('#imageURL').val(),
    price: $('#price').val(),
    menuCategory: $('#menuCategory').val(),
  };
  foodData.editFood(editedFoodId, updatedFood)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createFoodCards();
    })
    .catch((error) => console.error(error));
};


// const editPlaneInfo = (e) => {
//   e.stopImmediatePropagation();
//   const planeid = e.target.parentNode.id;
//   const updatedPlane = {
//     team: $('#team').val(),
//     airport: $('#airport').val(),
//     planeNum: $('#planeNum').val(),
//     modelType: $('#modelType').val(),
//     capacity: $('#capacity').val(),
//   };
//   planesData.updatePlane(planeid, updatedPlane)
//     .then(() => {
//       $('#exampleModal').modal('hide');
//       // eslint-disable-next-line no-use-before-define
//       buildPlanes();
//     })
//     .catch((error) => console.error(error));
// };


export default { createFoodCards, displayFood };
