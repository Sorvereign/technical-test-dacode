import { FC } from "react";

type TileForExampleProps = {
  value?: string;
  status?: "absent" | "present" | "correct";
  isShown?: boolean;
  isCompleted?: boolean;
  position?: number;
};

export const TileForExample: FC<TileForExampleProps> = ({
  value,
  status,
}: TileForExampleProps) => {
  return (
    <div
      className={`w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white text-black ${
        !status
          ? "bg-gray1/20 dark:border-slate-700"
          : status === "absent"
          ? "bg-gray1 dark:bg-slate-500 text-white border-slate-400 dark:border-slate-700"
          : status === "correct"
          ? "bg-green1 text-white dark:border-slate-700"
          : status === "present"
          ? "bg-yellow1 text-white dark:border-slate-700"
          : ""
      }`}
    >
      <div>{value}</div>
    </div>
  );
};
