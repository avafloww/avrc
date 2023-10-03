export function debounce(fn: (...args: any[]) => void, ms: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}
