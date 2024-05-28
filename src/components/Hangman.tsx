import { useEffect, useState } from 'react';
import "../css/main.css";

interface HangmanProps {
  words: string[];
  hint: String;
}

// En esta parte se desarrolla el hook encargado de inicializar el reloj el cual llevara la medicion del juego
const Clock = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const key = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, []);

  return (
    <>
      <div>
        <p>
          El tiempo jugado es: {count} segundos
        </p>
      </div>
    </>
  );
};

const Hangman = ({ hint, words }: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const displayWord = selectedWord.split('').map((letter) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return '_';
    }
  });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount(prev => prev + 1);
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
          <Clock /> {/* Mostrar el reloj */}
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
