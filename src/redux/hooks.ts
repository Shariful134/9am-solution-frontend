import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
// import { AppDispatch, RootState } from "./store";

import type { AppDispatch, RootState } from "./store";

export const useAppDispath: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
