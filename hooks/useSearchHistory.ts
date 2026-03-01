"use client";

import { useState } from "react";

const KEY = "weather-search-history";

export function useSearchHistory() {
	const [history, setHistory] = useState<string[]>(() => {
		const stored = localStorage.getItem(KEY);
		return stored ? JSON.parse(stored) : [];
	});

	function add(city: string) {
		setHistory((prev) => {
			const next = [
				city,
				...prev.filter((c) => c.toLowerCase() !== city.toLowerCase()),
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
