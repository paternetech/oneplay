/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

interface KeyProps extends KeyboardEvent {
  key: KeyboardEvent['code']
}

export default function useKeyPress(targetKey: KeyProps['key']) {
  const [keyPressed, setKeyPressed] = useState(false)

  function downHandler({ key, preventDefault }: KeyProps) {
    // preventDefault()
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key, preventDefault }: KeyProps) => {
    // preventDefault();
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keyPressed
}
