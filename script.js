// OOP

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        this.resetErrors();
        this.validateInputs();
        if (Object.keys(this.errors).length > 0) {
            event.preventDefault();
            this.displayErrors()
        } else {
            console.log("Form submitted Successfully");
        }
    }

    validateInputs() {
        this.validateUsername();
        this.validateEmail();
        this.validatePassword();
    }

    validateUsername() {
        const input = this.form.querySelector('[name="username"]');
        if (!input.value) {
            this.addError('username', 'Username is required.');
        } else if (input.value.length < 5) {
            this.addError('username', 'Username must be at least 5 characters.');
        }
    }

    validateEmail() {
        const input = this.form.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.value) {
            this.addError('email', 'Email is required.');
        } else if (!emailRegex.test(input.value)) {
            this.addError('email', 'Please enter a valid email address.');
        }
    }

    validatePassword() {
        const input = this.form.querySelector('[name="password"]');
        if (!input.value) {
            this.addError('password', 'Password is required.');
        } else if (input.value.length < 8) {
            this.addError('password', 'Password must be at least 8 characters.');
        }
    }

    addError(field, message) {
        this.errors[field] = message;
    }

    resetErrors() {
        this.errors = {};
        this.form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    displayErrors() {
        for (const field in this.errors) {
            const errorElement = this.form.querySelector(`.error-message[data-for="${field}"]`);
            if (errorElement) {
                errorElement.textContent = this.errors[field];
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('profile-form');
});

// FP

Pure validation functions
const isRequired = (value) => value.trim() !== '' ? null : 'This field is required.';
const minLength = (min) => (value) => value.length >= min ? null : `Must be at least ${min} characters long.`;
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Please enter a valid email address.';

// Higher-order function to run a list of validators
const runValidators = (value, validators) => {
    for (const validator of validators) {
        const error = validator(value);
        if (error) {
            return error;
        }
    }
    return null;
};

// Main validation logic
const validateForm = (form) => {
    const formData = new FormData(form);
    const errors = {};

    const validationRules = {
        username: [isRequired, minLength(5)],
        email: [isRequired, isValidEmail],
        password: [isRequired, minLength(8)],
    };

    for (const [name, rules] of Object.entries(validationRules)) {
        const value = formData.get(name);
        const error = runValidators(value, rules);
        if (error) {
            errors[name] = error;
        }
    }
    return errors;
};

// UI handling logic
const handleFormSubmission = (event) => {
    event.preventDefault();
    const form = event.target;
    const errors = validateForm(form);

    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (Object.keys(errors).length > 0) {
        // Display new errors
        for (const field in errors) {
            const errorElement = form.querySelector(`.error-message[data-for="${field}"]`);
            if (errorElement) {
                errorElement.textContent = errors[field];
            }
        }
    } else {
        console.log('Form submitted successfully!');
        // Proceed with form submission logic (e.g., fetch request)
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');
    form.addEventListener('submit', handleFormSubmission);
});

// OOP
class Validator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
    }

    addField(fieldName, rules) {
        this.fields[fieldName] = rules;
    }

    validate() {
        let isValid = true;

        Object.keys(this.fields).forEach((fieldName) => {
            const field = document.getElementById(fieldName);
            const rules = this.fields[fieldName];
            const errorElement = document.getElementById(`${fieldName}Error`);
            console.log(errorElement);

            errorElement.textContent = '';

            rules.forEach((rule) => {
                if (!rule.validate(field.value)) {
                    errorElement.textContent = rule.message;
                    isValid = false;
                }
            });
        });
        return isValid;
    }
}


class Rule {
    constructor(validateFunc, message) {
        this.validate = validateFunc;
        this.message = message;
    }
}

// Create rules
const requiredRule = new Rule((value) => value.trim() !== '', 'This field is required');
const emailRule = new Rule((value) => /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), 'Invalid email address');

// Create validator
const form = document.getElementById("profile-form");
const validator = new Validator(form);

validator.addField('name', [requiredRule]);
validator.addField('email', [requiredRule, emailRule]);

// Validate form on submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validator.validate()) {
        console.log('Form is valid');
        // Proceed with form submission or further processing
    }
})

// FP

const form = document.getElementById("profile-form");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('username');
    const nameError = document.getElementById('nameError');
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';

    let isValid = true;

    // Validate name
    if (name.value.trim() === '') {
        nameError.textContent = 'Please enter your name';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Invalid email address';
        isValid = false;
    } else if (email.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        isValid = false;
    }

    if (isValid) {
        //Form is vvalid, proceed with submission or further processing
        console.log('Form is valid');
    }
});