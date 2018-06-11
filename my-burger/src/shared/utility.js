export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    };
};

export const checkValidity = (value, rules) => {
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const numericPattern = /^\d+$/;

    return (
        (rules.required ? value.trim() !== '' : true) &&
        (rules.minLength ? value.length >= rules.minLength : true) &&
        (rules.maxLength ? value.length <= rules.maxLength : true) &&
        (rules.isEmail ? emailPattern.test(value) : true) &&
        (rules.isNumeric ? numericPattern.test(value) : true)
    );
}