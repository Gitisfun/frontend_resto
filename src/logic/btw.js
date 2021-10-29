function getAllCodes(list) {
  let codes = [];
  let temp = [];

  for (let i = 0; i < list.length; i++) {
    if (!codes.includes(list[i].btw_category)) {
        codes.push(list[i].btw_category);
        temp.push({
            code: list[i].btw_category,
            tarive: list[i].btw_name,
            percentage: list[i].btw_percentage,
            amount: list[i].quantity * list[i].product_price
        })
    }
    else if(codes.includes(list[i].btw_category)){
        const index = findIndexByCode(temp, list[i].btw_category)
        if(index != -1){
            temp[index].amount += (list[i].quantity * list[i].product_price)
        }
    }
  }

  temp = calculateBtw(temp)

  return temp;
}

function findIndexByCode(list, search){
    for(let i = 0; i < list.length; i++){
        if(list[i].code == search){
            return i
        }
    }
    return -1
}

function calculateBtw(list){
    for(let i = 0; i < list.length; i++){
        list[i].btwAmount = (list[i].amount * list[i].percentage).toFixed(2)
        list[i].baseAmount = (list[i].amount - list[i].btwAmount).toFixed(2)
        
    }
    return list
}


export default {
  getAllCodes,
};
