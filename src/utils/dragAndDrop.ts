export function generateTaskBody(title: string, description: string, columnId: string, order = 1) {
  return {
    title,
    description,
    columnId,
    order,
  };
}
