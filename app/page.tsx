import { FlipCard } from "@/components/FlipCard";
import { getWeather } from "@/lib/weather";
import { getBackgroundColor } from "@/utils/weather";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ city?: string }>;
}) {
	const { city = "London" } = await searchParams;
	const data = await getWeather(city);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
			<main
				className={`relative flex min-h-screen w-full max-w-xl flex-col items-center px-10 py-20 ${getBackgroundColor(data.current.condition.text)} sm:items-start`}
			>
				<FlipCard data={data} />
			</main>
		</div>
	);
}
