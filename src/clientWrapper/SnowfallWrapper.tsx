"use client";

import React from "react";
import Snowfall from "react-snowfall";

export default function SnowfallWrapper() {
  return (
    <div>
      <Snowfall snowflakeCount={20} />
    </div>
  );
}
