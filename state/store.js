import axios from "axios";
import { useRouter } from "next/router";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
// export const reservationStore = create((set) => ({
//   reservationDetails: {},
//   storeReservation: (data) => set(() => ({ reservationDetails: data })),
// }));

export const reservationStore = create(
  persist(
    (set, get) => ({
      reservationDetails: {},
      storeReservation: (data) => set(() => ({ reservationDetails: data })),
    }),
    {
      name: "reservationDetails", // name of the item in the storage (must be unique)
    }
  )
);

export const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      reservationHistory: [],
      storeUser: (data) => set(() => ({ user: data })),

      logout: () => {
        set(() => ({ user: null, token: null }));
      },
    }),
    {
      name: "user", // name of the item in the storage (must be unique)
    }
  )
);
