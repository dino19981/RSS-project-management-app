import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../const/routes';

export default function AuthRequired({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={AppRoute.NOT_FOUND_PAGE} />;
  }

  return { children };
}
