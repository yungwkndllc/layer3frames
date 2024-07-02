"use client";
import { useEffect } from "react";

export default function Redirect() {
  useEffect(() => {
    window.location.href =
      "https://app.layer3.xyz/quests/compound-supply-usdc-on-arbitrum";
  }, []);

  return <></>;
}
