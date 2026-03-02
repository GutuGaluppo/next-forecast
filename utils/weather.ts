type WeatherTheme = { bg: string; dark: boolean };

export function getWeatherTheme(condition: string): WeatherTheme {
	const c = condition.toLowerCase();
	if (c.includes("rain"))
		return { bg: "bg-gradient-to-b from-blue-100 to-blue-300", dark: false };
	if (c.includes("sunny"))
		return {
			bg: "bg-gradient-to-b from-yellow-200 to-orange-400",
			dark: false,
		};
	if (c.includes("clear"))
		return { bg: "bg-gradient-to-b from-blue-200 to-blue-500", dark: false };
	if (c.includes("partly cloudy"))
		return { bg: "bg-gradient-to-b from-gray-600 to-gray-100", dark: true };
	if (c.includes("cloud"))
		return { bg: "bg-gradient-to-b from-gray-100 to-gray-400", dark: false };
	if (c.includes("snow"))
		return { bg: "bg-gradient-to-b from-white to-gray-300", dark: false };
	if (c.includes("thunder"))
		return { bg: "bg-gradient-to-b from-purple-900 to-purple-500", dark: true };
	if (c.includes("fog") || c.includes("mist"))
		return { bg: "bg-gradient-to-b from-gray-200 to-gray-500", dark: false };
	if (c.includes("haze"))
		return {
			bg: "bg-gradient-to-b from-yellow-100 to-yellow-400",
			dark: false,
		};
	if (c.includes("overcast"))
		return { bg: "bg-gradient-to-b from-gray-400 to-gray-700", dark: true };
	return { bg: "bg-zinc-50", dark: false };
}

export function formatDay(): string {
	return new Date().toLocaleDateString("en", {
		weekday: "long",
		day: "numeric",
		month: "long",
	});
}

export function formatDate(dateStr: string): string {
	return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en", {
		day: "numeric",
		month: "short",
	});
}

type DailySummaryParams = {
	realTemp: number;
	feelsLike: number;
	minTemp: number;
	maxTemp: number;
	humidity: number;
};

export function weatherSummary({
	realTemp,
	feelsLike,
	minTemp,
	maxTemp,
	humidity,
}: DailySummaryParams) {
	const diff = feelsLike - realTemp;

	// Feels Like vs Real Temperature
	let feelsSentence = "";

	if (diff >= 4) {
		feelsSentence = `Now it feels like ${feelsLike}°, while the actual temperature is ${realTemp}°. It feels significantly warmer.`;
	} else if (diff >= 1) {
		feelsSentence = `Now it feels like ${feelsLike}°, slightly warmer than the actual ${realTemp}°.`;
	} else if (diff <= -4) {
		feelsSentence = `Now it feels like ${feelsLike}°, even though the thermometer shows ${realTemp}°. It feels noticeably colder.`;
	} else if (diff <= -1) {
		feelsSentence = `Now it feels like ${feelsLike}°, slightly cooler than the actual ${realTemp}°.`;
	} else {
		feelsSentence = `The current temperature is ${realTemp}°, and it feels like ${feelsLike}°.`;
	}

	// Humidity Impact
	let humiditySentence = "";

	if (humidity > 70) {
		humiditySentence = `High humidity at ${humidity}% makes the air feel heavier.`;
	} else if (humidity >= 40) {
		humiditySentence = `Humidity is moderate at ${humidity}%, keeping conditions balanced.`;
	} else {
		humiditySentence = `With humidity at ${humidity}%, the air feels dry and light.`;
	}

	// Daily Range
	const rangeSentence = `Today, temperatures will range from ${minTemp}° to ${maxTemp}°.`;

	return [feelsSentence, humiditySentence, rangeSentence]
		.filter(Boolean)
		.join(" ");
}
