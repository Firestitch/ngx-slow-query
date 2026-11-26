/** A display constant keyed by each entry's value, for a lookup in a template. */
export function indexByValue<T extends { value: string }>(items: T[]): Record<string, T> {
  return items.reduce((indexed, item) => ({ ...indexed, [item.value]: item }), {});
}
