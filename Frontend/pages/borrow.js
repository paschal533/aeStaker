import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Input from "../components/Borrow/Input";
import { Button, Footer, Header } from "../components/Home";
import { useToast } from "@chakra-ui/react";
import uniqid from "uniqid";
import { client } from "../client";

const Borrow = () => {
  const [formInput, updateFormInput] = useState({
    price: "",
    address: "",
    nft: "",
    email: "",
  });
  const toast = useToast();
  const router = useRouter();

  const borrowToken = async () => {
    const { price, address, nft, email } = formInput;
    if (!price || !address || !nft || !email)
      return toast({
        position: "top-left",
        title: "Borrow",
        description: "Please fill the form correctly",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    try {
      const doc = {
        _id: uniqid(),
        _type: "borrower",
        address: address,
        price: price,
        nft: nft,
        email: email,
      };

      client.createIfNotExists(doc).then(() => {
        toast({
          position: "top-left",
          title: "Borrow",
          description: "Borrow request submitted successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/");
      });
    } catch (error) {
      console.log(error);
      toast({
        position: "top-left",
        title: "Borrow",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center sm:px-4 p-12 bg-[#E7ECEE]">
        <Head>
          <title>Borrow AE token</title>
        </Head>
        <div className="w-3/5 md:w-full">
          <h1 className="font-poppins font-semibold text-2xl">
            Borrow AE Tokens
          </h1>

          <Input
            inputType="input"
            title="Wallet Address"
            placeholder="SuperHero Address"
            handleClick={(e) =>
              updateFormInput({ ...formInput, address: e.target.value })
            }
          />

          <Input
            inputType="input"
            title="Email"
            placeholder="Your Email"
            handleClick={(e) =>
              updateFormInput({ ...formInput, email: e.target.value })
            }
          />

          <Input
            inputType="textarea"
            title="Collateral"
            placeholder="Your NFT link Address"
            handleClick={(e) =>
              updateFormInput({ ...formInput, nft: e.target.value })
            }
          />

          <Input
            inputType="number"
            title="Amount"
            placeholder="Amount to borrow"
            handleClick={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />

          <div className="mt-7 w-full flex justify-end">
            <Button title="Borrow" onClick={borrowToken} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Borrow;
