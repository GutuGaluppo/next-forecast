"use client";

import { useTemperature } from "@/hooks/useTemperature";
import { WeatherData } from "@/lib/weather";
import { formatDay, weatherSummary } from "@/utils/weather";
import { ForecastCard } from "./ForecastCard";
import { WeatherMetric } from "./WeatherMetric";

export function WeatherCard({ data }: { data: WeatherData }) {
	const { location, current, forecast } = data;
	const temperature = useTemperature(current.temp_c);
	const summary = weatherSummary({
		realTemp: current.temp_c,
		feelsLike: current.feelslike_c,
		humidity: current.humidity,
		minTemp: forecast.forecastday[0].day.mintemp_c,
		maxTemp: forecast.forecastday[0].day.maxtemp_c,
	});

	return (
		<div className="flex flex-col items-center my-1.5 w-full h-full mx-auto">
			<h2 className="mb-3 text-4xl font-bold text-primary">{location.name}</h2>
			<p className="rounded-full px-4 py-1 bg-black/80 mb-2 text-white font-bold">
				{formatDay()}
			</p>
			<p className="text-xl text-secondary font-bold">
				{current.condition.text}
			</p>
			<h1 className="text-[14rem] font-medium text-primary leading-none">
				{temperature}°
			</h1>

			<div className="text-secondary mb-3 self-start">
				<h3 className="font-extrabold mb-2">Daily Summary</h3>
				<p>{summary}</p>
			</div>

			<div className="flex items-center justify-between w-full m-3 p-4 rounded-2xl bg-black/80 backdrop-blur-sm">
				<WeatherMetric label="Wind" value={`${current.wind_kph} km/h`} />
				<WeatherMetric label="Humidity" value={`${current.humidity}%`} />
				<WeatherMetric label="Visibility" value={`${current.vis_km} km`} />
			</div>

			<h3 className="font-bold text-primary mb-2 self-start">3-Day Forecast</h3>
			<div className="flex gap-3 w-full my-2">
				{forecast.forecastday.map((day) => (
					<ForecastCard key={day.date} day={day} />
				))}
			</div>
		</div>
	);
}
