import Head from "next/head";
import Link from "next/link";
import { Button, Footer, Header } from "../components/Home";
import {
  BalanceStaked,
  Banner,
  Staked,
  StakerOptions,
} from "../components/Stake";

const Home = () => {
  return (
    <div className="bg-[#E7ECEE]">
      <Head>
        <title>Stake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="pl-20 pr-20 sm:pr-4 sm:pl-4">
        <Banner
          name={
            <>
              Stake your AE tokens And Earn <br /> Rewards
            </>
          }
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          show
        />
        <BalanceStaked />
        <div className="border-2 mb-8 drop-shadow-2xl">
          <Staked />
        </div>

        <div className="mb-6 w-full justify-center items-center text-center">
          <Link href="/plans">
            <Button title="Stake your tokens" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
