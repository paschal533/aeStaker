import { Button, Footer, Header } from "../components/Home"
import { useContext } from "react";
import { StakerContext } from "../context/StakerContext";
import Image from "next/image"
import Check from "../assets/check.png";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import { Loader } from "../components/Stake";


const Plan = ({ title, description, decs, featureOne, featureTwo, featureThree, onClick} : any) => {
  const { setStakeValue, loading } = useContext(StakerContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  return(
    <div className="bg-white rounded-md w-[300px] sm:w-full p-4 drop-shadow-2xl">
      <h1 className="font-bold text-2xl mb-2">{title}</h1>
      <p className="text-2xl mb-2">{description}</p>
      <p className="">{decs}</p>
      <div className="border-2 mt-6 p-4 mb-4">
        <div className="flex">
          <Image src={Check} width={25} height={25} alt="check" />
          <p className="ml-3">{featureOne}</p>
        </div>
        <div className="flex mt-4">
          <Image src={Check} width={25} height={25} alt="check" />
          <p className="ml-3">{featureTwo}</p>
        </div>
        <div className="flex mt-4">
          <Image src={Check} width={25} height={25} alt="check" />
          <p className="ml-3">{featureThree}</p>
        </div>
      </div>
      <Button title="Get Started" onClick={onOpen} />
      <div>
       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
            <ModalBody>
             {loading ?
             <div className="w-full justify-center text-center items-center flex">
               <Loader />
             </div> :
             <div>
                <div className="bg-[#E7ECEE] flex border border-nft-gray-2 rounded-lg w-full outline-none font-poppins text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
                    <input
                        type="number"
                        className="flex-1 w-full bg-[#E7ECEE] outline-none "
                        placeholder="How many AE tokens?"
                        onChange={(e) => setStakeValue(e.target.value)}
                    />
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                    AE
                    </p>
                </div>
                <div className="border-2 mt-6 p-4 mb-4">
                    <div className="flex">
                    <Image src={Check} width={25} height={25} alt="check" />
                    <p className="ml-3">{featureOne}</p>
                    </div>
                    <div className="flex mt-4">
                    <Image src={Check} width={25} height={25} alt="check" />
                    <p className="ml-3">{featureTwo}</p>
                    </div>
                    <div className="flex mt-4">
                    <Image src={Check} width={25} height={25} alt="check" />
                    <p className="ml-3">{featureThree}</p>
                    </div>
                </div>
             </div>}
            </ModalBody>

            <ModalFooter>
              <Button title='Stake token' onClick={onClick} />
            </ModalFooter>
          </ModalContent>
        </Modal>
     </div>
    </div>
  )
}

const Plans = () => {
  const { stakeAE} = useContext(StakerContext);
  return (
    <div className="bg-[#E7ECEE]">
    <Header />
    <div className="w-full pl-10 pr-10 text-center justify-center mb-28 sm:pl-4 sm:pr-4">
      <div>
        <h1 className="font-bold text-3xl">Choose A Plan</h1>
        <p className="mt-4">We got a plan that is perfect for you.</p>
      </div>
      <div className="mt-6 flex sm:flex-col justify-between sm:space-y-6 space-y-0 sm:pl-0 sm:pr-0 pl-20 pr-20">
        <Plan 
          title="Basic" 
          description="Bi-weekly plan" 
          decs="Most popular" 
          featureOne="Stake any Amount" 
          featureTwo="Withdraw in 30 days"
          featureThree="Get 7% interest"
          onClick={() => stakeAE(30)}
        />
        <Plan 
          title="Professional" 
          description="Monthly plan" 
          decs="Recommended" 
          featureOne="Stake any Amount" 
          featureTwo="Withdraw in 90 days"
          featureThree="Get 20% interest"
          onClick={() => stakeAE(90)}
        />
        <Plan 
          title="Ultimate" 
          description="180 Days plan" 
          decs="Best value" 
          featureOne="Stake any Amount" 
          featureTwo="Withdraw in 180 days"
          featureThree="Get 30% interest"
          onClick={() => stakeAE(180)}
        />
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default Plans