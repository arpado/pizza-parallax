import supabase from "./supabaseClient";

// Fetches the item(s) from the selected table. 
// First param is the name of the table to fetch the data from, second is the name(s) of the column(s) to be returned,
// third is an optional set of parameters for filtering the fetch, fourth is the param to set an order by.
async function getItemData(table, selectedParams, matchParams, orderByParam = 'id') {

  if (!matchParams) {
    return await supabase.from(table).select(selectedParams).order(orderByParam);
  }

  let concatenatedMatch = ''
  for (let i = 0; i < matchParams.length; i++) {
    let nextParam = `${Object.keys(matchParams[i])}.eq.${Object.values(matchParams[i])}`
    if (concatenatedMatch === '') {
      concatenatedMatch = nextParam
    } else {
      concatenatedMatch = concatenatedMatch.concat(',', nextParam)
    }
  }

  return await supabase.from(table).select(selectedParams).or(concatenatedMatch).order(orderByParam);
}

// Sends an array of items ordered by the current user and the users ID to the back-end.
async function sendOrderData(orderedArray, userId) {

  orderedArray.forEach(async (elem, index) => {
    // if the item has one or more optional quality/trait/option (eg.: extra toppings for pizzas) goes through them and makes a new row for each of those in the database
    // else makes only on row with null value for the optional pick
    
    // SHOULD BE REDONE WITH BULK CREATE:
    // const { error } = await supabase
    //   .from('countries')
    //   .insert([
    //     { id: 1, name: 'Nepal' },
    //     { id: 1, name: 'Vietnam' },
    //   ])

    if (elem.selectedOptions.length) {
      elem.selectedOptions.forEach(async option => {
        const { error } = await supabase
          .from('orders')
          .insert({ order_item_id: elem.orderUnitId, user_id: userId, item_id: elem.id, item_quantity: elem.quantity, item_option: option });
        if (error) {
          return error;
        }
      })
    } else {
      const { error } = await supabase
        .from('orders')
        .insert({ order_item_id: elem.orderUnitId, user_id: userId, item_id: elem.id, item_quantity: elem.quantity, item_option: null });
      if (error) {
        return error;
      }
    }
  })
}

// gets the list of orders made by the user
async function getOrderHistory(userId) {
  return await supabase.from('orders').select().eq('user_id', userId)
}

export { getItemData, sendOrderData, getOrderHistory }