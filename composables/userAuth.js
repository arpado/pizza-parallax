import supabase from "./supabaseClient";

async function registerWithEmail(email, password, firstName, lastName, address) {
    return await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                firstname: firstName,
                lastname: lastName,
                address: address,
            },
        },
    });
}

async function postLoginForm(email, password) {
    return await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
}

async function postSignOut() {
    return await supabase.auth.signOut();
}

async function getUserData(userID) {
    return await supabase.from("profiles").select('id, first_name, last_name, address').eq("id", userID);
}

async function updateUserData(table, column, data, userId) {
    let helperObj = {}
    helperObj[column] = data
    return await supabase
        .from(table)
        .update(helperObj)
        .eq('id', userId)
}

async function updateProfileData(column, data) {
    let helperObj = {}
    helperObj[column] = data
    return await supabase.auth.updateUser(helperObj)
}

// this has to be done on the server
async function deleteProfileData(userId) {
    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)
}


export { registerWithEmail, postLoginForm, postSignOut, getUserData, updateUserData, updateProfileData, deleteProfileData }