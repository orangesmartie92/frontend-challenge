/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useCallback, DependencyList} from 'react';
import {useMountedState} from './use-mounted-state';

/**
 * Uninitialized request state. Request has not been dispatched yet.
 */
export interface Uninitialized {
  type: 'uninitialized';
  data?: undefined;
  error?: undefined;
}

/**
 * Loading request state.
 */
export interface Loading<Result> {
  type: 'loading';
  data?: Result;
  error?: undefined;
}

/**
 * Success request state, containing request result.
 */
export interface Success<Result> {
  type: 'success';
  data: Result;
  error?: undefined;
}

/**
 * Error request state, containing triggered error.
 */
export interface Error<Result> {
  type: 'error';
  data?: Result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

/**
 * This type regroups all possible request states.
 */
export type TaskState<Result> = Uninitialized | Loading<Result> | Success<Result> | Error<Result>;
/**
 * Type of the dispatch request returned by [useAsyncFn].
 */
export type RequestDispatcher<Args extends unknown[]> = (...params: Args) => void;
/**
 * Type of the function resetting the Task State.
 */
export type StateResetter = () => void;

export interface UsePromiseFnTaskOptions<Result> {
  initialState?: TaskState<Result>;
  keepDataOnStateChanges?: boolean;
}

/**
 * Custom hook making it easier to trigger promises.
 *
 * This hook returns 2 things:
 * 1. The state of the request. See the TaskState interface.
 * 2. A function to call that will trigger the promise.
 *
 * The state of the request should initially be "uninitialized", as long as no request is sent.
 * Once a request is sent, its state will become "loading". Once the promise resolves, it will
 * enter "success" state or "error" state, according to its correct resolution or not.
 *
 * @param fn Function providing the promise to execute.
 */
export const usePromiseFnTask = <Args extends unknown[] = [], Result = void>(
  fn: (...args: Args) => Promise<Result>,
  deps: DependencyList,
  {
    initialState = {type: 'uninitialized'},
    keepDataOnStateChanges = false,
  }: UsePromiseFnTaskOptions<Result> = {},
): TaskState<Result> & {
  call: RequestDispatcher<Args>;
  reset: StateResetter;
} => {
  const [state, set] = useState<TaskState<Result>>(initialState);

  const isMounted = useMountedState();

  const callback = useCallback(
    (...args: Args) => {
      set((prev) => ({type: 'loading', ...(keepDataOnStateChanges ? {data: prev.data} : {})}));

      return fn(...args).then(
        (data) => {
          if (isMounted()) {
            set({type: 'success', data});
          }

          return data;
        },
        (error) => {
          if (isMounted()) {
            set((prev) => ({
              type: 'error',
              error,
              ...(keepDataOnStateChanges ? {data: prev.data} : {}),
            }));
          }

          return error;
        },
      );
    },

    [...deps, keepDataOnStateChanges],
  );

  const reset = useCallback(() => set(initialState), []);

  return {...state, call: callback, reset};
};
