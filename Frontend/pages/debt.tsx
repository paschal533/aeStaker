import Head from "next/head";
import { useState, useContext } from "react";
import Input from "../components/Borrow/Input";
import { Button, Footer, Header } from "../components/Home";
import { useToast } from "@chakra-ui/react";
import { StakerContext } from "../context/StakerContext";

const Debt = () => {
    const [formInput, updateFormInput] = useState({
        price: "",
        address: "",
      });
    const toast = useToast();
  
    const { payDebt } = useContext(StakerContext);

  const repayToken = async () => {
    const { price, address } = formInput;
    if (!price || !address )  
    return  toast({
      position: "top-left",
      title: "Borrow",
      description: "Please fill the form correctly",
      //status: "error",
      duration: 9000,
      isClosable: true,
    }); 
    
    await payDebt(address, price)  
     
  }
  return (
    <div> <Header />
    <div className="flex justify-center sm:px-4 p-12 bg-[#E7ECEE] h-[100vh]">
    <Head>
    <title>Repay AE token</title>
    </Head>
    <div className="w-3/5 md:w-full">
    <h1 className="font-poppins font-semibold text-2xl">
       Repay AE tokens borrowed
    </h1> 
    <Input
        title="Address"
        placeholder="Address"
        handleClick={(e : any) =>
        updateFormInput({ ...formInput, address: e.target.value })
        }
    />

    <Input
        inputType="number"
        title="Amount"
        placeholder="Amount to pay"
        handleClick={(e: any) =>
        updateFormInput({ ...formInput, price: e.target.value })
        }
    />

    <div className="mt-7 w-full flex justify-end">
        <Button
        title="Pay debt"
        onClick={repayToken}
        />
    </div>
    </div>
</div>
<Footer />
    </div>
  )
}

export default Debt;