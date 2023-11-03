import {User} from "../models/auth.models";

/**
 * @returns registered user list
 */
function getAllUsers(): User[] {
    return JSON.parse(sessionStorage.getItem('users')!);
}


/**
 * Returns the current user
 */
function loggedInUser(): User | null {
    let user: User | null = {};
    user = JSON.parse(sessionStorage.getItem('currentUser')!);
    return user;
}

export { getAllUsers, loggedInUser }

