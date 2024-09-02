export function clearArray(array: Array<any>): void {
  array = [];
}

export function clearDeepArray<T extends object>(obj: T, key: keyof T): void {
    obj[key] = [] as any;  // We cast it to 'any' to avoid type issues
  }
  