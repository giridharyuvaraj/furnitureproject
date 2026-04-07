import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/common/Loader";
import "./styles/theme.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "./utils/constants";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </Elements>
  );
}

export default App;
