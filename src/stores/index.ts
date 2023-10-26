import { AnyAction, Reducer, configureStore } from "@reduxjs/toolkit";
// ...

const modules: Record<string, any> = import.meta.glob("./*/index.ts", {
  eager: true,
});

const reducer = Object.keys(modules).reduce(
  (mod, key): Record<string, Reducer<any, AnyAction>> => ({
    ...mod,
    [modules[key].namespace]: modules[key].reducer,
  }),
  {}
);

export const store = configureStore({ reducer, devTools: true });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
