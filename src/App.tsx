import 'leaflet/dist/leaflet.css';
import 'flowbite/dist/flowbite.css';
import AppRouter from './routers/AppRoter';
import { ThemeProvider } from './components/ThemeContext';



function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
