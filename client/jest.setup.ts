import '@testing-library/jest-dom';
import { afterEach } from '@jest/globals';

afterEach(() => {
  jest.useRealTimers();
});
