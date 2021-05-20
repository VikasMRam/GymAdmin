// required for mobile tests; read more: https://github.com/facebook/jest/issues/6434#issuecomment-525576660
jest.useFakeTimers();

jest.mock('@react-native-community/cookies', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
  get: () => Promise.resolve(),
}));
