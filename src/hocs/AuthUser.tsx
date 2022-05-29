import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../const/routes';

export default function AuthRequired({
  redirectTo,
  children,
}: {
  redirectTo?: string;
  children: React.ReactNode;
}) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={redirectTo || AppRoute.NOT_FOUND_PAGE} />;
  }

  return <>{children}</>;
}
