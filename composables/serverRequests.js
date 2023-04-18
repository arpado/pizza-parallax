import supabase from "./supabaseClient";
import { v4 as uuidv4 } from 'uuid';

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

  let orderItemArray = [];
  try {
    for (let i = 0; i < orderedArray.length; i++) {
      let elem = orderedArray[i]
      // await orderedArray.forEach(async (elem, index) => {
      // if the item has one or more optional quality/trait/option (eg.: extra toppings for pizzas) goes through them and makes a new row for each of those in the database
      // else makes only on row with null value for the optional pick

      // SHOULD BE REDONE WITH BULK CREATE:
      // const { error } = await supabase
      //   .from('countries')
      //   .insert([
      //     { id: 1, name: 'Nepal' },
      //     { id: 1, name: 'Vietnam' },
      //   ])

      for (const [key, value] of Object.entries(elem.selectedProps)) {
        if (key === 'size') {
          let { error } = await supabase.rpc('insert_order_item_size', { order_unit_table: elem.table, order_unit_id: elem.orderUnitId, elem_id: elem.id, elem_size: value })
          if (error) throw error
        } else {
          let { error } = await supabase.rpc('insert_order_item_prop', { order_unit_table: elem.table, order_unit_id: elem.orderUnitId, elem_id: elem.id, elem_option_type: 'prop', elem_option_name: 'crusts', elem_option_value: value })
          if (error) throw error
        }
      }

      if (elem.selectedOptions.length) {
        for (let i = 0; i < elem.selectedOptions.length; i++) {
          let { error } = await supabase.rpc('insert_order_item_options', { order_unit_table: elem.tablee, order_unit_id: elem.orderUnitId, elem_id: elem.id, elem_option_type: 'option', elem_option_name: 'topping', elem_option_value: elem.selectedOptions[i] })
          if (error) throw error
        }
      }
      orderItemArray.push({ id: elem.orderUnitId, quantity: elem.quantity })
    }
    // stamp order id
    // call function to sum the price for the order all together
    // for each orderItemId -> reduce price
    let orderId = uuidv4();

    for (let i = 0; i < orderItemArray.length; i++) {
      let { error } = await supabase.rpc('insert_into_orders_master', { user_id_value: userId, order_id_value: orderId, item_id_value: orderItemArray[i].id, item_quantity_value: orderItemArray[i].quantity })
      if (error) throw error
    }

    // follow order here
    await supabase.rpc('get_order_total_price', { user_id_value: userId, order_id_value: orderId })
    if (error) throw error
  } catch (error) {
    console.error("Error cought: ", error)
    return error.message
  }
}

// gets the list of orders made by the user
async function getUserOrderHistory(userId) {
  return await supabase.rpc('get_orders_data', {user_id_value: userId})
}

// gets all orders
async function getAllOrderHistory() {
  return await supabase.from('orders_master').select() //.eq('user_id', userId)
}

export { getItemData, sendOrderData, getUserOrderHistory, getAllOrderHistory }