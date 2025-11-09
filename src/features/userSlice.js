import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

// ======================================================
// 🧩 SIGNUP (with Email Verification)
// ======================================================
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCred;

      // Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        phone: null,
        emailVerified: user.emailVerified,
        photoURL: null,
        admin: 0,
      });

      // Send verification email
      if (!user.emailVerified) {
        await sendEmailVerification(user);
      }

      // 🚨 Sign out immediately to enforce verification first
      await signOut(auth);

      // Return message instead of user
      return {
        message:
          "Account created successfully! Please verify your email before logging in.",
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


// ======================================================
// 🧩 LOGIN (with Email Verification check)
// ======================================================
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCred;

      // Check verification
      if (!user.emailVerified) {
        const error = new Error("Email not verified. Please verify before login.");
        error.code = "EMAIL_NOT_VERIFIED";
        throw error;
      }

      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);

      return userSnap.exists()
        ? { uid: user.uid, ...userSnap.data() }
        : { uid: user.uid, email: user.email, emailVerified: user.emailVerified };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ======================================================
// 🧩 RESEND VERIFICATION EMAIL
// ======================================================
export const resendVerification = createAsyncThunk(
  "user/resendVerification",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user logged in");
      }
      if (currentUser.emailVerified) {
        return "Email is already verified.";
      }
      await sendEmailVerification(currentUser);
      return "Verification email sent successfully.";
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ======================================================
// 🧩 RESET PASSWORD
// ======================================================
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent successfully.";
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ======================================================
// 🧩 LOGOUT
// ======================================================
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await signOut(auth);
  return null;
});

// ======================================================
// 🧩 AUTH STATE LISTENER
// ======================================================
export const listenToAuthChanges = createAsyncThunk(
  "user/listenToAuthChanges",
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(docRef);
            resolve(
              userSnap.exists()
                ? { uid: currentUser.uid, ...userSnap.data() }
                : {
                  uid: currentUser.uid,
                  email: currentUser.email,
                  emailVerified: currentUser.emailVerified,
                }
            );
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

// ======================================================
// 🧩 SLICE
// ======================================================
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearAlerts: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 LOGIN
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

      // 🔹 SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null; // 👈 no user stays logged in
        state.message = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 RESET PASSWORD
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 RESEND VERIFICATION
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // 🔹 AUTH STATE CHANGE
      .addCase(listenToAuthChanges.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearAlerts } = userSlice.actions;
export default userSlice.reducer;
