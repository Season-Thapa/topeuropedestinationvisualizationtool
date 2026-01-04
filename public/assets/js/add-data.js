const BASE_URL = 'http://localhost:3000/destination';
const form = document.getElementById('destination-form');
const msgBox = document.getElementById('message-box');

function init() {
	form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
	e.preventDefault();
	showMessage("Saving...", "normal");

	const destinationData = {
		Destination: getValue('destination'),
		Country: getValue('country'),
		Region: getValue('region'),
		Category: getValue('category'),
		"Approximate Annual Tourists": getValue('tourists'),
		Currency: getValue('currency'),
		"Cost of Living": getValue('cost'),
		"Majority Religion": getValue('religion'),
		"Famous Foods": getValue('food'),
		Language: getValue('language'),
		"Best Time to Visit": getValue('bestTime'),
		Safety: getValue('safety'),
		"Cultural Significance": getValue('cultural'),
		Description: getValue('description'),
		Latitude: null,
		Longitude: null
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				destinationData.Latitude = position.coords.latitude;
				destinationData.Longitude = position.coords.longitude;
				sendDataToServer(destinationData,true);
			},
			(error) => {
				console.warn("Geolocation failed/denied:", error);
				sendDataToServer(destinationData,false);
			}
		);
	} else {

		sendDataToServer(destinationData,false);
	}
}

async function sendDataToServer(data,hasLocation) {
	try {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			const statusMessage = hasLocation
				? `Success! "${data.Destination}" added to database.`
				: `Success! "${data.Destination}" added to database without location.`;
			showMessage(statusMessage, "success");
			form.reset();
			setTimeout(() => {
				window.location.href = 'index.html';
			}, 1500);
		} else {
			const err = await response.json();
			showMessage(`Error: ${err.message || "Failed to save"}`, "error");
		}
	} catch (error) {
		console.error("Network error:", error);
		showMessage("Server connection failed", "error");
	}
}

function getValue(id) {
	const el = document.getElementById(id);
	return el ? el.value : "";
}

function showMessage(text, type) {
	msgBox.textContent = text;
	msgBox.classList.remove('hidden', 'success', 'error');

	if (type === 'success') msgBox.classList.add('success');
	if (type === 'error') msgBox.classList.add('error');
}

init();