import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { CoinType } from "../components/coin";
import { Footer } from "../components/footer";
import Header from "../components/header";
import Results, { IGameResults } from "../components/results";
import RulesModal from "../components/rules-modal";
import Selector from "../components/selector";

const checkUserWon = (results: IGameResults) => {
    const { userChoice, botChoice } = results;
    // Implement rock paper scissors lizard spock logic
    if (userChoice === botChoice) {
        return null;
    }
    if (userChoice === CoinType.ROCK) {
        return botChoice === CoinType.SCISSORS || botChoice === CoinType.LIZARD;
    }
    if (userChoice === CoinType.PAPER) {
        return botChoice === CoinType.ROCK || botChoice === CoinType.SPOCK;
    }
    if (userChoice === CoinType.SCISSORS) {
        return botChoice === CoinType.PAPER || botChoice === CoinType.LIZARD;
    }
    if (userChoice === CoinType.LIZARD) {
        return botChoice === CoinType.SPOCK || botChoice === CoinType.PAPER;
    }
    if (userChoice === CoinType.SPOCK) {
        return botChoice === CoinType.LIZARD || botChoice === CoinType.ROCK;
    }
    return null;
};

const Home: NextPage = () => {
    const [results, setResults] = useState<IGameResults | null>(null);
    const [score, setScore] = useState(0);
    const [newScore, setNewScore] = useState(0);
    const [userWon, setUserWon] = useState<boolean | null>(null);
    const [showRules, setShowRules] = useState(false);

    const selectCoin = (userChoice: CoinType, botChoice: CoinType) => {
        const newResults = { userChoice, botChoice };
        const newUserWon = checkUserWon(newResults);
        const update = newUserWon == null ? 0 : newUserWon ? 1 : -1;
        setUserWon(newUserWon);
        setResults(newResults);
        setNewScore(score + update);
    };

    const clearResults = () => {
        setResults(null);
    };

    return (
        <>
            <RulesModal
                show={showRules}
                dismissModal={() => setShowRules(false)}
            />
            <Head>
                <title>Rock Paper Scissors 2</title>
                <meta
                    name="description"
                    content="Rock Paper Scissors 2 - Now with Lizard and Spock"
                ></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="relative background flex flex-col items-center w-screen px-8 h-screen pt-8">
                <Header score={score} />
                {results ? (
                    <Results
                        results={results}
                        userWon={userWon}
                        newScore={newScore}
                        updateScoreboard={setScore}
                        clearResults={clearResults}
                    />
                ) : (
                    <>
                        <Selector onSelect={selectCoin} />
                        <button
                            onClick={(e) => setShowRules(true)}
                            className="absolute md:right-16 bottom-16  w-32 py-3 bg-transparent border-solid text-white hover:bg-white hover:text-scoreText border-2 rounded-lg"
                        >
                            RULES
                        </button>
                    </>
                )}

                <Footer />
            </main>
        </>
    );
};

export default Home;
