import * as DataFetcher from './datafetcher.js';
const BASEURL = 'http://localhost:3000';

function  init(){
	barChart();
	doughnutchart();
	destinationsMap();
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
		new Chart(ctx, configuration);
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
	new Chart(ctx, configuration);
}
function getMarker(coordinate, destinationIcon = true) {
	const icon = L.icon({
		iconUrl: "images/marker.png",
		iconSize: [20, 30],
		iconAnchor: [10, 30],
	});
	return destinationIcon ? L.marker(coordinate, { icon }) : L.marker(coordinate);
}
function destinationsMap() {
	const coordinates = DataFetcher.getCenterLatLong();
	const map = L.map("destinations-map").setView([50.85045, 4.34878], 10);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
	const markers = coordinates.map((coordinate) => getMarker(coordinate));
	const markersGroup = L.featureGroup(markers).addTo(map);

	const bounds = markersGroup.getBounds();
	map.fitBounds(bounds);
}
init();

