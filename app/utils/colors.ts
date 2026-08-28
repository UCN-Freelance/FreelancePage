/**
 * The indigo cycle used to accent cards in a grid (services, cases) —
 * darkening steps of --accent from main.css, repeated in order so
 * neighbouring cards read as distinct without introducing new hues.
 */
export const accentCycle = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3']

export function accentColor(index: number): string {
  return accentCycle[index % accentCycle.length]!
}
