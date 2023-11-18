import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockHash, setBlockHash] = useState();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  });

  useEffect(() => {
    async function getBlockHash() {
      const blockData = await alchemy.core.getBlock(blockNumber);
      setBlockHash(blockData.hash);
    }
    getBlockHash();
  });

  useEffect(() => {
    async function getTransactions() {
      const blockWithTransactions = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );
      setTransactions(blockWithTransactions.transactions);
    }
    getTransactions();
  });

  return (
    <>
      <div className="App">Block Number: {blockNumber}</div>;
      <div className="App">Block Hash: {blockHash}</div>;
    </>
  );
}

export default App;
