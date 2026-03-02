"use client";

import { useSearchHistory } from "@/hooks/useSearchHistory";
import { WeatherData } from "@/lib/weather";
import { useEffect, useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { WeatherCard } from "./WeatherCard";
import { GearIcon } from "./ui/GearIcon";
import { BackArrowIcon } from "./ui/BackArrowIcon";

export function FlipCard({ data }: { data: WeatherData }) {
	const [isFlipped, setIsFlipped] = useState(false);
	const { history, add, clear } = useSearchHistory();

	useEffect(() => {
		add(data.location.name, Math.round(data.current.temp_c));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.location.name]);

	const handleFlip = () => {
		setIsFlipped((f) => !f);
	};

	return (
		<div className="relative w-full" style={{ perspective: "1200px" }}>
			<button
				onClick={() => handleFlip()}
				aria-label={isFlipped ? "Close settings" : "Open settings"}
				className="absolute top-0 right-0 z-10 text-slate-700 hover:text-slate-900 transition-colors"
			>
				{isFlipped ? <BackArrowIcon /> : <GearIcon />}
			</button>

			<div
				className="relative w-full transition-transform duration-700"
				style={{
					transformStyle: "preserve-3d",
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
			>
				{/* Front */}
				<div style={{ backfaceVisibility: "hidden" }}>
					<WeatherCard data={data} />
				</div>

				{/* Back */}
				<div
					className="absolute inset-0 w-full"
					style={{
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					<SearchPanel
						isVisible={isFlipped}
						handleFlip={handleFlip}
						history={history}
						clear={clear}
					/>
				</div>
			</div>
		</div>
	);
}
