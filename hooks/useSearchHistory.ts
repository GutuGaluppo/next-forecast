"use client";

import { useState } from "react";

const KEY = "weather-search-history";

export interface HistoryEntry {
	city: string;
	temperature?: number;
}

export function useSearchHistory() {
	const [history, setHistory] = useState<HistoryEntry[]>(() => {
		const stored = localStorage.getItem(KEY);
		if (!stored) return [];
		const parsed = JSON.parse(stored);
		// Migrate old string[] format
		return parsed.map((item: unknown) =>
			typeof item === "string" ? { city: item } : item,
		);
	});

	function add(city: string, temperature?: number) {
		setHistory((prev) => {
			const next = [
				{ city, temperature },
				...prev.filter((e) => e.city.toLowerCase() !== city.toLowerCase()),
			].slice(0, 8);
			localStorage.setItem(KEY, JSON.stringify(next));
			return next;
		});
	}

	function clear() {
		localStorage.removeItem(KEY);
		setHistory([]);
	}

	return { history, add, clear };
}
