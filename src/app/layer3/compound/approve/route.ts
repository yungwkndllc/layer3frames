import { NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { USDC_ABI } from "./contracts/usdc";
import { USDC_ADDRESS, COMPOUND_ADDRESS, CHAIN_ID } from "@/utils";
import { frames } from "./approve";
import { transaction } from "frames.js/core";
import { ethers } from "ethers";

const handleRequest = frames(async (ctx) => {
  // Get the query param of message
  if (!ctx.message?.inputText) {
    return NextResponse.error();
  }

  // Use ethers to pase the amount
  const amount = ethers.parseUnits(ctx.message.inputText, 6);

  const calldata = encodeFunctionData({
    abi: USDC_ABI,
    functionName: "approve",
    args: [COMPOUND_ADDRESS, amount],
  });

  return transaction({
    chainId: `eip155:${CHAIN_ID}`,
    method: "eth_sendTransaction",
    attribution: false,
    params: {
      abi: USDC_ABI as Abi,
      to: USDC_ADDRESS,
      data: calldata,
    },
  });
});

export const GET = handleRequest;
export const POST = handleRequest;
