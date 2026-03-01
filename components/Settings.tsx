"use client";

import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function Settings({
	isVisible,
	handleFlip,
}: {
	isVisible: boolean;
	handleFlip: () => void;
}) {
	const router = useRouter();
	const { history, add, clear } = useSearchHistory();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isVisible) {
			const id = setTimeout(() => inputRef.current?.focus(), 400);
			return () => clearTimeout(id);
		}
	}, [isVisible]);

	function handleSubmit(e: React.BaseSyntheticEvent) {
		e.preventDefault();
		const city = (
			(e.currentTarget as HTMLFormElement).elements.namedItem(
				"city",
			) as HTMLInputElement
		).value.trim();
		if (city) {
			add(city);
			router.push(`/?city=${encodeURIComponent(city)}`);
		}
		handleFlip();
	}

	function handleSelect(city: string) {
		add(city);
		router.push(`/?city=${encodeURIComponent(city)}`);
	}

	return (
		<div className="flex flex-col w-full min-h-full pt-12 gap-4">
			<h2 className="text-xl font-bold text-slate-900">Search</h2>

			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					ref={inputRef}
					name="city"
					type="text"
					placeholder="Digite uma cidade..."
					className="w-full rounded-md border px-4 py-2 text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					type="submit"
					className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
				>
					Buscar
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
					<ul className="flex flex-col gap-1">
						{history.map((city) => (
							<li key={city}>
								<button
									onClick={() => handleSelect(city)}
									className="w-full text-left px-3 py-2 rounded-lg text-slate-800 hover:bg-white/60 transition-colors text-sm"
								>
									{city}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
