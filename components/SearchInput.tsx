"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SearchInput() {
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const city = (
			e.currentTarget.elements.namedItem("city") as HTMLInputElement
		).value.trim();
		if (city) router.push(`/?city=${encodeURIComponent(city)}`);
	}

	return (
		<form onSubmit={handleSubmit} className="mb-6 flex gap-2">
			<input
				name="city"
				type="text"
				defaultValue={searchParams.get("city") ?? ""}
				placeholder="Digite uma cidade..."
				className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				Buscar
			</button>
		</form>
	);
}
