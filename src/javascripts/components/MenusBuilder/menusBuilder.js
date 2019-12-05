import './menusBuilder.scss';
import firebase from 'firebase';
import menuData from '../../helpers/data/menuData';
import utilities from '../../helpers/utilities';

const displayAllMenus = () => {
  const user = firebase.auth().currentUser;
  menuData.getAllMenus()
    .then((menus) => {
      let domString = '<h1 class="text-center">Menus</h1>';
      if (user != null) {
        // eslint-disable-next-line max-len
        domString += '<div class="text-center"><button type="button" id="add-new-menu" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style="margin-left: 10px; color: white;">Add New Menu</button></div>';
      }
      domString += '<div id="menu-section" class="d-flex flex-wrap text-center offset-2">';
      menus.forEach((menu) => {
        if (user !== null) {
          domString += `
          <div id="${menu.id}" class="row">
        <div class="col-sm-6">
        <div class="card menuCard" style="width: 20em; max-width: 500px; height: 100%; margin: 2em;">
        <div class="card-body">
          <h5 class="card-title"id="menu">${menu.name}</h5>
            <p>${menu.foodItemId1}</p>
            <p>${menu.foodItemId2}</p>
            <p>${menu.foodItemId3}</p>
            <p>${menu.foodItemId3}</p>`;
          domString += `<a href="#" class="card-link-edit">Edit</>
          <a href="#" class="card-link-delete">Delete</a>`;
          domString += '</div></div></div>';
        } else {
          domString += `
          <div id="${menu.id}" class="row">
        <div class="col-sm-6">
        <div class="card menuCard" style="width: 20em; max-width: 500px; height: 100%; margin: 2em;">
        <div class="card-body">
          <h5 class="card-title"id="menu">${menu.name}</h5>
            <p>${menu.foodItemId1}</p>
            <p>${menu.foodItemId2}</p>
            <p>${menu.foodItemId3}</p>
            <p>${menu.foodItemId3}</p>`;
          domString += '</div></div></div>';
        }
      });
      domString += '</div>';
      utilities.printToDom('menu', domString);
    })
    .catch((error) => console.error(error));
};

// const menuModal = (menu) => {
//   const domString = `<div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <a class="navbar-brand d-flex" href="#">
//             <img id="panam-logo" src="https://logodix.com/logo/1245241.png" alt="" style="max-width: 180px; align-items: left; justify-content: left;">
//         </a>
//         <h5 class="modal-title" id="exampleModalLabel" style="margin-top:34px; margin-right:180px; color: #1c69b1;">New Menu</h5>
//       </div>
//       <div class="modal-body">
//         <form>
//           <div class="form-group>
//             <label for="name" class="col-form-label">Name:</label>
//             <input type="text" class="form-control" id="name" value="${menu.name ? menu.name : ''}">
//           </div>
//           <div class="form-group">
//             <label for="calsPerServing" class="col-form-label">Calories:</label>
//             <input type="text" class="form-control" id="calsPerServing" value="${menu.calsPerServing ? menu.calsPerServing : ''}"></input>
//           </div>
//           <div class="form-group">
//             <label for="imageURL" class="col-form-label">Image URL:</label>
//             <input type="text" class="form-control" id="imageURL" value="${menu.imageURL ? menu.imageURL : ''}"></input>
//           </div>
//           <div class="form-group">
//             <label for="price" class="col-form-label">Price:</label>
//             <input type="text" class="form-control" id="price" value="${menu.price ? menu.price : ''}"></input>
//           </div>
//           <div class="form-group">
//             <label for="menuCategory" class="col-form-label">Menu Category:</label>
//             <input type="text" class="form-control" id="menuCategory" value="${menu.menuCategory ? menu.menuCategory : ''}"></input>
//           </div>
//         </form>
//       </div>
//       <div class="modal-footer text-center" id="${menu.id}">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" id="${menu.id ? 'update' : 'submit'}" class="btn" style="background-color: #1c69b1; color: white; font-weight: bold;">Submit</button>
//       </div>
//     </div>
//   </div>`;
//   return domString;
// };

export default { displayAllMenus };
