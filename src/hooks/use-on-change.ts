import {useCallback, useEffect, useRef} from 'react';

/**
 * Like useEffect, but only after the first mount
 *
 * sometimes we don't want an effect on the first mount for the dependencies list
 * in the dependency array
 *
 * @param cb
 * @param deps
 */
export const useOnChange = (cb: () => void | (() => void), deps: unknown[]): void => {
  const ref = useRef(false);
  const fn = useCallback(cb, [cb, ...deps]);
  useEffect(() => {
    if (ref.current) {
      fn();
    }
    ref.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...deps]);
};
