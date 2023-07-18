import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage } from "./Routes.ts";
import RenderMap from "./components/rendermap/RenderMap.tsx";

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RenderMap />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
