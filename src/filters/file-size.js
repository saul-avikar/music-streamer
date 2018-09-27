import Vue from "vue";

// Coverts value from bytes to nearest SI Prefix and adds the appropriate extension.
export default Vue.filter("FormatFileSize", value => {
	let i = 0;

	// Compare every thousand multiple until the value is less
	for (; i <= 4; i ++) {
		if (value <= Math.pow(10, i * 3)) {
			// Jump beck so we end up in whole numbers
			i --;
			value /= Math.pow(10, i * 3);

			break;
		}
	}

	// Round to 1 d.p.
	value = value.toFixed(1);

	// Add the extention
	value += " ";
	switch (i) {
		case 0:
			value += "B";
			break;
		case 1:
			value += "KB";
			break;
		case 2:
			value += "MB";
			break;
		case 3:
			value += "GB";
			break;
		case 4:
			value += "TB";
			break;
		default:
			value = "Uknown Size";
	}

	return value;
});
