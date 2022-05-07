import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <header></header>
      <Outlet />
      <footer></footer>
    </>
  );
}
