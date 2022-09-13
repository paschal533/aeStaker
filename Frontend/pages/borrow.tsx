import Head from "next/head";
import { useState } from "react";
import Input from "../components/Borrow/Input";
import { Button } from "../components/Home";

const Borrow = () => {
    const [formInput, updateFormInput] = useState({
        price: "",
        name: "",
        description: "",
      });

  return (
    <div className="flex justify-center sm:px-4 p-12">
    <Head>
      <title>Borrow AE token</title>
    </Head>
    <div className="w-3/5 md:w-full">
      <h1 className="font-poppins font-semibold text-2xl">
        Borrow AE Tokens
      </h1>

      <Input
        inputType="input"
        title="Name"
        placeholder="Asset Name"
        handleClick={(e : any) =>
          updateFormInput({ ...formInput, name: e.target.value })
        }
      />

      <Input
        inputType="textarea"
        title="Description"
        placeholder="Asset Description"
        handleClick={(e : any) =>
          updateFormInput({ ...formInput, description: e.target.value })
        }
      />

      <Input
        inputType="number"
        title="Price"
        placeholder="Asset Price"
        handleClick={(e : any) =>
          updateFormInput({ ...formInput, price: e.target.value })
        }
      />

      <div className="mt-7 w-full flex justify-end">
        <Button
            title="Borrow"
        />
      </div>
    </div>
  </div>
  )
}

export default Borrow;