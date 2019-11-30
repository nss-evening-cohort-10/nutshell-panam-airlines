import $ from 'jquery';
import firebase from 'firebase';
import './menus.scss';
import utilities from '../../helpers/utilities';
import menuData from '../../helpers/data/menuData';
import menuDisplay from './menus';

const displayMenu = () => {
  $('#menu-link').on('click', () => {
    $('#foodModule').hide();
    $('#home').hide();
    $('#crew').hide();
    $('#airports').hide();
    $('#planes').hide();
    $('#menu').show();
  });
};

const createMenuCards = () => {
  let domString = '<h1 class="text-center">Menus</h1>';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += '<div class="text-center"><button type="button" id="add-new-menu" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style="margin-left: 10px; color: white;">Add New Menu</button></div>';
  }
  domString += '<div id="menuDivs" class="d-flex flex-wrap">';
  menuData.getMenu()
    .then((menus) => {
      menus.forEach((menu) => {
        domString += menuDisplay.displayAllMenus(menu);
      });
      domString += '</div>';
      utilities.printToDom('menuModule', domString);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '#add-new-menu', newMenuDetails);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '.delete-menu', deleteMenu);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '.edit-menu', updateMenuValues);
    })
    .catch((error) => console.error(error));
};

const addNewMenu = (e) => {
  e.stopImmediatePropagation();
  const newMenu = {
    name: $('#name').val(),
    calsPerServing: $('#calsPerServing').val(),
    imageURL: $('#imageURL').val(),
    price: $('#price').val(),
    menuCategory: $('#menuCategory').val(),
  };
  menuData.addNewMenu(newMenu)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createMenuCards();
    })
    .catch((error) => console.error(error));
};

const newMenuDetails = (menu) => {
  let domString = '';
  domString += menuDisplay.foodModal(menu);
  utilities.printToDom('exampleModal', domString);
  $('#submit').click(addNewMenu);
};

const deleteMenu = (e) => {
  e.preventDefault();
  menuData.deleteMenu(e.target.id)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      createMenuCards();
    })
    .catch((error) => console.error(error));
};

const updateMenuValues = (e) => {
  menuData.getMenuByID(e.target.id)
    .then((response) => {
      $('#exampleModal').modal('show');
      response.id = e.target.id;
      newMenuDetails(response);
      // eslint-disable-next-line no-use-before-define
      $('#update').click(editedMenu);
    });
};

const editedMenu = (e) => {
  e.stopImmediatePropagation();
  const editedMenuId = e.target.parentNode.id;
  const updatedMenu = {
    name: $('#name').val(),
    calsPerServing: $('#calsPerServing').val(),
    imageURL: $('#imageURL').val(),
    price: $('#price').val(),
    menuCategory: $('#menuCategory').val(),
  };
  menuData.editMenu(editedMenuId, updatedMenu)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createMenuCards();
    })
    .catch((error) => console.error(error));
};

export default { createMenuCards, displayMenu };
