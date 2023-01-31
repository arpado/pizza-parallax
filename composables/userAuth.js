import supabase from "./supabaseClient";

// built-in supabase register function
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

// built-in supabase login function
async function postLoginForm(email, password) {
    return await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
}

// built-in supabase logout function
async function postSignOut() {
    return await supabase.auth.signOut();
}

// gets the user data from the public schema, but cannot access data from the users table in the auth schema due to supabase restrictions
async function getUserData(userID) {
    return await supabase.from("profiles").select('id, first_name, last_name, address').eq("id", userID);
}

// updates user data in the public schema, helperObj has to be used to make the column selectable
async function updateUserData(table, column, data, userId) {
    let helperObj = {}
    helperObj[column] = data
    return await supabase
        .from(table)
        .update(helperObj)
        .eq('id', userId)
}

// updates user data in the auth schema, helperObj has to be used to make the column selectable
async function updateProfileData(column, data) {
    let helperObj = {}
    helperObj[column] = data
    return await supabase.auth.updateUser(helperObj)
}

// -- to be modified later -- delete profile, but this has to be done on the server later on for security reasons
async function deleteProfileData(userId) {
    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)
}


export { registerWithEmail, postLoginForm, postSignOut, getUserData, updateUserData, updateProfileData, deleteProfileData }