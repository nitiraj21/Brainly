import { DashBoard } from "./pages/DashBoard"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import { SharedBrain } from "./pages/SharedBrain"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Landing } from "./pages/Landing"


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/" element={<Landing/>}/>
      <Route path="/brain/:shareLink" element= {<SharedBrain/>}/>
    </Routes>
  </BrowserRouter>

}

export default App
