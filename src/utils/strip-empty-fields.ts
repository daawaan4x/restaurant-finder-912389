/**
 * Return type helper for {@link stripEmptyFields()}
 *
 * Removes `null`, `undefined`, or `''` fields in an object.
 *
 * LIMITATION: Previous fields that do not have a `null`, `undefined`, or `string` union become optional
 */
export type StripEmptyFields<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]:
    | Exclude<T[K], null>
    | undefined;
};

/**
 * Removes `null`, `undefined`, or `''` fields in an object.
 *
 * @param obj - Object to remove fields from.
 */
export function stripEmptyFields<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (typeof value === "string" && value.length == 0) return false;
      if (value === null || value === undefined) return false;
      return true;
    })
  ) as StripEmptyFields<T>;
}
