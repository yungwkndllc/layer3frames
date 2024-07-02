/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./compound";
import { IMAGE_URL, VERCEL_URL } from "@/utils";

const handleRequest = frames(async (ctx) => {
  let buttons = [
    <Button
      action="tx"
      target={`${VERCEL_URL}/layer3/compound/approve`}
      post_url="/lend"
    >
      Approve USDC
    </Button>,
  ];

  return {
    image: IMAGE_URL,
    imageOptions: {
      aspectRatio: "1.91:1",
    },
    textInput: "How much USDC to approve?",
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
