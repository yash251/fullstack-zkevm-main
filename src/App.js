import { useState } from "react";
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
