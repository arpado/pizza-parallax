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

async function getUser(userID) {
    return await supabase.from("profiles").select('id, first_name, last_name').eq("id", userID);
}

export { registerWithEmail, postLoginForm, postSignOut, getUser }