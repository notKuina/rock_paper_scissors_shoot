import React, { useState, useEffect } from 'react'

const StartAnimation = ({ onFinish }) => {
  const words = ["Rock", "Paper", "Scissors", "Shoot!"]
  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setCurrentIndex(i)
      i++
      if (i === words.length) {
        clearInterval(interval)
        setTimeout(() => onFinish(), 500)
      }
    }, 600) // 600ms per word
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {currentIndex >= 0 && (
        <span className="text-6xl font-bold text-indigo-600 animate-pulse">
          {words[currentIndex]}
        </span>
      )}
    </div>
  )
}

export default StartAnimation