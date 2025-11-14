export function formatProductId(id: number, length: number = 3): string {
  return `PRO-${id.toString().padStart(length, "0")}`;
}