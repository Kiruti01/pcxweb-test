"use client";
import { useTheme } from "./ThemeContext";

const APINodes = () => {
  const { dark } = useTheme();
  return (
    <section className="api-nodes-section w-full py-12 px-6">
      <div className="max-w-300 mx-auto">
        <img
          src={
            dark
              ? "/dark PCX nodes left and right.svg"
              : "/PCX nodes left and right.svg"
          }
          alt="PCX API connections"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default APINodes;
