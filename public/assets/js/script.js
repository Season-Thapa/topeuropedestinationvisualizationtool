import * as DataFetcher from './datafetcher.js';
function  init(){
	barChart();
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
						label: "Destinations",
						data: values,
						backgroundColor: "skyblue",
					},
				],
			},
		};
		new Chart(ctx, configuration);
	}
init();

