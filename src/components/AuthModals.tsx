"use client";

import { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import { Button } from "./ui/button";

export enum ActiveModal {
  SIGNUP = "signup",
  SIGNIN = "signin",
}

export default function AuthModals() {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  return (
    <div className="flex items-center gap-3">
      {/* Sign In Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setActiveModal(ActiveModal.SIGNIN)}
      >
        Sign In
      </Button>

      {/* Sign Up Trigger Button */}
      <Button onClick={() => setActiveModal(ActiveModal.SIGNUP)}>
        Sign Up
      </Button>

      {/* Modals */}
      <Signup activeModal={activeModal} setActiveModal={setActiveModal} />
      <Signin activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
}
