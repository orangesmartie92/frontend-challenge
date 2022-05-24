import { useRef, useCallback, useEffect } from 'react'

export const useMountedState = (): (() => boolean) => {
  const mountedRef = useRef<boolean>(false)
  const get = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true

    return (): void => {
      mountedRef.current = false
    }
  })

  return get
}
