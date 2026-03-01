import Image from "next/image";

const ICONS: Record<string, string> = {
	Wind: "/wind.png",
	Humidity: "/drop.png",
	Visibility: "/view.png",
};

export function WeatherChip({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<div className="flex flex-col items-center justify-between m-2 h-full">
			<Image
				src={ICONS[label] ?? "/wind.png"}
				alt={label}
				width={30}
				height={30}
				className="mb-1"
			/>
			<p className="text-lg font-bold text-slate-900">{value}</p>
			<p className="text-md text-slate-700">{label}</p>
		</div>
	);
}
