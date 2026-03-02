export interface WeatherData {
	location: { name: string };
	current: {
		temp_c: number;
		feelslike_c: number;
		humidity: number;
		wind_kph: number;
		vis_km: number;
		condition: { text: string };
	};
	forecast: {
		forecastday: Array<{
			date: string;
			day: {
				maxtemp_c: number;
				mintemp_c: number;
				daily_chance_of_rain: number;
				condition: { text: string; icon: string };
			};
		}>;
	};
}

export async function getWeather(city: string = "London"): Promise<WeatherData> {
	const res = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3&aqi=no`,
		{ next: { revalidate: 300 } },
	);
	if (!res.ok) throw new Error("Failed to fetch weather");
	return res.json();
}
