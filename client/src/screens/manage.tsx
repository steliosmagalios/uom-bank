import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ManagePageProps {}

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

const ManagePage: React.FC<ManagePageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(() => new URLSearchParams(location.search).get("id") || "");
  const debouncedId = useDebounce(id, 500);

  const [balance, setBalance] = useState(NaN);

  useEffect(() => {
    if (!!debouncedId) {
      (async () => {
        await updateBalance();
      })();
    }
  }, [id]);

  async function updateBalance() {
    // Fetch balance from API
    const balanceResp = await fetch(`http://localhost:4000/user/${debouncedId}/account`);
    const balance = (await balanceResp.json())["balance"];

    // Update local value
    setBalance(balance);
  }

  async function deposit() {
    const amountStr = prompt("Please enter the amount (needs to be >0): ") || "";

    try {
      const amount = parseInt(amountStr);

      if (amount <= 0) {
        throw new Error("Amount needs to be bigger than 0");
      }

      // Make request
      const res = await fetch(`http://localhost:4000/user/${debouncedId}/account/deposit`, {
        method: "PATCH",
        body: JSON.stringify({ amount }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // If everything is ok, update the balance
      if (res.ok) {
        const newBalance = (await res.json())["balance"];
        setBalance(newBalance);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  // create a debounce function for useState

  async function withdraw() {
    const amountStr = prompt("Please enter the amount (needs to be >0): ") || "";

    try {
      const amount = parseInt(amountStr);

      if (amount <= 0) {
        throw new Error("Amount needs to be bigger than 0");
      }

      // Make request
      const res = await fetch(`http://localhost:4000/user/${debouncedId}/account/withdraw`, {
        method: "PATCH",
        body: JSON.stringify({ amount }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).catch((e) => {
        throw new Error(e.error);
      });

      // If everything is ok, update the balance
      if (res.ok) {
        const newBalance = (await res.json())["balance"];
        setBalance(newBalance);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  function logout() {
    navigate("/");
  }

  return (
    <>
      <h2>Welcome, user</h2>
      <input
        type="text"
        placeholder="Enter your unique ID"
        value={id.toString()}
        onChange={(e) => setId(e.target.value)}
      />

      {Number.isNaN(balance) && <h1>Please enter your details</h1>}
      {!Number.isNaN(balance) && (
        <div>
          <br />
          <h2>Current balance: {balance}</h2>
          <div className="buttons">
            <button onClick={() => deposit()}>Deposit</button>
            <button onClick={() => withdraw()}>Withdraw</button>
          </div>
          <br />
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </>
  );
};

export default ManagePage;
