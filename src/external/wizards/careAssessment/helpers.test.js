import { converStepInputToString } from './helpers';

describe('helpers', () => {
  it('converStepInputToString with string input', () => {
    const i = 'str';
    const o = converStepInputToString(i);
    expect(o).toBe(i);
  });

  it('converStepInputToString with int input', () => {
    const i = 300;
    const o = converStepInputToString(i);
    expect(o).toBe(i.toString());
  });

  it('converStepInputToString with object input', () => {
    const i = { key: 'value' };
    const o = converStepInputToString(i);
    expect(o).toBe(JSON.stringify(i));
  });
});
