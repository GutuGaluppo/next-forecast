import Image from "next/image";

const ICONS: Record<string, string> = {
	Wind: "/wind.png",
	Humidity: "/drop.png",
	Visibility: "/view.png",
};

export function WeatherMetric({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<div className="flex flex-col items-center justify-between m-2 h-full w-full">
			<Image
				src={ICONS[label] ?? "/wind.png"}
				alt={label}
				width={30}
				height={30}
				className="mb-1 filter invert"
			/>
			<p className="text-lg font-bold text-white">{value}</p>
			<p className="text-md text-white">{label}</p>
		</div>
	);
}
