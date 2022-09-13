import { useEffect, useState, createContext } from "react";
import { AeSdk, Node, AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk'
import { iniSDK } from '../utils/aeternity.ts';
import { ContractAci } from "./constants";
import { useToast } from "@chakra-ui/react";

export const StakerContext = createContext();

export const StakerProvider = ({ children }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [stakeValue, setStakeValue] = useState(null);
  const [account, setAccount] = useState(null);
  const [assets, setAssets] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const init = async () => {
    try {
      const node = new Node('https://testnet.aeternity.io') // ideally host your own node 

      const aeSdk = new AeSdk({
        nodes: [
          { name: 'testnet', instance: node }
        ]
      })

      const aci = ContractAci // ACI of the contract
      const contractAddress = "ct_SjV3mnz56BkpJdCQZfp1giwjNaHVqEt9EiKfBFbqBcbmdJyaC" // the address of the contract
      const contractInstance = await aeSdk.getContractInstance({ aci, contractAddress })
      setContract(contractInstance.methods)
      
      if(address && contract){
        const { decodedResult } = await contractInstance.methods.getPositionIdForAddress(address, { onAccount : account })
        getAssets(decodedResult)
      }
    }catch(error){
      console.log(error)
    }
  }

	const fetchAccount = async () => {
    try {
      const aeSdk = await iniSDK();

      const _address = await aeSdk.address();
      setAccount(aeSdk);
      setAddress(_address);

      const _balance = await aeSdk.getBalance(_address, {
        format: AE_AMOUNT_FORMATS.AE
      })

      setBalance(_balance);
      toast({
        position: "top-left",
        title: "Wallet connect",
        description: "Wallet connected successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

    }catch(error){
      console.log(error)
      toast({
        position: "top-left",
        title: "Not Connected",
        description: "No SuperHero wallet found",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
	}

  useEffect(() => {
    fetchAccount();
    init()
  }, [address])

  const stakeAE = async (stakingLength) => {
    if(!stakeValue && !account) return;
    try{
      setLoading(true)
      await contract.stakeAE(stakingLength, { onAccount: account, amount: stakeValue })
      setStakeValue(null)
      setLoading(false)
      toast({
        position: "top-left",
        title: "Stake AE Tokens",
        description: `${stakeValue} AE has been staked successfully `,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }catch(error){
      console.log(error);
      toast({
        position: "top-left",
        title: "Stake AE ERROR",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const calcDaysRemaining = (unlockDate) => {
    const timeNow = Date.now()
    const secondsRemaining = unlockDate - timeNow
    return Math.max( ((secondsRemaining / 60 /60 /60 / 24) * 30).toFixed(0), 0)
  }

  const getAssets = async (ids) => {
    try {
       const assets = [];

       for(let i = 0; i < ids.length; i++) {
         const { decodedResult } = await contract.getPositionById(i, { onAccount: account })
         const parsedAsset = {
          positionId: Number(decodedResult.positionId),
          percentInterest: Number(decodedResult.percentInterest) / 100,
          daysRemaining: calcDaysRemaining( Number(decodedResult.unlockDate) ),
          aeInterest: Number(decodedResult.aeInterest) / 10000,
          aeStaked: decodedResult.aeStaked,
          open: decodedResult.open,
        }
         assets.push(parsedAsset)
       }
       setAssets(assets)
       console.log(assets)
    }catch(error) {
      console.log(error)
    }
  }

  const withdraw = async positionId => {
    try{
      await contract.closePosition(positionId, { onAccount: account })
      toast({
        position: "top-left",
        title: "Token Withdraw",
        description: `Your AE has been withdrawn successfully `,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }catch(error){
      console.log(error)
      toast({
        position: "top-left",
        title: "Token Withdraw",
        description: `Something happened.. Can't withdraw tokens `,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <StakerContext.Provider
      value={{
        address,
        balance,
        sdkReady,
        fetchAccount,
        setStakeValue,
        stakeAE,
        assets,
        loading,
        withdraw
      }}
    >
      {children}
    </StakerContext.Provider>
  )
}
