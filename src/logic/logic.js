function findIndexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return i;
    }
  }
  return -1;
}

function removeAtIndex(list, index) {
  if (index > -1) {
    list.splice(index, 1);
  }
  return list;
}

function removeItemById(list, id) {
  const index = findIndexById(list, id);
  return removeAtIndex(list, index);
}

function getAllKeys(obj) {
  return Object.keys(obj);
}

function getAllValues(obj) {
  return Object.values(obj);
}

function replaceNullByZero(val) {
  if (val) {
    return val;
  }
  return "0";
}

export default { findIndexById, removeAtIndex, removeItemById, getAllKeys, getAllValues, replaceNullByZero };
