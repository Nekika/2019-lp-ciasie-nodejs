/*
    Ce module permet d'effectuer différentes opérations sur des données
 */

const moment = require('moment');

/**
 * Check a name format (characters only)
 * @param name : String - The name to check
 * @return boolean
 */
const checkName = function(name){
    const regex = new RegExp(/^[a-zA-Zàâäéèêëìîïòôöùûüÿ ]*$/)
    return regex.test(name)
};

/**
 * Check an email format (email@mail.fr)
 * @param email : String - The email to check
 * @return boolean
 */
const checkEmail = function(email){
    const regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    return regex.test(email)
};

/**
 * Check a date format (YYYY-MM-DD HH:MM:SS)
 * @param date : String - The date to check
 * @return boolean
 */
const checkDate = function (date) {
    return moment(date, 'YYYY-MM-DD HH:MM:SS').isValid()
};

/**
 * Check an id format - (integer)
 * @param id - Number - T
 * @return {boolean}
 */
const checkId = function (id) {
    const regex = new RegExp(/\d*/);
    return regex.test(id)
};

/**
 * Check if the items list is not empty
 * @param items - The items list
 * @return number
 */
const checkItems = function (items) {
    return items.length
};


const Data = {
    /**
     * Proceed all tests
     * @param data - The data to test
     * @return boolean
     */
    isValid: function (data) {
        const name = data.name;
        const email = data.mail;
        const date = data.livraison;
        const items = data.items;
        const id = data.id;
        if (!(name && email && date)){
            return false
        }
        if (!checkName(name)){
            return false
        }
        if (!checkEmail(email)){
            return false
        }
        if (!checkDate(date)){
            return false
        }
        if (id && !checkId(id)){
            return false
        }
        if (!checkItems(items)){
            return false
        }
        return true
    }
};

module.exports = Data;

