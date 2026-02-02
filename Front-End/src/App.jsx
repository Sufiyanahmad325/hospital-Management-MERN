import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRouter";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state) =>
    state.hospitalManagement.isLoading ||
    state.doctorControl.isLoading ||
    state.patientControl.isLoading
  );

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      {/* Global loader */}
      {isLoading && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white/60 z-50">
          <div className="w-10 h-10 sm:w-15 sm:h-15 rounded-full border-4 border-gray-300 border-t-gray-600 animate-spin"></div>
          <span>Loading...</span>
        </div>
      )}
    </>
  );
}

export default App;
