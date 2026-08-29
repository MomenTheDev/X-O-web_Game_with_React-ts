import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faO } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

function App() {
  const countainer = useRef<HTMLDivElement>(null);
  const counter = useRef<number>(0);
  //true for X false for O
  const [turn, setTurn] = useState<boolean>(true);
  const [endGameWin, setEndGameWin] = useState<boolean>(false);
  const [endGameDraw, setEndGameDraw] = useState<boolean>(false);

  const [values, setValues] = useState<("x" | "o" | "")[]>(
    new Array(9).fill(""),
  );

  useEffect(() => {
    if (counter.current == 9 && countainer.current && !endGameWin) {
      countainer.current.style.backgroundColor = "black";
      setEndGameDraw(true);
    } else if (!endGameDraw && endGameWin && countainer.current) {
      countainer.current.style.backgroundColor = turn ? "#00f0ff" : "#FF00FF";
    }
    if (counter.current != 9) counter.current++;
    console.log(counter.current);
  });

  return (
    <>
      <div
        ref={countainer}
        className={
          "countainer " + (endGameWin || endGameDraw ? "end-game" : "")
        }
      >
        {values.map((value, i) => (
          <div
            key={i}
            onClick={() => {
              if (value != "" || endGameWin || endGameDraw) return;
              const newArr = [...values];

              if (turn) newArr[i] = "x";
              else newArr[i] = "o";

              setValues(newArr);
              if (validateWining(newArr)) {
                setEndGameWin(true);
                return;
              }
              setTurn(!turn);
            }}
          >
            {renderSymbole(value)}
          </div>
        ))}
      </div>

      {endGameDraw || endGameWin ? (
        <button
          style={{
            boxShadow: turn
              ? "0px 0px 12px 2px #00f0ff"
              : "0px 0px 12px 2px #FF00FF",
          }}
          onClick={() => {
            location.reload();
          }}
        >
          RePlay
        </button>
      ) : null}
    </>
  );
}

function renderSymbole(value: "" | "x" | "o") {
  if (value == "x")
    return (
      <FontAwesomeIcon
        icon={faX}
        style={{ color: "#00f0ff", width: "40px", height: "40px" }}
      />
    );
  else if (value == "o")
    return (
      <FontAwesomeIcon
        icon={faO}
        style={{ color: "#FF00FF", width: "40px", height: "40px" }}
      />
    );
  else return null;
}

function validateWining(values: ("" | "x" | "o")[]): boolean {
  if (
    (values[0] == values[1] &&
      values[1] == values[2] &&
      values[1].length != 0) ||
    (values[0] == values[3] &&
      values[3] == values[6] &&
      values[3].length != 0) ||
    (values[0] == values[4] &&
      values[4] == values[8] &&
      values[4].length != 0) ||
    (values[6] == values[7] &&
      values[7] == values[8] &&
      values[7].length != 0) ||
    (values[1] == values[4] &&
      values[4] == values[7] &&
      values[4].length != 0) ||
    (values[2] == values[5] &&
      values[5] == values[8] &&
      values[5].length != 0) ||
    (values[2] == values[4] &&
      values[4] == values[6] &&
      values[4].length != 0) ||
    (values[3] == values[4] && values[4] == values[5] && values[4].length != 0)
  )
    return true;
  return false;
}

export default App;
