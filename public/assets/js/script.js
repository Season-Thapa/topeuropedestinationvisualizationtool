const BASEURL = 'http://localhost:3000';
let myBarChart = null;
let myDoughnutChart = null;
let myMap = null;
let markerGroup = null
function  init(){
	loadAllCharts();
	setupRealtimeListener();
}
function loadAllCharts() {
	barChart();
	doughnutchart();
	destinationsMap();
}
function setupRealtimeListener() {
	const socket = new WebSocket('ws://localhost:3000');
	socket.onopen = () => {
		console.log("Connected to Real-Time Server");
	};

	socket.onmessage = (event) => {
		const msg = JSON.parse(event.data);
		if (msg.type === 'UPDATE') {
			console.log("New data received! Updating charts...");
			loadAllCharts();
		}
	};
}
async function barChart(){
	const ctx = document.querySelector("#bar-chart").getContext("2d");
	const data = await fetch(`${BASEURL}/destinations/bycountry`).then(res => res.json());
	const labels = data.map(item => item.country);
	const values = data.map(item => item.total);
		const configuration = {
			type: "bar",
			data: {
				labels,
				datasets: [
					{
						label: "Destinations Per Country",
						data: values,
						backgroundColor: "skyblue",
					},
				],
			},
		};
	if (myBarChart) myBarChart.destroy();
	myBarChart = new Chart(ctx, configuration);
	}
async function doughnutchart() {
	const ctx = document.querySelector("#doughnut-chart").getContext("2d");
	const data = await fetch(`${BASEURL}/destinations/byLivingCost`).then(res => res.json());

	const labels = data.map(item => item.cost_of_living);
	const values = data.map(item => item.total);
	const configuration = {
		type: "doughnut",
		data: {
			labels,
			datasets: [
				{
					data:values,
					backgroundColor: ["#FF5722", "#FF9800", "#9C27B0", "#4CAF50","gray","beige"],
				},
			],
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: "Destinations by Cost of Living",
					font: {
						size: 24,
					},
				},
			},
		},
	};
	if (myDoughnutChart) myDoughnutChart.destroy();
	myDoughnutChart = new Chart(ctx, configuration);
}
function getMarker(lat,long,title) {
	const icon = L.icon({
		iconUrl: "assets/images/marker.png",
		iconSize: [20, 30],
		iconAnchor: [10, 30],
		popupAnchor: [0, -30]
	});

	const marker = L.marker([lat, long], { icon: icon });
	marker.bindPopup(`<b>${title}</b>`);

	return marker;
}
async function destinationsMap() {
	if (!myMap) {
		myMap = L.map("destinations-map").setView([50.85045, 4.34878], 4);

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(myMap);
		markerGroup = L.featureGroup().addTo(myMap);
	}
	try {
		const response = await fetch(`${BASEURL}/destinations/coordinates`);
		const locations = await response.json();
		markerGroup.clearLayers();
		const markers = locations.map(loc => {
			if (loc.latitude && loc.longitude) {
				return getMarker(loc.latitude, loc.longitude, loc.destination);
			}
		}).filter(marker => marker !== undefined);

		if (markers.length > 0) {
			const markersGroup = L.featureGroup(markers).addTo(myMap);
			myMap.fitBounds(markersGroup.getBounds());
		}

	} catch (error) {
		console.error("Error loading map locations:", error);
	}
}
init();

