import supabase from "./supabaseClient";

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

async function sendOrder(orderedArray) {
  // main: insert user id & ordered items into user_order_JUNK
  let user = {};
  // get logged in user data from localstorage
  const userJSON = localStorage.getItem('sb-qykublxyqkhmvdpnkezp-auth-token')
  if (userJSON) {
    user = JSON.parse(userJSON)
    console.log(user.user.id)
  } else {
    console.log('No user found!')
  }
  // collect orders
  orderedArray.forEach(async (elem, index) => {
    if (elem.selectedOptions.length) {
      elem.selectedOptions.forEach(async option => {
        const { error } = await supabase
          .from('order')
          .insert({ user_id: user.user.id, item_id: elem.id, item_quantity: elem.quantity, item_option: option });
        if (error) {
          console.log(error);
        }
      })
    } else {
      const { error } = await supabase
        .from('order')
        .insert({ user_id: user.user.id, item_id: elem.id, item_quantity: elem.quantity, item_option: null });
    }
  })
}

export { getItemData, sendOrder }