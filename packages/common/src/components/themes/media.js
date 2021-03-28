const toFixed = n => typeof n === 'number' && n.toFixed(2) || `(${n})`;
export const makeCols = (cols, gutter = '0', unit = '%') => `calc(((100${unit} + ${gutter}) * ${toFixed(cols)}) - ${gutter})`;
