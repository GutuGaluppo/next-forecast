"use client";

import { HistoryEntry } from "@/hooks/useSearchHistory";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SearchPanel({
	isVisible,
	handleFlip,
	history,
	clear,
}: {
	isVisible: boolean;
	handleFlip: () => void;
	history: HistoryEntry[];
	clear: () => void;
}) {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const [listMaxHeight, setListMaxHeight] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		if (isVisible) {
			const id = setTimeout(() => inputRef.current?.focus(), 400);
			return () => clearTimeout(id);
		}
	}, [isVisible]);

	useEffect(() => {
		function updateHeight() {
			if (listRef.current) {
				const top = listRef.current.getBoundingClientRect().top;
				setListMaxHeight(window.innerHeight - top - 100);
			}
		}
		if (isVisible) updateHeight();
		window.addEventListener("resize", updateHeight);
		return () => window.removeEventListener("resize", updateHeight);
	}, [isVisible]);

	function handleSubmit(e: React.BaseSyntheticEvent) {
		e.preventDefault();
		const city = (
			(e.currentTarget as HTMLFormElement).elements.namedItem(
				"city",
			) as HTMLInputElement
		).value.trim();
		if (city) {
			router.push(`/?city=${encodeURIComponent(city)}`);
		}
		handleFlip();
		e.currentTarget.reset();
	}

	function handleSelect(entry: HistoryEntry) {
		router.push(`/?city=${encodeURIComponent(entry.city)}`);
		handleFlip();
	}

	return (
		<div className="relative flex flex-col w-full h-full gap-4 pt-12 px-8 overflow-hidden">
			<Image
				src="/pixeliota-mkARVg4-BQ4-unsplash.png"
				alt=""
				fill
				className="object-cover -z-10"
				priority
			/>
			<button
				onClick={handleFlip}
				aria-label="Flip back"
				className="absolute top-8 right-8 z-10 hover:opacity-70 transition-opacity"
			>
				<Image src="/flip.png" alt="Flip back" width={24} height={24} />
			</button>
			<h2 className="text-xl font-bold text-slate-900">Search</h2>

			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					ref={inputRef}
					name="city"
					type="text"
					placeholder="Enter city name"
					className="w-full rounded-md border-2 border-secondary bg-slate-900 text-amber-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
				/>
				<button
					type="submit"
					className="rounded-md bg-slate-800 px-4 py-2 text-white hover:bg-slate-600"
				>
					Search
				</button>
			</form>

			{history.length > 0 && (
				<>
					<div className="flex justify-between items-center my-4">
						<h3 className="font-semibold text-slate-700 text-sm">Recentes</h3>
						<button
							onClick={clear}
							className="text-red-400 hover:text-red-600 transition-colors"
							aria-label="Limpar histórico"
						>
							<Image
								src="/data-cleaning.png"
								alt="Limpar histórico"
								width={20}
								height={20}
							/>
						</button>
					</div>
					<ul
						ref={listRef}
						style={{ maxHeight: listMaxHeight }}
						className="flex flex-col gap-1 overflow-y-auto"
					>
						{history.map((entry) => (
							<li
								key={entry.city}
								className="glassmorphism rounded-xl mb-4 py-2 px-1"
							>
								<button
									onClick={() => handleSelect(entry)}
									className="w-full text-left px-3 py-2 rounded-lg text-slate-800 hover:bg-white/60 transition-colors text-3xl flex justify-between items-center"
								>
									<span>{entry.city}</span>
									{entry.temperature !== undefined && (
										<span className="text-slate-700 font-bold">
											{entry.temperature}°
										</span>
									)}
								</button>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
