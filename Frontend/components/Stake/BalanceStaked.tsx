import Steps from "./Steps";
import { useContext } from "react";
import { StakerContext } from "../../context/StakerContext";
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const BalanceStaked = () => {
    const { balance } = useContext(StakerContext);
    return (
        <div className="flex w-full sm:flex-col justify-between items-center sm:p-4 pr-10 pl-10 pt-4 pb-4">
            <Steps icon={<MdOutlineAccountBalanceWallet />} title="Wallet Balance" description={`your wallet balance is ${Math.floor(balance)} AE` } />
            <br />
            <Steps icon={<MdOutlineAccountBalanceWallet />} title="Staked Balance" description="your staked balance is 0" />
            <br />
            <Steps icon={<MdOutlineAccountBalanceWallet />} title="Profit Balance" description="your profile balance is 0" />
        </div>
    )
}

export default BalanceStaked;