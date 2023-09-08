import { useEffect, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import seedrandom from "seedrandom";
import Board from "../components/board/Board";
import Keyboard from "../components/keyboard/Keyboard";
import Modal from "../components/Modals/Modal";
import {
  addLetter,
  evaluateRow,
  removeLetter,
  setAnswers,
  setSolution,
  setStatistics,
} from "../state/gameSlice";
import { setDarkMode } from "../state/settingsSlice";
import { HowToPlayModal } from "../components/Modals";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { StatisticsModal } from "../components/Modals/StatisticsModal";
import { Switch } from "@headlessui/react";
import { FaChartBar, FaQuestion } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
const wordsUrl = "https://gitlab.com/d2945/words/-/raw/main/words.txt";

const filterWordsByLength = (words: string[], length: number): string[] => {
  return words.filter((word) => word.length === length);
};

const removeAccents = (text: string | string[]): string | string[] => {
  return Array.isArray(text)
    ? text.map((word) =>
        word
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      )
    : text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

export const getServerSideProps: GetServerSideProps<{
  solution: string;
  wordList: string[];
}> = async () => {
  try {
    const response = await axios.get<string>(wordsUrl);
    const wordList: string[] = response.data.split("\n").slice(0, 5000);
    const fiveLetterWords = filterWordsByLength(wordList, 5);

    const rng = seedrandom(new Date().toDateString());
    const index = Math.floor(rng() * fiveLetterWords.length);
    let solution =
      fiveLetterWords[index]?.trim() ||
      "No se encontró una palabra de 5 letras";

    solution = removeAccents(solution) as string;
    return {
      props: {
        solution,
        wordList: removeAccents(fiveLetterWords),
      },
    };
  } catch (error) {
    return {
      props: {
        solution: "Error al obtener una palabra aleatoria: " + error,
        wordList: [],
      },
    };
  }
};

export default function Home({
  solution,
  wordList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [winModal, setWinModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [isInfoModal, setIsInfoModal] = useState(false);
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const [status, statistics] = useAppSelector((state) => [
    state.game.status,
    state.game.statistics,
  ]);
  const [remainingTime, setRemainingTime] = useState(300);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    if (startTimer && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else if (startTimer && remainingTime === 0) {
      router.reload();
    }
  }, [startTimer, remainingTime]);

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("isFirstTime")!);
    if (!localState) {
      setIsInfoModal(true);
      localStorage.setItem("isFirstTime", "true");
    }
    console.info(
      `Respuesta Correcta: ${solution}, Lista de posibles palabras: ${wordList.slice(
        0,
        8
      )}`
    );
  }, []);

  useEffect(() => {
    dispatch(setAnswers(wordList));
  }, []);

  useEffect(() => {
    dispatch(setSolution(solution));
  }, [dispatch, solution]);

  useEffect(() => {
    if (status === "WIN") {
      setWinModal(true);
      dispatch(
        setStatistics({
          win: statistics.wins + 1,
        })
      );
      setStartTimer(true);
    } else if (status === "FAIL") {
      setFailModal(true);
      dispatch(
        setStatistics({
          lost: statistics.lost + 1,
        })
      );
      setStartTimer(true);
    }
  }, [status]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      dispatch(setDarkMode(true));
  }, []);

  const handleLetter = (letter: string) => {
    dispatch(addLetter(letter));
  };

  const handleBackspace = () => {
    dispatch(removeLetter());
  };

  const handleSubmit = () => {
    dispatch(evaluateRow());
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className={`flex h-full w-full flex-col bg-white dark:bg-gray3`}>
      <Head>
        <title>Next.js Wordle Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="grid grid-cols-3 py-2 w-1/2 mx-auto text-center border rounded-md text-black bg-gray-100/60 dark:bg-[#DADCE008] dark:border-[#DADCE008] dark:text-white mt-4">
        <button
          className="bg-gray-300/70 dark:bg-white h-8 w-8 mr-auto ml-4 rounded-full"
          onClick={() => setIsInfoModal(true)}
        >
          <FaQuestion className="mx-auto dark:text-black" />
        </button>
        <div className="text-3xl font-bold">Wordle</div>
        <div className="flex items-center justify-center pr-4 ml-auto gap-2">
          <button className="bg-gray-300/70 dark:bg-white h-8 w-8  rounded-full">
            <FaChartBar
              className="mx-auto dark:text-black"
              onClick={() => setWinModal(true)}
            />
          </button>
          <Switch
            checked={settings.darkMode}
            onChange={(e) => dispatch(setDarkMode(e))}
            className={`${
              settings.darkMode ? "bg-gray3" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                settings.darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </header>
      <main className="flex grow flex-col items-center">
        <Toaster />
        <div className="flex grow items-center justify-center">
          <Board solution={solution} />
        </div>
        <Keyboard
          onLetter={handleLetter}
          onBackspace={handleBackspace}
          onEnter={handleSubmit}
        />
        <HowToPlayModal isOpen={isInfoModal} onClose={setIsInfoModal} />
        <StatisticsModal
          isOpen={winModal || failModal}
          isInfo={winModal}
          onClose={setWinModal}
          showTime={{
            minutes: minutes,
            seconds: seconds,
          }}
        />
      </main>
    </div>
  );
}
