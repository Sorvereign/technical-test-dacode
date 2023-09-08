import type { FunctionComponent } from "react";
import Key from "./Key";
import { useAppSelector } from "../../state/hooks";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["-", "a", "s", "d", "f", "g", "h", "j", "k", "l", "-"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "bksp"],
];

interface KeyboardProps {
  onLetter: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const Keyboard: FunctionComponent<KeyboardProps> = ({
  onLetter,
  onEnter,
  onBackspace,
}) => {
  const letterStatus = useAppSelector((state) => state.game.letterStatus);

  return (
    <div className="flex py-5 flex-col items-center justify-center px-8 rounded-md bg-gray-100/80 dark:bg-gray4/20 mb-8">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className="flex w-full justify-center space-x-[6px] pb-2"
        >
          {Array.from(row).map((letter, letterIdx) => {
            if (letter === "enter")
              return (
                <Key key={letterIdx} onClick={onEnter} large>
                  Enter
                </Key>
              );
            else if (letter === "bksp")
              return (
                <Key key={letterIdx} onClick={onBackspace} large>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    data-testid="icon-backspace"
                  >
                    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
                  </svg>
                </Key>
              );
            else if (letter === "-")
              return <div key={letterIdx} className="w-2" />;
            else {
              return (
                <Key
                  key={letterIdx}
                  onClick={() => onLetter(letter)}
                  evaluation={letterStatus[letter]}
                >
                  {letter}
                </Key>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
