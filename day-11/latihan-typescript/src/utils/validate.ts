export function validate<T>(data: T, schema: { [K in keyof T]: string }): boolean {
  for (let key in schema) {
    if (typeof data[key] !== schema[key]) {
      return false;
    }
  }
  return true;
}