const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

/**
 * Validates if an email is valid.
 *
 * @param {string} email - The email to be validated.
 * @return {void} This function does not return a value.
 */
function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email)
    } else {
        showError(email, 'Email is not valid')
    }
}

/**
 * Capitalizes the first letter of a given input name.
 *
 * @param {Object} input - The input object containing a name property.
 * @return {String} The input name with the first letter capitalized.
 */
function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1)
}

/**
 * Checks if the required fields in the input array are filled.
 *
 * @param {Array} inputArr - The array of input fields to check.
 * @return {undefined} This function does not return a value.
 */
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

/**
 * Checks the length of an input value and displays an error message if it is outside the specified range.
 *
 * @param {object} input - The input element to check the length of.
 * @param {number} min - The minimum length allowed for the input value.
 * @param {number} max - The maximum length allowed for the input value.
 */
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters.`)
    }
}

function checkMatchedPassword(p1,p2){
    if(p1.value !== p2.value){
        showError(p2,'Passwords do not match')
    } else {
        showSuccess(p2)
    }
}

// Event listners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 20)
    checkEmail(email)
    checkMatchedPassword(password, password2)
});