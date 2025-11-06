import { createSlice } from "@reduxjs/toolkit";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";

let unsubscribeProducts = null;

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    sortOption: "default",
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError, setSortOption } = productsSlice.actions;

/* 🔥 Real-time Firestore listener */
export const startProductsListener = () => (dispatch) => {
  const db = getFirestore();
  dispatch(setLoading(true));

  const colRef = collection(db, "products");
  const q = query(colRef, orderBy("createdAt", "desc"));

  unsubscribeProducts = onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((p) => p.deleted === 0);

      dispatch(setProducts(items));
    },
    (error) => {
      dispatch(setError(error.message));
    }
  );
};

/* 🧹 Stop listening when component unmounts */
export const stopProductsListener = () => {
  if (unsubscribeProducts) {
    unsubscribeProducts();
    unsubscribeProducts = null;
  }
};

export default productsSlice.reducer;

/* 🧩 Memoized selector for sorted products */
import { createSelector } from "@reduxjs/toolkit";

export const selectSortedProducts = createSelector(
  [(state) => state.products.items, (state) => state.products.sortOption],
  (items, sortOption) => {
    let sorted = [...items];
    switch (sortOption) {
      case "lowToHigh":
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case "highToLow":
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case "newest":
        sorted.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
      default:
        break;
    }
    return sorted;
  }
);
