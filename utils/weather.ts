export function getBackgroundColor(condition: string): string {
	const c = condition.toLowerCase();
	if (c.includes("rain")) return "bg-gradient-to-b from-blue-100 to-blue-300";
	if (c.includes("sunny")) return "bg-gradient-to-b from-yellow-200 to-orange-400";
	if (c.includes("cloud")) return "bg-gradient-to-b from-gray-100 to-gray-400";
	return "bg-zinc-50 dark:bg-black";
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

export function weatherSummary(feelsLike: number, actualTemp: number): string {
	const diff = feelsLike - actualTemp;
	if (diff > 3) return `Feels warmer than it is — actual ${actualTemp}°, feels like ${feelsLike}°.`;
	if (diff < -3) return `Feels colder than it is — actual ${actualTemp}°, feels like ${feelsLike}°.`;
	return `Temperature feels as expected at ${actualTemp}°.`;
}
