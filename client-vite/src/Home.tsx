import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "react-use";
import ky from "ky";
import LanguageBarChart from "./LanguageBarChart";
import "../node_modules/flag-icons/css/flag-icons.css";
import { langsFullData } from "./Utils";
import CustomNavbar from "./CustomNavbar";

export default function Home() {

    const mutation = useMutation((prompt: string) => {
        return ky
          .get("/q", {
            searchParams: {
              input: prompt,
            },
          })
          .json<Record<string, number>>();
      });
      const [liveMode, setLiveMode] = useState(false);
      const [showPredictedLanguage, setShowPredictedLanguage] = useState(false);
      const [inputText, setInputText] = useState("");
      const [debouncing] = useDebounce(
        () => {
          if (!liveMode) return;
    
          mutation.mutate(inputText);
        },
        2000,
        [inputText]
      );
    
      const sortedResults = useMemo(() => {
        if (!mutation.data) return null;
    
        const results = Object.entries(mutation.data)
          .map(([key, value]) => ({ key, value }))
          .sort((a, b) => b.value - a.value);
    
        return results;
      }, [mutation.data]);

    return (
        <>
        <CustomNavbar />
    <div className="w-80 mx-auto py-16 flex flex-col gap-4">
      <h1 className="text-5xl text-center font-bold min-w-full ">
        Single Layer Neural Network
      </h1>
      <p className="text-xl text-center indent-px">Frontend implementation of SLNN</p>
      <label className="label cursor-pointer">
        <span className="label-text">Live Mode</span>
        <input
          type="checkbox"
          className="toggle"
          checked={liveMode}
          onChange={(e) => setLiveMode(e.target.checked)}
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Show % bar chart</span>
        <input
          type="checkbox"
          className="toggle"
          checked={showPredictedLanguage}
          onChange={(e) => setShowPredictedLanguage(e.target.checked)}
        />
      </label>
      {!!mutation.error && (
        <div className="alert alert-error shadow-lg overflow-x-auto">
          <p>{JSON.stringify(mutation.error)}</p>
        </div>
      )}
      <textarea
        className="input input-primary textarea-lg w-full max-w-xs min-h-[210px]"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      {!liveMode && (
        <button
          onClick={() => mutation.mutate(inputText)}
          className="btn btn-primary"
        >
          Check this text
        </button>
      )}
      {sortedResults === null || mutation.isLoading ? (
        <p className="italic">
          {JSON.stringify({
            debouncing: !debouncing(),
            loading: mutation.isLoading,
          })}
        </p>
      ) : showPredictedLanguage ? (
        <LanguageBarChart inputData={sortedResults} />
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xl text-center font-bold">Predicted language</p>
          <p className="text-xl text-center font-bold">
            <span
              className={langsFullData[sortedResults[0].key].flagEmoji}
            ></span>{" "}
            {langsFullData[sortedResults[0].key].name}
          </p>
          <p className="text-xl text-center font-bold">
            Language perceptron dotproducts
          </p>
          <div className="flex flex-col gap-4 text-center">
            {sortedResults.map(({ key, value }) => (
              <p key={key}>
                <span className={langsFullData[key].flagEmoji}></span>{" "}
                <span className="font-bold">{langsFullData[key].name}</span>:{" "}
                {Math.round(value * 100) / 100}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
    );
}