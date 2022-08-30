import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../models/store';
import { rootReducer } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type TAppState = ReturnType<typeof rootReducer>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
