import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage } from "./Routes.ts";
import RenderMap from "./components/rendermap/RenderMap.tsx";
import { useUserContext } from "./UserContext.tsx";

function App() {
  const { user } = useUserContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RenderMap />} />
          {!user && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
