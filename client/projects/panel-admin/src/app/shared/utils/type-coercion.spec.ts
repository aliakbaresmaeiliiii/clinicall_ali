import { isNumber, toBooleanProperty, toNumberProperty } from './type-coercion';

describe(`**isNumber Function`, () => {
  it(`should treat integer 100 as a number`, () => {
    expect(isNumber(100)).toBe(true);
  });

  it(`should treat string '' as NOT a number`, () => {
    expect(isNumber('')).toBe(false);
  });
  it(`should treat string '100' as  a number`, () => {
    expect(isNumber('100')).toBe(true);
  });
  it(`should treat string '100abc' is NOT a number`, () => {
    expect(isNumber('100abc')).toBe(false);
  });
  it(`should treat string '{}' is NOT a number`, () => {
    expect(isNumber({})).toBe(false);
  });
});

describe(`**toBooleanProperty Functino`, () => {
  it(`should coerce 'false' to boolean false`, () => {
    expect(toBooleanProperty('false')).toBe(false);
  });
  it(`should coerce '' to boolean true`, () => {
    expect(toBooleanProperty('')).toBe(true);
  });
  it(`should coerce null to boolean true`, () => {
    expect(toBooleanProperty(null)).toBe(false);
  });
});

describe(`**toNumberProperty`, () => {
  it(`should treat integer 100 as a number`, () => {
    expect(toNumberProperty(100)).toBe(100);
  });
  it(`should treat sting '100' as a number`, () => {
    expect(toNumberProperty('100')).toBe(100);
  });
  it(`should treat empty string '' as a number`, () => {
    expect(toNumberProperty('')).toBe(0);
  });
  it(`should treat null NaN as a number`, () => {
    expect(toNumberProperty(NaN)).toBe(0);
  });
});
