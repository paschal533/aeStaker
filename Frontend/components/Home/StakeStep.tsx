import Image from "next/image";
import One from "../../assets/1.png";
import Two from "../../assets/2.png";
import Bag from "../../assets/bag.png";
import Basket from "../../assets/Basket.png";

const StakeStep = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center sm:pl-4 sm:pr-4 pl-[200px] pr-[200px]">
      <div className="flex sm:flex-col sm:justify-center justify-between w-full">
        <div>
          <Image src={One} width={100} height={100} alt="1" />
          <h1 className="font-bold text-3xl sm:text-lg">Choose a plan</h1>
          <p className="mt-2 w-[250px] sm:w-full  text-2xl">
            You have the sole right to choose from variety of plans the one that
            suits you best.
          </p>
        </div>
        <div>
          <Image src={Basket} width={300} height={300} alt="Bag" />
        </div>
      </div>
      <div className="flex sm:hidden mt-8 justify-between w-full">
        <div>
          <Image src={Bag} width={300} height={300} alt="Bag" />
        </div>
        <div>
          <Image src={Two} width={100} height={100} alt="1" />
          <h1 className="font-bold text-3xl">Stake</h1>
          <p className="mt-2 w-[250px] text-2xl">
            Stake AE tokens, and earn massive rewards{" "}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex-col sm:flex mt-8 w-full">
        <div>
          <Image src={Two} width={100} height={100} alt="1" />
          <h1 className="font-bold text-3xl">Stake</h1>
          <p className="mt-2 w-[250px] text-2xl">
            Stake AE tokens, and earn massive rewards{" "}
          </p>
        </div>
        <div>
          <Image src={Bag} width={300} height={300} alt="Bag" />
        </div>
      </div>
    </div>
  );
};

export default StakeStep;
