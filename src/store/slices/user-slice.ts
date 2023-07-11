import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase";
import { NavigateFunction } from "react-router-dom";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import { RootState } from "..";
import { memberDATAI } from "./chat-slice";

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
  extraReducers(builder) {
    builder.addCase(userUpdateName.fulfilled, (state, action) => {
      state.name = action.payload.name;
    });
    builder.addCase(userUpdateEmail.fulfilled, (state, action) => {
      state.email = action.payload.email;
    });
    builder.addCase(userUpdatePhoto.fulfilled, (state, action) => {
      console.log(action.payload.photo);
      state.photo = action.payload.photo;
    });
    builder.addCase(userRemovePhoto.fulfilled, (state) => {
      state.photo = "";
    });
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
        await updateProfile(user, { displayName: userName })
          .then(() => {
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
            return user;
          })
          .then(async (snapshot) => {
            const db = getDatabase();
            const userData = {
              name: snapshot.displayName,
              email: snapshot.email,
              photo: "",
            };
            const dbRef = ref(db, `users/${snapshot.uid}/userDATA`);
            await set(dbRef, userData);
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
    console.log("user");
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getDatabase();
        const dbRef = ref(db, `users/${user.uid}/userDATA/photo`);
        await get(dbRef).then((snapshot) => {
          if (user.email && user.displayName) {
            dispatch(
              setUser({
                email: user.email,
                ID: user.uid,
                name: user.displayName,
                photo: snapshot.val() ? snapshot.val() : "",
                token: user.refreshToken,
              })
            );
          }
        });
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

export const userUpdateName = createAsyncThunk<
  { name: string },
  { name: string },
  {}
>("user/userChangeName", async ({ name }, { dispatch, getState }) => {
  const auth = getAuth();
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name }).then(
      async () => {
        const db = getDatabase();
        const state = getState() as RootState;
        const dbRef = ref(db, `users/${state.user.ID}/userDATA/name`);
        set(dbRef, name);
      }
    );
  }

  return { name: name };
});

export const userUpdateEmail = createAsyncThunk<
  { email: string },
  { email: string },
  {}
>("user/userUpdateEmail", async ({ email }, { dispatch, getState }) => {
  const auth = getAuth();
  if (auth.currentUser) {
    updateEmail(auth.currentUser, email).then(async () => {
      const db = getDatabase();
      const state = getState() as RootState;
      const dbRef = ref(db, `users/${state.user.ID}/userDATA/email`);
      set(dbRef, email);
    });
  }

  return { email: email };
});

export const userUpdatePassword = createAsyncThunk<
  undefined,
  { passwordCurrent: string; passwordNew: string },
  {}
>(
  "user/userUpdatePassword",
  async ({ passwordCurrent, passwordNew }, { dispatch }) => {
    const auth = getAuth();
    if (auth.currentUser) {
      if (auth.currentUser.email) {
        console.log(passwordCurrent);
        const credentials = EmailAuthProvider.credential(
          auth.currentUser.email,
          passwordCurrent
        );

        await reauthenticateWithCredential(auth.currentUser, credentials)
          .then((s) => {
            if (auth.currentUser) {
              updatePassword(auth.currentUser, passwordNew);
              console.log("success");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    return undefined;
  }
);

export const userUpdatePhoto = createAsyncThunk<
  { photo: string },
  { photo: string },
  {}
>("user/userUpdatePhoto", async ({ photo }, { dispatch, getState }) => {
  const auth = getAuth();
  const db = getDatabase();
  if (auth.currentUser?.uid) {
    const dbRef = ref(db, `/users/${auth.currentUser.uid}/userDATA/photo`);
    await set(dbRef, photo)
      .catch((e) => {
        console.log(e);
      })
      .then(async () => {
        const dbRef = ref(db, `/users/${auth.currentUser?.uid}/chats`);
        await get(dbRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            for (const i of Object.keys(snapshot.val())) {
              const dbRef = ref(
                db,
                `/users/${i}/chats/${auth.currentUser?.uid}/photo`
              );
              set(dbRef, photo);
            }
          }
        });
      });
  }
  return { photo: photo };
});

export const userRemovePhoto = createAsyncThunk<undefined, undefined, {}>(
  "user/userRemovePhoto",
  async (_, { dispatch }) => {
    const auth = getAuth();
    const db = getDatabase();
    if (auth.currentUser?.uid) {
      const dbRef = ref(db, `/users/${auth.currentUser.uid}/userDATA/photo`);
      remove(dbRef);
    }
    return undefined;
  }
);

export type foundUserData = Pick<initialStateI, "name" | "email" | "photo">;

export const userFindUser = createAsyncThunk<
  memberDATAI | null,
  { ID: string },
  {}
>("user/userFindUser", async ({ ID }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `/users/${ID}/userDATA`);
  let userDATA: foundUserData | null = null;
  await get(dbRef).then((snapshot) => {
    userDATA = snapshot.val();
  });
  return userDATA;
});
