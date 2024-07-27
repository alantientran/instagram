import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

// QueryProvider is a wrapper around QueryClientProvider, which serves as a context provider for the query client
// context provider is a way to pass data through the component tree without having to pass props down manually at every level
export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* render the children */}
        {children}
      </QueryClientProvider>
    </div>
  );
};
