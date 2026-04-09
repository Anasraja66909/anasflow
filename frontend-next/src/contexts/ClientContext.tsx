"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Client {
  id: string;
  name: string;
  company_name: string | null;
}

interface ClientContextType {
  activeClientId: string | null;
  setActiveClientId: (id: string | null) => void;
  clients: Client[];
  fetchClients: () => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  const activeClient = Array.isArray(clients)
    ? clients.find((c) => c.id === activeClientId)
    : undefined;

  const fetchClients = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;
      const res = await fetch("http://localhost:8000/clients/", {
        headers: { Authorization: "Bearer " + storedToken },
      });
      if (res.ok) {
        const data = await res.json();
        // Backend returns {"clients": [...]}
        const clientList = Array.isArray(data.clients)
          ? data.clients
          : Array.isArray(data)
            ? data
            : [];
        setClients(clientList);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider
      value={{ activeClientId, setActiveClientId, clients, fetchClients }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
}
