import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../rootReducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector