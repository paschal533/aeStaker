import Image from "next/image";
import { useState, useContext } from "react";
import Link from "next/link";
import Button from "./Button";
import { StakerContext } from "../../context/StakerContext";
import Logo from "../../assets/staker.png";

function Header() {
  const { address, fetchAccount } = useContext(StakerContext);

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      <div className="flex items-center justify-center lg:w-1/6">
        <Link href="/">
          <div className="relative justify-center text-center items-center flex cursor-pointer opacity-75 transition hover:opacity-100">
            <Image height={50} width={40} src={Logo} alt="staker" />
            <p className="text-lg sm:hidden block font-bold ml-2">aeStaker</p>
          </div>
        </Link>
      </div>
      <div className="sm:hidden flex-1 items-center justify-center space-x-8 flex">
        <Link href="/">
          <h1 className="headerLink">Explore</h1>
        </Link>
        <Link href="/stake">
          <h1 className="headerLink">Stake</h1>
        </Link>
        <Link href="/borrow">
          <h1 className="headerLink">Borrow</h1>
        </Link>
        <Link href="/debt">
          <h1 className="headerLink">Debt</h1>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-x-4 sm:w-[50vw] w-1/5">
        {!address ? (
          <Button title="Connect Wallet" onClick={() => fetchAccount()} />
        ) : (
          <Button title={`${address.slice(0, 6)}...${address.slice(-5)}`} />
        )}
      </div>
    </header>
  );
}

export default Header;
