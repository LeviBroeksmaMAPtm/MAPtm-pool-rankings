/*!
 * Serialize all form data into an object of key/value pairs
 * (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {Object}      The serialized form data
 */
const serializeObject = function (form) {
	const obj = {};
	Array.prototype.slice.call(form.elements).forEach(function (field) {
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
		if (field.type === 'select-multiple') {
			const options = [];
			Array.prototype.slice.call(field.options).forEach(function (option) {
				if (!option.selected) return;
				options.push(option.value);
			});
			if (options.length) {
				obj[field.name] = options;
			}
			return;
		}
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
		obj[field.name] = field.value;
	});
	return obj;
};


//
const validateForm = function (form) {
	const validityCheck = form.checkValidity();

	if (!validityCheck) {
		event.preventDefault();
		event.stopPropagation();
		form.classList.add("was-validated");
	} else {
		form.classList.remove("was-validated");
	}

	return validityCheck;
}
