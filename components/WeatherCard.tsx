"use client";

import { useTemperature } from "@/hooks/useTemperature";
import { WeatherData } from "@/lib/weather";
import { formatDay, weatherSummary } from "@/utils/weather";
import { ForecastCard } from "./ForecastCard";
import { WeatherChip } from "./WeatherChip";

export function WeatherCard({ data }: { data: WeatherData }) {
	const { location, current, forecast } = data;
	const temperature = useTemperature(current.temp_c);

	return (
		<div className="flex flex-col items-center my-1.5 w-full h-full mx-auto">
			<h2 className="mb-3 text-4xl font-extrabold text-slate-950">
				{location.name}
			</h2>
			<p className="text-slate-700">{formatDay()}</p>
			<p className="text-slate-700 font-bold">{current.condition.text}</p>
			<h1 className="text-[10rem] font-bold text-slate-950 font-inter">
				{temperature}°
			</h1>

			<div className="text-slate-700 my-3">
				<h3 className="font-bold">Daily Summary</h3>
				<p>{weatherSummary(current.feelslike_c, current.temp_c)}</p>
			</div>

			<div className="flex items-center justify-between w-full m-3 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-sm">
				<WeatherChip label="Wind" value={`${current.wind_kph} km/h`} />
				<WeatherChip label="Humidity" value={`${current.humidity}%`} />
				<WeatherChip label="Visibility" value={`${current.vis_km} km`} />
			</div>

			<div className="flex gap-3 w-full my-2">
				{forecast.forecastday.map((day) => (
					<ForecastCard key={day.date} day={day} />
				))}
			</div>
		</div>
	);
}
