import React, { useState } from "react";
import { UserContext } from "../context/UserContext.js";
import AppRouter from "../routers/AppRouter";

function App() {
  const [user, setUser] = useState(UserContext._currentValue);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRouter />
    </UserContext.Provider>
  );
}

export default App;
