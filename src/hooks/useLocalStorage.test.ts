import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useLocalStorage hook', () => {
  const TEST_KEY = 'test_key';
  const TEST_VALUE = 'test_value';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with initial value when no stored value', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE));

    expect(result.current.searchStr).toBe(TEST_VALUE);
    expect(localStorage.getItem(TEST_KEY)).toBe(TEST_VALUE);
  });

  it('should retrieve stored value from localStorage on init', () => {
    const STORED_VALUE = 'stored_value';
    localStorage.setItem(TEST_KEY, STORED_VALUE);

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE));

    expect(result.current.searchStr).toBe(STORED_VALUE);
    expect(localStorage.getItem(TEST_KEY)).toBe(STORED_VALUE);
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE));

    const NEW_VALUE = 'new_value';
    act(() => {
      result.current.setSearchStr(NEW_VALUE);
    });

    expect(result.current.searchStr).toBe(NEW_VALUE);
    expect(localStorage.getItem(TEST_KEY)).toBe(NEW_VALUE);
  });

  it('should remove item when empty string is set', () => {
    localStorage.setItem(TEST_KEY, 'stored_value');

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE));

    act(() => {
      result.current.setSearchStr('');
    });

    expect(result.current.searchStr).toBe('');
    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });
});
