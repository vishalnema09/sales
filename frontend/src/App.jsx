// src/App.jsx
import React from "react";
import MainLayout from "./layout/MainLayout";
import Sales from "./pages/Sales";

export default function App() {
  return (
    <MainLayout>
      <Sales />
    </MainLayout>
  );
}
