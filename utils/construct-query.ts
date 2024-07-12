export function constructQuery(initial: string, add: string): string {
  return initial ? `${initial}&&${add}` : add
}