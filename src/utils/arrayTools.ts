export function findIndex(items: { id: string }[], id: string): number {
  return items.findIndex((currentElement) => currentElement.id === id);
}
