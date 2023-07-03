import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase";
import { NavigateFunction } from "react-router-dom";

interface initialStateI {
  name: string;
  photo: string;
  email: string;
  token: string;
  ID: string;
}
const initialState: initialStateI = {
  name: "",
  photo: "",
  email: "",
  token: "",
  ID: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: { payload: initialStateI }) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.token = action.payload.token;
      state.ID = action.payload.ID;
    },
    removeUser(state) {
      console.log("remove");
      state.email = "";
      state.name = "";
      state.photo = "";
      state.token = "";
      state.ID = "";
    },
  },
});

export default userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;

export const userCreate = createAsyncThunk<
  undefined,
  {
    userName: string;
    email: string;
    password: string;
    navigate: NavigateFunction;
  },
  {}
>(
  "user/userCreate",
  async ({ userName, email, password, navigate }, { dispatch }) => {
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        await updateProfile(user, { displayName: userName }).then(() => {
          dispatch(
            setUser({
              email: email,
              ID: user.uid,
              name: userName,
              photo: "",
              token: user.refreshToken,
            })
          );
          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
    return undefined;
  }
);

export const userSignIn = createAsyncThunk<
  undefined,
  {
    userName: string;
    email: string;
    password: string;
    navigate: NavigateFunction;
  },
  {}
>(
  "user/userSignIn",
  async ({ userName, email, password, navigate }, { dispatch }) => {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.email && user.displayName) {
          dispatch(
            setUser({
              email: user.email,
              ID: user.uid,
              name: user.displayName,
              photo: user.photoURL ? user.photoURL : "",
              token: user.refreshToken,
            })
          );
          navigate("/");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    return undefined;
  }
);

export const userAutoSignIn = createAsyncThunk<undefined, undefined, {}>(
  "user/userAutoLogIn",
  async (_, { dispatch }) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        if (user.email && user.displayName) {
          console.log(user);
          dispatch(
            setUser({
              email: user.email,
              ID: user.uid,
              name: user.displayName,
              photo: user.photoURL ? user.photoURL : "",
              token: user.refreshToken,
            })
          );
        }
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    return undefined;
  }
);

export const userSignOut = createAsyncThunk<
  undefined,
  { navigate: NavigateFunction },
  {}
>("user/userSignOut", async ({ navigate }, { dispatch }) => {
  const auth = getAuth();
  await signOut(auth)
    .then(() => {
      console.log("2");

      dispatch(removeUser());
      navigate("/");
    })
    .catch((error) => {
      // An error happened.
    });

  return undefined;
});
