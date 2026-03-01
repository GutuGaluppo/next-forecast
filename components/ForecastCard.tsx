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
		<div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-white/80 backdrop-blur-sm px-2 py-4">
			<p className="text-sm font-bold text-slate-900">{formatDate(day.date)}</p>
			<Image
				src={`https:${day.day.condition.icon}`}
				alt={day.day.condition.text}
				width={40}
				height={40}
			/>
			<span className="font-bold text-slate-900">{temperature}°</span>
			<p className="text-xs text-blue-500">
				{day.day.daily_chance_of_rain}% rain
			</p>
		</div>
	);
}
