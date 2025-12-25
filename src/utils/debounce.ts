/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    // Clear existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Creates a debounced function with a leading edge option.
 * If leading is true, func is invoked on the leading edge of the timeout.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - Options object
 * @returns A debounced version of the function
 */
export function debounceLeading<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  const { leading = false, trailing = true } = options;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime = 0;

  return function debounced(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    // Clear existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Leading edge call
    if (leading && timeSinceLastCall >= wait) {
      func(...args);
      lastCallTime = now;
      return;
    }

    // Trailing edge call
    if (trailing) {
      timeoutId = setTimeout(() => {
        func(...args);
        lastCallTime = Date.now();
        timeoutId = null;
      }, wait);
    }
  };
}
