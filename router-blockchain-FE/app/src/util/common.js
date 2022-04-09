export const getUserAccount = () => {
    let userAccount = localStorage.getItem('userAccount');
    return JSON.parse(userAccount).account;
}