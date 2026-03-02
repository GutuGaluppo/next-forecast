import Image from "next/image";

type Icon = { src: string; animated: boolean };

const ICONS: Record<string, Icon> = {
	Wind: { src: "/animated/wind.gif", animated: true },
	Humidity: { src: "/animated/humidity.gif", animated: true },
	Visibility: { src: "/animated/view.gif", animated: true },
};

export function WeatherMetric({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	const icon = ICONS[label] ?? ICONS.Wind;

	return (
		<div className="flex flex-col items-center justify-between m-2 h-full w-full">
			<Image
				src={icon.src}
				alt={label}
				width={40}
				height={40}
				unoptimized={icon.animated}
				className={`mb-1 ${icon.animated ? "" : "filter invert"}`}
			/>
			<p className="text-lg font-bold text-white">{value}</p>
			<p className="text-md text-white">{label}</p>
		</div>
	);
}
