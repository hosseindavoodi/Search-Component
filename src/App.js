import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Search from "./Components/Search";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Search />
      </div>
    </QueryClientProvider>
  );
}

export default App;
