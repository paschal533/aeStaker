import Image from "next/image";
import React from "react";
import Button from "./Button";
import Coin from "../../assets/coin.png";
import Link from "next/link";

function Landing() {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8">
        <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
             Earn
          </span>
          <span className="block">As you Stake</span>
          <span className="block">Driven By Values</span>
        </h1>

        <div className="space-x-8">
          <Link href="/stake"><Button title="Stake Now" /></Link>
          <Link href="/borrow" className="link">Borrow</Link>
        </div>
      </div>

      <div className="relative sm:hidden h-[450px] w-[450px] transition-all duration-500 inline lg:h-[650px] lg:w-[600px]">
        <Image src={Coin} layout="fill" objectFit="contain" />
      </div>
    </section>
  );
}

export default Landing;
