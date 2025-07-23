import Board from './components/Board';
import { inventoryData } from './components/data.js';

function App() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Tablero de Inventario de Arte</h1>
        <p className="mt-2 text-lg text-slate-400">Estado actual de las obras por oficina.</p>
      </header>
      <main>
        <Board initialData={inventoryData} />
      </main>
      <footer className="text-center mt-12 text-slate-500"><p>Aplicación de seguimiento v1.0</p></footer>
    </div>
  );
}

export default App;