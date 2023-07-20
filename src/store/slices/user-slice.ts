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
import { pendingUpdateQueueDown, pendingUpdateQueueUp } from "./pending-slice";
import { addAlert } from "./alert-slice";
import getErrorDetails from "../../utils/getErrorDetails";
import { FirebaseError } from "firebase/app";

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
    setNewEmail(state, action: { payload: string }) {
      state.email = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(userUpdateName.fulfilled, (state, action) => {
      state.name = action.payload.name;
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

export const { setUser, removeUser, setNewEmail } = userSlice.actions;

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
            navigate("/events");
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
        dispatch(addAlert(getErrorDetails(errorCode)));
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
          navigate("/events");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        dispatch(addAlert(getErrorDetails(errorCode)));
      });
    return undefined;
  }
);

export const userAutoSignIn = createAsyncThunk<undefined, undefined, {}>(
  "user/userAutoLogIn",
  async (_, { dispatch }) => {
    dispatch(pendingUpdateQueueUp());
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getDatabase();
        const dbRef = ref(db, `users/${user.uid}/userDATA/photo`);
        try {
          const snapshot = await get(dbRef);
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
        } catch (error: any) {
          dispatch(
            addAlert({
              alertText: "Auto sign in failed!",
              alertTitle: "Error!",
              alertType: "error",
            })
          );
        } finally {
          dispatch(pendingUpdateQueueDown());
        }
      } else {
        dispatch(pendingUpdateQueueDown());
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
  dispatch(pendingUpdateQueueUp());
  try {
    await signOut(auth);
    console.log("2");
    dispatch(removeUser());
    navigate("/events");
  } catch (error) {
    dispatch(
      addAlert({
        alertText: "Sign out failed!",
        alertTitle: "Error!",
        alertType: "error",
      })
    );
  } finally {
    dispatch(pendingUpdateQueueDown());
  }
  return undefined;
});

export const userUpdateName = createAsyncThunk<
  { name: string },
  { name: string },
  {}
>("user/userChangeName", async ({ name }, { dispatch, getState }) => {
  dispatch(pendingUpdateQueueUp());
  try {
    const auth = getAuth();
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      const db = getDatabase();
      const state = getState() as RootState;
      const dbRef = ref(db, `users/${state.user.ID}/userDATA/name`);
      await set(dbRef, name).then(() => {
        dispatch(
          addAlert({
            alertTitle: "Success!",
            alertText: "Successfully updated name",
            alertType: "success",
          })
        );
      });
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode: string = error.code;
      dispatch(addAlert(getErrorDetails(errorCode)));
    } else {
      dispatch(
        addAlert({
          alertText: "Updating name failed!",
          alertTitle: "Error!",
          alertType: "error",
        })
      );
    }
  } finally {
    dispatch(pendingUpdateQueueDown());
  }

  return { name: name };
});

export const userUpdateEmail = createAsyncThunk<
  undefined,
  { email: string; password: string },
  {}
>(
  "user/userUpdateEmail",
  async ({ email, password }, { dispatch, getState }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const auth = getAuth();
      if (auth.currentUser && auth.currentUser.email) {
        const credentials = EmailAuthProvider.credential(
          auth.currentUser.email,
          password
        );
        await reauthenticateWithCredential(auth.currentUser, credentials).then(
          async () => {
            if (auth.currentUser) {
              await updateEmail(auth.currentUser, email);
              const db = getDatabase();
              const state = getState() as RootState;
              const dbRef = ref(db, `users/${state.user.ID}/userDATA/email`);
              await set(dbRef, email).then(() => {
                dispatch(setNewEmail(email));
                dispatch(
                  addAlert({
                    alertText: "Successfully updated email!",
                    alertTitle: "Success!",
                    alertType: "success",
                  })
                );
              });
            }
          }
        );
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode: string = error.code;
        dispatch(addAlert(getErrorDetails(errorCode)));
      } else {
        dispatch(
          addAlert({
            alertText: "Updating email failed!",
            alertTitle: "Error!",
            alertType: "error",
          })
        );
      }
    } finally {
      dispatch(pendingUpdateQueueDown());
    }

    return undefined;
  }
);

export const userUpdatePassword = createAsyncThunk<
  undefined,
  { passwordCurrent: string; passwordNew: string },
  {}
>(
  "user/userUpdatePassword",
  async ({ passwordCurrent, passwordNew }, { dispatch }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        if (auth.currentUser.email) {
          console.log(passwordCurrent);
          const credentials = EmailAuthProvider.credential(
            auth.currentUser.email,
            passwordCurrent
          );

          await reauthenticateWithCredential(
            auth.currentUser,
            credentials
          ).then(() => {
            if (auth.currentUser) {
              updatePassword(auth.currentUser, passwordNew).then(() => {
                dispatch(
                  addAlert({
                    alertText: "Successfully updated password!",
                    alertTitle: "Success!",
                    alertType: "success",
                  })
                );
              });
            }
          });
        }
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode: string = error.code;
        dispatch(addAlert(getErrorDetails(errorCode)));
      } else {
        dispatch(
          addAlert({
            alertText: "Updating password failed!",
            alertTitle: "Error!",
            alertType: "error",
          })
        );
      }
    } finally {
      dispatch(pendingUpdateQueueDown());
    }

    return undefined;
  }
);

export const userUpdatePhoto = createAsyncThunk<
  { photo: string },
  { photo: string },
  {}
>("user/userUpdatePhoto", async ({ photo }, { dispatch }) => {
  try {
    dispatch(pendingUpdateQueueUp());
    const auth = getAuth();
    const db = getDatabase();
    if (auth.currentUser?.uid) {
      const dbRef = ref(db, `/users/${auth.currentUser.uid}/userDATA/photo`);
      await set(dbRef, photo);

      const dbRefChats = ref(db, `/users/${auth.currentUser?.uid}/chats`);
      const snapshotChats = await get(dbRefChats);

      if (snapshotChats.exists()) {
        for (const i of Object.keys(snapshotChats.val())) {
          const dbRefChatPhoto = ref(
            db,
            `/users/${i}/chats/${auth.currentUser?.uid}/photo`
          );
          await set(dbRefChatPhoto, photo);
        }
      }
    }
  } catch (error) {
    dispatch(
      addAlert({
        alertText: "Updating photo failed!",
        alertTitle: "Error!",
        alertType: "error",
      })
    );
  } finally {
    dispatch(pendingUpdateQueueDown());
  }

  return { photo: photo };
});

export const userRemovePhoto = createAsyncThunk<undefined, undefined, {}>(
  "user/userRemovePhoto",
  async (_, { dispatch }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const auth = getAuth();
      const db = getDatabase();
      if (auth.currentUser?.uid) {
        const dbRef = ref(db, `/users/${auth.currentUser.uid}/userDATA/photo`);
        await remove(dbRef);
      }
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Removing photo failed!",
          alertTitle: "Error!",
          alertType: "error",
        })
      );
    } finally {
      dispatch(pendingUpdateQueueDown());
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
  dispatch(pendingUpdateQueueUp());
  const db = getDatabase();
  const dbRef = ref(db, `/users/${ID}/userDATA`);
  let userDATA: foundUserData | null = null;

  try {
    await get(dbRef).then((snapshot) => {
      userDATA = snapshot.val();
    });
  } catch (error) {
    dispatch(
      addAlert({
        alertText: "Founding user failed!",
        alertTitle: "Error!",
        alertType: "error",
      })
    );
  } finally {
    dispatch(pendingUpdateQueueDown());
  }
  return userDATA;
});
