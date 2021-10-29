function convertToBackend(menu) {
  let tempSubmenus = [];
  let tempMenuItems = [];
  for (let i = 0; i < menu.submenus.length; i++) {
    tempSubmenus.push({
      id: menu.submenus[i].id,
      name: menu.submenus[i].name,
      order: i,
      lengthOfItems: menu.submenus[i].items.length,
    });
    for (let j = 0; j < menu.submenus[i].items.length; j++) {
      tempMenuItems.push({
        order_nr: j,
        menu_id: -1,
        submenu_id: menu.submenus[i].id,
        product_id: menu.submenus[i].items[j].product_id,
      });
    }
  }
  menu.submenus_length = menu.submenus.length;
  menu.orderedList = JSON.stringify(tempSubmenus);
  menu.menu_items = tempMenuItems;
  return menu;
}

function convertToFrontend(tempMenu, tempMenuItems) {
  let temp = {};
  temp.id = tempMenu.id
  temp.name = tempMenu.name;
  temp.currentlyActive = tempMenu.currentlyActive;
  temp.description = tempMenu.description
  temp.horeca_id = tempMenu.horeca_id
  temp.start_time = tempMenu.start_time
  temp.end_time = tempMenu.end_time
  let tempSubmenus = JSON.parse(tempMenu.submenus);
  temp.submenus = tempSubmenus;
  
  let smallestId = -1;
  for(let i = 0; i < temp.submenus.length; i++){
    if(temp.submenus[i].id <= smallestId){
      smallestId = temp.submenus[i].id - 1
    }
  }
  temp.itemCount = smallestId 

  for (let i = 0; i < temp.submenus.length; i++) {
    temp.submenus[i].items = [];
    for (let j = 0; j < tempMenuItems.length; j++) {
      if (temp.submenus[i].id == tempMenuItems[j].submenu_id) {
        temp.submenus[i].items.push(tempMenuItems[j]);
      }
    }
  }
  return temp;
}

export default { convertToBackend, convertToFrontend };
