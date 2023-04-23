import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "react-use";
import ky from "ky";
import ApexCharts from "apexcharts";
import LanguageBarChart from "./LanguageBarChart";

function App() {
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
  const [inputText, setInputText] = useState("");
  const [labelText, setLabelText] = useState("");
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
  // const query = useQuery('q')

  return (
    <div className="w-80 mx-auto py-16 flex flex-col gap-4">
      <h1 className="text-5xl text-center font-bold">
        Single Layer Neural Network
      </h1>
      <p className="text-xl text-center indent-px">Frontend implementation</p>
      <label className="label cursor-pointer">
        <span className="label-text">Live Mode</span>
        <input
          type="checkbox"
          className="toggle"
          checked={liveMode}
          onChange={(e) => setLiveMode(e.target.checked)}
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
      ) : (
        <LanguageBarChart inputData={sortedResults} />

        // sortedResults.map(({ key, value }) => (
        //   // <p key={key}>
        //   //   <span className="font-bold">{key}</span>: {value.toPrecision(6)}
        //   // </p>
        // ))
      )}
    </div>
  );
}
export default App;
