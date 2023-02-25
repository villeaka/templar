import { useState } from "react";
import "./App.css";
import Authentication from "./components/Authentication";
import LogoutButton from "./components/LogoutButton";
import { AuthContext } from "./context/auth";
import { getStoredAccessToken, resetStoredAccessToken, setStoredAccessToken } from "./utils/auth";

function App() {
  const [accessToken, setAccessToken] = useState(getStoredAccessToken());

  const handleLogin = (accessToken: string) => {
    setStoredAccessToken(accessToken);
    setAccessToken(accessToken);
  };

  const handleLogout = () => {
    resetStoredAccessToken();
    setAccessToken(undefined);
  };

  if (!accessToken) {
    return <Authentication onLogin={handleLogin} />;
  }

  return (
    <AuthContext.Provider value={{ accessToken }}>
      <LogoutButton onLogout={handleLogout} />
    </AuthContext.Provider>
  );
}

export default App;
