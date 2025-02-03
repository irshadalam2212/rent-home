import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="w-11/12 mx-auto pb-3">
      <Outlet />
    </div>
  );
}

export default App;