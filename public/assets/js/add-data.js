import {tourDestinations} from "../../../logic/data/dataset.js";
const successMsg = document.getElementById('success-msg');
const form = document.getElementById('destination-form');

function init() {
	console.log(`destinations:${tourDestinations}`)
	form.addEventListener('submit', addDestinations);

}

async function addDestinations(e){
	e.preventDefault();

	const destinationData = {
		Destination: document.getElementById('destination').value,
		Country: document.getElementById('country').value,
		Region: document.getElementById('region').value,
		Category: document.getElementById('category').value,
		"Approximate Annual Tourists": document.getElementById('tourists').value,
		Currency: document.getElementById('currency').value,
		"Cost of Living": document.getElementById('cost').value,
		Latitude: null,
		Longitude: null,
	};
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				destinationData.Latitude = position.coords.latitude;
				destinationData.Longitude = position.coords.longitude;

				tourDestinations.push(destinationData);
				successMsg.textContent = `Destination "${destinationData.Destination}" added successfully!`;
				form.reset();
			},
			(error) => {
				console.warn("Geolocation failed, skipping coordinates.", error);
				tourDestinations.push(destinationData);
				successMsg.textContent = `Destination "${destinationData.Destination}" added (no coordinates).`;
				form.reset();
			}
		);
	} else {
		// Geolocation not supported
		tourDestinations.push(destinationData);
		successMsg.textContent = `Destination "${destinationData.Destination}" added (no coordinates).`;
		form.reset();
	}
}
init();
