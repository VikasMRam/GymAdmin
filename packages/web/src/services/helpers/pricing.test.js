import { priceParser, priceFormatter } from './pricing';

describe(('numbers are fomatted correctly when given different inputs'), () => {
  it('if string is given should return same thing after decimal', () => {
    expect(priceFormatter('1111.10')).toBe('1,111.10');
    expect(priceFormatter('11111111.1')).toBe('11,111,111.1');
    expect(priceFormatter('111.1')).toBe('111.1');
  });

  it('if number is given should correctly format 2 decimals no matter what', () => {
    expect(priceFormatter(1111.1)).toBe('1,111.10');
    expect(priceFormatter(11111111)).toBe('11,111,111.00');
    expect(priceFormatter(111.23)).toBe('111.23');
  });

  it('price parser removes anything that is not a decimal or number', () => {
    expect(priceParser('1111.1ddafdasfasf')).toBe('1111.1');
    expect(priceParser('1111111.dasfadsfsdf1')).toBe('1111111.1');
    expect(priceParser('dafda.111.d3.3.3!@#$%^^')).toBe('.111.3.3.3');
  });
});

