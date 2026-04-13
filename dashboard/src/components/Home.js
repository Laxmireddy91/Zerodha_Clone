import React, { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <div>Loading...</div>;

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;