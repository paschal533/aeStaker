import type { NextPage } from 'next'
import Head from 'next/head'
import { Header, Landing, StakeStep, Steps, BorrowStep, Footer } from '../components/Home'
import { Box } from '@chakra-ui/react'

const Home: NextPage = () => {

  return (
    <div className="bg-[#E7ECEE]">
      <Head>
        <title>Home</title>
      </Head>
      <Header />

      <main className="relative h-[200vh] pl-8 sm:pl-0 bg-[#E7ECEE]">
        <Landing />
      </main>
      <Box
        position="relative"
        zIndex={40}
        bg="#560d58"
      >
        <section className="relative z-40 -mt-[100vh] min-h-screen">
          <div className="py-16">
            <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
              What We Do
            </h1>
            <p className="text-center mt-4 text-white">All we do is put a smile on your face</p>
          </div>
          <Steps />
          <br />
        </section>
      </Box>
      <section className="">
        <div className="py-16">
          <h1 className="text-center text-4xl font-medium md:text-5xl">
              How To Stake
          </h1>
          <p className="text-center mt-4 ">Staking in details</p>
        </div>
        <StakeStep />
      </section>
      <Box
        position="relative"
        zIndex={40}
        bg="#560d58"
      >
      <section className=" text-white">
        <div className="py-16">
          <h1 className="text-center text-4xl font-medium md:text-5xl">
              How To Borrow
          </h1>
          <p className="text-center mt-4 ">A smarter way to borrow</p>
        </div>
        <BorrowStep />
        <br />
        <br />
      </section>
      </Box>
      <Footer />
    </div>
  )
}

export default Home
