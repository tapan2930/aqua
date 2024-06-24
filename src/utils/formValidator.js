// FormValidator.js

const validateForm = (data, rules) => {
  let isValid = true;
  const newErrors = {};

  for (const fieldName in rules) {
    console.log(fieldName);
    const fieldValue = data[fieldName].trim();
    const fieldRules = rules[fieldName];

    const name = `${
      rules[fieldName]._name ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    }`;

    // Check if the field is required
    if (fieldRules.required && fieldValue === '') {
      newErrors[fieldName] = `${name} is required`;
      isValid = false;
    }

    // Add more validation rules as needed
    if (fieldRules.email && fieldValue !== '') {
      const emailRegex = /^\w+([\.-]?\w+)*(\+\w+)?@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!emailRegex.test(fieldValue)) {
        newErrors[fieldName] = `Invalid ${name} format`;
        isValid = false;
      }
    }
    // Check if the passwords match
    if (fieldRules.match && fieldValue !== data[fieldRules.match]) {
      newErrors[fieldName] = 'Passwords do not match';
      isValid = false;
    }
    // Add more custom validation rules here
    if (fieldRules.decimal && fieldValue !== '') {
      const decimalRegex = /^\d+(\.\d+)?$/;
      if (!decimalRegex.test(fieldValue)) {
        newErrors[fieldName] = `Invalid ${name} format`;
        isValid = false;
      }
    }

    if (fieldRules.integer && fieldValue !== '') {
      const integerRegex = /^\d+$/;
      if (!integerRegex.test(fieldValue)) {
        newErrors[fieldName] = `Invalid ${name} format`;
        isValid = false;
      }
    }
  }

  return {isValid, errors: newErrors};
};

export default validateForm;
