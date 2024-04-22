import { useState } from 'react';

interface HangmanProps {
  words: string[];
  hint: String;
}

const Hangman = ({hint,words}: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const displayWord = selectedWord.split('').map((letter, index) => {
    console.log("selectedWord: ", selectedWord)
    if (guessedLetters.includes(letter)) {
      console.log("guessedLetters: ",guessedLetters)
      return letter;
    } else {
      return '_';
    }
    
  });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
        console.log("setErrorCount: ", setErrorCount)
      }
    }
  };

  const restartGame = () => {
    const newWordIndex = Math.floor(Math.random() * words.length);
    const newWord = words[newWordIndex];
    setSelectedWord(newWord);
    setGuessedLetters([]); // Reiniciar las letras adivinadas
    setErrorCount(0);
  };

  const handleStartGame = () => {
    setGameStarted(true); // Establecer que el juego ha comenzado
};

  return (
    <div className="marc">
    {/* Renderizar el botón "Play" si el juego no ha comenzado */}
    {!gameStarted && (
        <button onClick={handleStartGame}>Play</button>
    )}
    {/* Renderizar el contenido del juego si el juego ha comenzado */}
    {gameStarted && (
        <>
            <h3>Categoría: {hint}</h3> {/* Mostrar la categoría */}
            <p>{displayWord.join(' ')}</p> {/* Mostrar la palabra a adivinar */}
            <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} /> {/* Campo de entrada para adivinar letras */}

            {/* Renderizar mensajes de error y botón para seleccionar una nueva palabra cuando se cumplan ciertas condiciones */}
            {(displayWord.join('') === selectedWord || errorCount > 5) && (
                <>
                    <button onClick={restartGame}>Select New Word</button>
                    <p>Cantidad de errores: {errorCount}</p>
                    {displayWord.join('') === selectedWord && (
                        <p>You won in this round</p>
                    )}
                </>
            )}
        </>
    )}
</div>
  );
};

export default Hangman;