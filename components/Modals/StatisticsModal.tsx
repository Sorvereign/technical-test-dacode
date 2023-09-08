import { Dispatch, SetStateAction } from "react";
import { TileForExample } from "../board/TileForExample";
import { ModalBase } from "./ModalBase";
import { useAppSelector } from "../../state/hooks";

type Props = {
  isOpen: boolean;
  isInfo?: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  showTime?: {
    minutes: number;
    seconds: number;
  };
};

export const StatisticsModal = ({
  isInfo,
  isOpen,
  onClose,
  showTime,
}: Props) => {
  const [statistics, solution] = useAppSelector((state) => [state.game.statistics, state.game.solution]);
  return (
    <ModalBase header="Estadísticas" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-row justify-between px-8 text-center">
        <div>
          <span className="font-semibold text-xl dark:text-white">
            {statistics.wins}
          </span>
          <p>Ganadas</p>
        </div>
        <div>
          <span className="font-semibold text-xl dark:text-white">
            {statistics.lost}
          </span>
          <p>Perdidas</p>
        </div>
      </div>

      {!isInfo && (
        <div className="w-full text-center mt-6">
          <p>
            La palabra era:{" "}
            <span className="font-semibold dark:text-white">{solution}</span>
          </p>
        </div>
      )}

      {showTime && showTime?.minutes !== Math.floor(300 / 60) && (
        <div className="w-full text-center mt-6">
          <p>
            Tiempo restante: {showTime.minutes}:
            {showTime.seconds < 10 ? `0${showTime.seconds}` : showTime.seconds}
          </p>
        </div>
      )}

      <div className="flex w-full justify-center">
        <button
          className="bg-green1 text-white font-semibold px-12 py-3 mt-6"
          onClick={() => onClose(false)}
        >
          ¡Jugar!
        </button>
      </div>
    </ModalBase>
  );
};
