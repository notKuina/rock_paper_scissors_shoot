import React, { useState } from 'react'

const choices = [
  { name: 'rock', emoji: '✊' },
  { name: 'paper', emoji: '✋' },
  { name: 'scissors', emoji: '✌️' }
]

const getRandomChoice = () => {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

const Game = () => {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('')
  const [score, setScore] = useState({ user: 0, computer: 0 })
  const [shuffling, setShuffling] = useState(false)

  const playGame = (choiceName) => {
    setShuffling(true)
    let shuffleCount = 0

    // Start emoji shuffle interval
    const shuffleInterval = setInterval(() => {
      const randomUser = getRandomChoice()
      const randomComputer = getRandomChoice()
      setUserChoice(randomUser)
      setComputerChoice(randomComputer)
      shuffleCount++
      if (shuffleCount > 6) { // ~7 shuffle frames (~0.7s)
        clearInterval(shuffleInterval)
        setShuffling(false)

        // Set final choices
        const userFinal = choices.find(c => c.name === choiceName)
        const computerFinal = getRandomChoice()
        setUserChoice(userFinal)
        setComputerChoice(computerFinal)

        // Determine result
        let gameResult = ''
        if (userFinal.name === computerFinal.name) gameResult = 'Tie 🤝'
        else if (
          (userFinal.name === 'rock' && computerFinal.name === 'scissors') ||
          (userFinal.name === 'scissors' && computerFinal.name === 'paper') ||
          (userFinal.name === 'paper' && computerFinal.name === 'rock')
        ) {
          gameResult = 'You Win 🎉'
          setScore(prev => ({ ...prev, user: prev.user + 1 }))
        } else {
          gameResult = 'Computer Wins 💻'
          setScore(prev => ({ ...prev, computer: prev.computer + 1 }))
        }
        setResult(gameResult)
      }
    }, 100) // 100ms per shuffle frame
  }

  const resetGame = () => {
    setUserChoice(null)
    setComputerChoice(null)
    setResult('')
    setScore({ user: 0, computer: 0 })
    setShuffling(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-indigo-600">Rock Paper Scissors</h1>

      {/* Scoreboard */}
      <div className="flex justify-center gap-10 mb-6 text-lg font-semibold">
        <div>User: {score.user}</div>
        <div>Computer: {score.computer}</div>
      </div>

      {/* Choices */}
      <div className="flex gap-6 mb-6">
        {choices.map(c => (
          <button
            key={c.name}
            onClick={() => playGame(c.name)}
            disabled={shuffling}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-xl transition transform hover:scale-110 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{c.emoji}</span>
            <span>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      {userChoice && computerChoice && (
        <div className="text-center mb-6">
          <p className="text-xl">
            You chose: <strong>{userChoice.emoji} </strong>
          </p>
          <p className="text-xl">
            Computer chose: <strong>{computerChoice.emoji} </strong>
          </p>
          {!shuffling && <h2 className="text-3xl font-bold mt-3">{result}</h2>}
        </div>
      )}

      {/* Reset */}
      <button
        onClick={resetGame}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition transform hover:scale-105"
      >
        Reset Game
      </button>
    </div>
  )
}

export default Game