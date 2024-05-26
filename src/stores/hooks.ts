import {
    useEffect,
    useState,
    useLayoutEffect,
    useRef,
    Dispatch,
    SetStateAction,
    useCallback,
} from "react";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import type { RootState } from ".";

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDebounce = <T>(value: T, timeOut = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), timeOut);
        return () => clearTimeout(handler);
    }, [value, timeOut]);

    return debouncedValue;
};

export const useForceRerender = () => {
    const [, setToggle] = useState(false);
    return () => setToggle((toggle) => !toggle);
};

export const useMounted = () => {
    const mountedRef = useRef(false);
    useLayoutEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);
    return mountedRef;
};

export const useSafeState = <s>(
    initialState: s | (() => s)
): [s, Dispatch<SetStateAction<s>>] => {
    const [state, setState] = useState(initialState);

    const mountedRef = useMounted();
    const safeSetState: Dispatch<SetStateAction<s>> = useCallback(
        (update) => {
            if (mountedRef.current) {
                setState(update);
            }
        },
        [mountedRef]
    );
    return [state, safeSetState];
};
