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
				// Success: Add coordinates
				destinationData.Latitude = position.coords.latitude;
				destinationData.Longitude = position.coords.longitude;
				sendDataToServer(destinationData);
			},
			(error) => {
				console.warn("Geolocation failed/denied:", error);
				// Send anyway, just without coordinates
				sendDataToServer(destinationData);
			}
		);
	} else {
		// Geolocation not supported
		sendDataToServer(destinationData);
	}
}

async function sendDataToServer(data) {
	try {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			showMessage(`Success! "${data.Destination}" added to database.`, "success");
			form.reset();
		} else {
			const err = await response.json();
			showMessage(`Error: ${err.message || "Failed to save"}`, "error");
		}
	} catch (error) {
		console.error("Network error:", error);
		showMessage("Server connection failed", "error");
	}
}

// Helper to get value by ID cleanly
function getValue(id) {
	const el = document.getElementById(id);
	return el ? el.value : "";
}

// Helper to show UI messages
function showMessage(text, type) {
	msgBox.textContent = text;
	msgBox.classList.remove('hidden', 'success', 'error');

	if (type === 'success') msgBox.classList.add('success');
	if (type === 'error') msgBox.classList.add('error');
}

// Start
init();