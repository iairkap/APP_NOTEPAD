import "./App.css";
import SideBar from "./components/sideBar";
import NotesCardContainer from "./components/notesCardContainer";
import { GlobalProvider } from "./globalContext";



const App = () => {
  return (
    <GlobalProvider>
      <main className="app-layout">
        <SideBar />
        <NotesCardContainer />
      </main>
    </GlobalProvider>
  )
}

export default App;