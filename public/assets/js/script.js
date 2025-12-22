import * as DataFetcher from './datafetcher.js';
function  init(){
	barChart();
	doughnutchart();
}
function barChart(){
	const ctx = document.querySelector("#bar-chart").getContext("2d");
	const data = DataFetcher.getDestinationsPerCountry();
	const labels = Object.keys(data);
	const values = Object.values(data);
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
function doughnutchart() {
	const ctx = document.querySelector("#doughnut-chart").getContext("2d");
	const data = DataFetcher.getDestinationsByLivingCost();

	const configuration = {
		type: "doughnut",
		data: {
			labels: Object.keys(data),
			datasets: [
				{
					data: Object.values(data),
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
init();

