import { describe, it, expect } from 'vitest';

describe('utility functions', () => {
  it('should format numbers with commas', () => {
    const num = 1234567;
    const formatted = num.toLocaleString();
    expect(formatted).toBe('1,234,567');
  });

  it('should handle date formatting with dayjs', async () => {
    const dayjs = (await import('dayjs')).default;
    const date = dayjs('2024-01-15');
    expect(date.format('YYYY-MM-DD')).toBe('2024-01-15');
    expect(date.format('MMM DD, YYYY')).toBe('Jan 15, 2024');
  });
});
