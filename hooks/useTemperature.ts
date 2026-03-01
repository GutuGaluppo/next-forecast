import { useMemo } from "react";

export function useTemperature(celsius: number) {
  return useMemo(() => Math.round(celsius), [celsius]);
}
