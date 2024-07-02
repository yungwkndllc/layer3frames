/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./layer3";
import { IMAGE_URL, VERCEL_URL } from "@/utils";

const handleRequest = frames(async (ctx) => {
  let buttons = [
    <Button action="post" target={`${VERCEL_URL}/layer3/compound`}>
      Complete Compound Finance Quest
    </Button>,
  ];

  if (ctx.message?.transactionId) {
    buttons.push(
      <Button
        action="link"
        target={`https://app.layer3.xyz/quests/compound-supply-usdc-on-arbitrum`}
      >
        Go to Layer3
      </Button>
    );
  }

  return {
    image: IMAGE_URL,
    imageOptions: {
      aspectRatio: "1.91:1",
    },
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
