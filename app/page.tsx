import { FlipCard } from "@/components/FlipCard";
import { getWeather } from "@/lib/weather";
import { getWeatherTheme } from "@/utils/weather";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ city?: string }>;
}) {
	const { city = "London" } = await searchParams;
	const data = await getWeather(city);
	const { bg, dark } = getWeatherTheme(data.current.condition.text);

	return (
		<div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-black">
			<main
				className={`relative flex h-full w-full max-w-xl flex-col items-center justify-center ${bg} ${dark ? "weather-dark" : "weather-light"} sm:items-start`}
			>
				<FlipCard data={data} />
			</main>
		</div>
	);
}
