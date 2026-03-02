"use client";

import { HistoryEntry } from "@/hooks/useSearchHistory";
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
	}

	function handleSelect(entry: HistoryEntry) {
		router.push(`/?city=${encodeURIComponent(entry.city)}`);
		handleFlip();
	}

	return (
		<div className="flex flex-col w-full min-h-full pt-12 gap-4">
			<h2 className="text-xl font-bold text-slate-900">Search</h2>

			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					ref={inputRef}
					name="city"
					type="text"
					placeholder="Enter city name"
					className="w-full rounded-md border px-4 py-2 text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-600"
				/>
				<button
					type="submit"
					className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
				>
					Search
				</button>
			</form>

			{history.length > 0 && (
				<div>
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-semibold text-slate-700 text-sm">Recentes</h3>
						<button
							onClick={clear}
							className="text-xs text-red-500 hover:text-red-700 transition-colors"
						>
							Limpar
						</button>
					</div>
					<ul
						ref={listRef}
						style={{ maxHeight: listMaxHeight }}
						className="flex flex-col gap-1 overflow-y-auto p-3"
					>
						{history.map((entry) => (
							<li
								key={entry.city}
								className="shadow-xl shadow-secondary rounded-xl mb-6 py-4 px-2"
							>
								<button
									onClick={() => handleSelect(entry)}
									className="w-full text-left px-3 py-2 rounded-lg text-slate-800 hover:bg-white/60 transition-colors text-3xl flex justify-between items-center"
								>
									<span>{entry.city}</span>
									{entry.temperature !== undefined && (
										<span className="text-slate-500 font-bold">
											{entry.temperature}°
										</span>
									)}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
