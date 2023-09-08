import { Dispatch, SetStateAction } from "react";
import { TileForExample } from "../board/TileForExample";
import { ModalBase } from "./ModalBase";

type Props = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export const HowToPlayModal = ({ isOpen, onClose }: Props) => {
  return (
    <ModalBase header="Cómo jugar" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 break-words">
        <p>Adivina la palabra oculta en cinco intentos.</p>
        <p>Cada intento debe ser una palabra válida de 5 letras.</p>
        <p>
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <span className="font-bold">Ejemplos</span>
        <div className="flex flex-row justify-center mb-1 mt-4">
          <TileForExample
            isShown={true}
            isCompleted={true}
            value="G"
            status="correct"
          />
          <TileForExample value="A" isCompleted={true} />
          <TileForExample value="T" isCompleted={true} />
          <TileForExample value="O" isCompleted={true} />
          <TileForExample value="S" isCompleted={true} />
        </div>
      </div>
      <p className="mt-2">
        La letra G está en la palabra y en la posición correcta.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <TileForExample value="V" isCompleted={true} />
        <TileForExample value="O" isCompleted={true} />
        <TileForExample
          isShown={true}
          isCompleted={true}
          value="C"
          status="present"
        />
        <TileForExample value="A" isCompleted={true} />
        <TileForExample value="L" isCompleted={true} />
      </div>
      <p className="mt-2">
        La letra C está en la palabra pero en la posición incorrecta.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <TileForExample value="C" isCompleted={true} />
        <TileForExample value="A" isCompleted={true} />
        <TileForExample value="N" isCompleted={true} />
        <TileForExample
          isShown={true}
          isCompleted={true}
          value="T"
          status="absent"
        />
        <TileForExample value="O" isCompleted={true} />
      </div>
      <p className="mt-2">La letra O no está en la palabra.</p>

      <p className="mt-6">
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>

      <p className="text-center mt-6">¡Una palabra nueva cada 5 minutos!</p>

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
