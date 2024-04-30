import Hangman from "./components/Hangman";
import Welcome from "./components/Welcome";


// Define an interface for the word lists
interface WordList {
  words: string[];
  hint: string;
}

const Fruts: WordList = { words: ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi'], hint: 'Es una fruta' };
const sports: WordList = { words: ['futbol', 'basket', 'voleyball', 'tenis'], hint:'Es un deporte' };
const jobs: WordList = { words: ['arquitecto', 'abogado', 'cheff', 'contador'], hint: 'Es una profesion' };
const phone: WordList = { words: ['samsung', 'iphone', 'blackberry', 'nokia'], hint:'Es una marca de celular' };
const cars: WordList = { words: ['tesla', 'dodge', 'gmc', 'audi', 'bmw', 'volkswagen', 'honda'], hint:'Es una marca de carros' };

// Utility function to pick a random element from an array
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}


function App() {
  const allWordLists: WordList[] = [Fruts, sports, jobs, phone, cars];
  const randomWordList = pickRandom(allWordLists); // Pick a random word list

  return (
    <div className="App">
      <Welcome />
      <Hangman words={randomWordList.words} hint={randomWordList.hint} />
      
    </div>
  );
}

export default App;