import Image from "next/image";
import { formatDate } from "@/utils/weather";
import { useTemperature } from "@/hooks/useTemperature";

interface ForecastDay {
	date: string;
	day: {
		maxtemp_c: number;
		mintemp_c: number;
		daily_chance_of_rain: number;
		condition: { text: string; icon: string };
	};
}

export function ForecastCard({ day }: { day: ForecastDay }) {
	const temperature = useTemperature(day.day.maxtemp_c);
	return (
		<div className="flex flex-1 flex-col items-center rounded-2xl border-2 border-black/70 px-2 py-4">
			<p className="font-bold text-slate-900 text-xl">{temperature}°</p>
			<Image
				src={`https:${day.day.condition.icon}`}
				alt={day.day.condition.text}
				width={40}
				height={40}
			/>
			<p className="text-md font-bold text-slate-900">{formatDate(day.date)}</p>
		</div>
	);
}
