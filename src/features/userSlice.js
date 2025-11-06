// src/features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // ✅ Use initialized Firebase app

// 🧩 LOGIN
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", userCred.user.uid);
      const userSnap = await getDoc(docRef);

      return userSnap.exists()
        ? { uid: userCred.user.uid, ...userSnap.data() }
        : { uid: userCred.user.uid, email: userCred.user.email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🧩 SIGNUP
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        createdAt: new Date(),
      });
      return { uid: userCred.user.uid, name, email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🧩 FORGOT PASSWORD
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent.";
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🧩 LOGOUT
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await signOut(auth);
  return null;
});

// 🧩 AUTH STATE LISTENER
export const listenToAuthChanges = createAsyncThunk(
  "user/listenToAuthChanges",
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(docRef);
            resolve(userSnap.exists() ? { uid: currentUser.uid, ...userSnap.data() } : null);
          } else {
            resolve(null);
          }
        });
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🧩 SLICE
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // AUTH LISTENER
      .addCase(listenToAuthChanges.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
