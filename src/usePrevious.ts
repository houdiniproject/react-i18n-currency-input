//* from https://github.com/streamich/react-use/blob/ad33f76dfff7ddb041a9ef74b80656a94affaa80/src/usePrevious.ts */
/** we put this in here so we don't have reference react-use and deal with linking that in */

import { useEffect, useRef } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}