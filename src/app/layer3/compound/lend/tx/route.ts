import { NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { USDC_ADDRESS, COMPOUND_ADDRESS, CHAIN_ID } from "@/utils";
import { frames } from "./tx";
import { transaction } from "frames.js/core";
import { ethers } from "ethers";
import { COMPOUND_ABI } from "./contracts/compound";

const handleRequest = frames(async (ctx) => {
  // Get the query param of amount
  const amountFromQuery = ctx.searchParams.amount;

  if (!ctx.message?.connectedAddress) {
    return NextResponse.error();
  }

  // Use ethers to pase the amount
  const amount = ethers.parseUnits(amountFromQuery, 6);

  const calldata = encodeFunctionData({
    abi: COMPOUND_ABI,
    functionName: "supply",
    args: [USDC_ADDRESS, amount],
  });

  return transaction({
    chainId: `eip155:${CHAIN_ID}`,
    method: "eth_sendTransaction",
    attribution: false,
    params: {
      abi: COMPOUND_ABI as Abi,
      to: COMPOUND_ADDRESS,
      data: calldata,
    },
  });
});

export const GET = handleRequest;
export const POST = handleRequest;
