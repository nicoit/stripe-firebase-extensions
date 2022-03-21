export async function repeat(fn, until, retriesLeft = 5, interval = 1000) {
  const result = await fn();

  if (!until(result)) {
    if (retriesLeft) {
      await new Promise((r) => setTimeout(r, interval));
      return repeat(fn, until, retriesLeft - 1, interval);
    }
    throw new Error('Max repeats count reached');
  }

  return result;
}
