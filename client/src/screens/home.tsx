import React from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();

  async function createAccount() {
    // create the account and get the id
    const res = await fetch("http://localhost:4000/create", {
      method: "POST",
    });

    // navigate to the manage account page
    navigate(`/manage?id=${(await res.json())["id"]}`, {});
  }

  async function gotoManageAccount() {
    navigate("/manage");
  }

  return (
    <>
      <h1>Welcome to UoM Bank</h1>
      <h3>What would you like to do?</h3>
      <div className="buttons">
        <button onClick={() => createAccount()}>Make an account</button>
        <button onClick={() => gotoManageAccount()}>Manage my account</button>
      </div>
    </>
  );
};

export default Home;
