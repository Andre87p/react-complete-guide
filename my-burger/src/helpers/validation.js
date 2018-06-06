const checkValidity = (value, rules) => {
	return (
		(rules.required ? value.trim() !== '' : true) &&
		(rules.minLength ? value.length >= rules.minLength : true) &&
		(rules.maxLength ? value.length <= rules.minLength : true)
	);
}
export { checkValidity };