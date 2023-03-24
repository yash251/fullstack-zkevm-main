import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./App.css";

import { ethers } from "ethers";
import Counter from "./contracts/Counter.sol/Counter.json";
const counterAddress = "0x5200aA2A72a96A3091831e812edC5De4ad6DB426"
console.log(counterAddress, "Counter ABI: ", Counter.abi);

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // declare the data fetching function
    const fetchCount = async () => {
      const data = await readCounterValue();
      return data;
    };

    fetchCount().catch(console.error);
  }, []);

  async function readCounterValue() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("provider", provider);
      const contract = new ethers.Contract(
        counterAddress,
        Counter.abi,
        provider
      );
      console.log("contract", contract);
      try {
        const data = await contract.retrieve();
        console.log(data);
        console.log("data: ", parseInt(data.toString()));
        setCount(parseInt(data.toString()));
      } catch (err) {
        console.log("Error: ", err);
        alert(
          "Switch your MetaMask network to Polygon zkEVM testnet and refresh this page!"
        );
      }
    }
  }

  const incrementCounter = () => {
    // we should read currentCount from the blockchain
    const currentCount = count;
    setCount(currentCount + 1);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, marginTop: 20 }}>
        <CardContent>
          <p>Count: {count}</p>
          <Button onClick={incrementCounter} variant="outlined">
            +1
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
