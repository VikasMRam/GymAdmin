export function remToPx(rem, units) {
  if (rem.includes('px') || rem.includes('%') || !rem.includes('rem')) {
    return rem;
  }
  const converted = rem.replace('rem', '') * 16;
  return units ? `${converted}px` : converted;
}
