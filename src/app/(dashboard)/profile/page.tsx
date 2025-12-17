import ProfileSettings from "@/components/ProfileSettings";
import React from "react";

export default function Profile() {
  return (
    <div className="flex-1 flex-col py-24 px-6">
      <h2 className="text-3xl leading-[52.8px] tracking-[-1.5px] font-semibold">
        My Profile
      </h2>
      <ProfileSettings />
    </div>
  );
}
