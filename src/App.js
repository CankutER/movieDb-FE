import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/login";
import { ManagerPage } from "./pages/manager";
import { DirectorPage } from "./pages/director";
import { AudiencePage } from "./pages/audience";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/admin" element={<ManagerPage></ManagerPage>}></Route>
        <Route path="/director" element={<DirectorPage></DirectorPage>}></Route>
        <Route path="/audience" element={<AudiencePage></AudiencePage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
