const formatPhoneNumber = value => {
	if (!value) {
		return value;
	}

	// Clean input
	const phoneNumber = value.replace(/\D/g, '');

	const phoneNumberLength = phoneNumber.length;

	if (phoneNumberLength < 4) {
		return phoneNumber;
	}

	// If phoneNumberLength is greater than 4 and less the 7 return the formatted number.
	if (phoneNumberLength < 7) {
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
	}

	return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
		3,
		6,
	)}-${phoneNumber.slice(6, 10)}`;
};

const isValidPhoneNumber = phone => phone.match(
	'/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im',
);

export {formatPhoneNumber, isValidPhoneNumber};
