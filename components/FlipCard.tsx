"use client";

import { WeatherData } from "@/lib/weather";
import { useState } from "react";
import { Settings } from "./Settings";
import { WeatherCard } from "./WeatherCard";

export function FlipCard({ data }: { data: WeatherData }) {
	const [isFlipped, setIsFlipped] = useState(false);

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
				{isFlipped ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				)}
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
					<Settings isVisible={isFlipped} handleFlip={handleFlip} />
				</div>
			</div>
		</div>
	);
}
