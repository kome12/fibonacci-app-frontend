/**
 * Deep equality of objects.
 */

export const objectDeepEqual = (
  obj1: object | undefined,
  obj2: object | undefined
): boolean => {
  // handling of undefined
  if (obj1 === undefined || obj2 === undefined) {
    return obj1 === obj2;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  return [...keys1, ...keys2].every((key) => {
    const obj1Value = (obj1 as any)[key];
    const obj2Value = (obj2 as any)[key];

    // If Array or Object and not null check recursively
    if (
      typeof obj1Value === "object" &&
      obj1Value !== null &&
      typeof obj2Value === "object" &&
      obj2Value !== null
    ) {
      return objectDeepEqual(obj1Value, obj2Value);
    }

    return obj1Value === obj2Value;
  });
};
