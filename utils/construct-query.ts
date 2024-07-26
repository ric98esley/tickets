export function constructQuery(initial: string, add: string): string {
  return initial.length > 0 ? `${initial}&&${add}` : add
}