import Image from "next/image";
import One from "../../assets/1.png";
import Two from "../../assets/2.png";
import Three from "../../assets/3.png";

const BorrowStep = () => {
  return (
    <div className="flex justify-between sm:justify-center sm:items-center text-center sm:flex-col pl-20 pr-20 sm:pl-4 sm:pr-4">
      <div className="">
        <Image src={One} width={100} height={100} alt="1" />
        <h1 className="font-bold text-3xl sm:text-lg">Variety</h1>
        <p className="mt-2 w-[250px] sm:w-full  text-2xl">
          You have the sole right to choose from variety of plans the one that
          suits you best.
        </p>
      </div>
      <div className="sm:mt-8 mt-0">
        <Image src={Two} width={100} height={100} alt="2" />
        <h1 className="font-bold text-3xl sm:text-lg">Collateral</h1>
        <p className="mt-2 w-[250px] sm:w-full  text-2xl">
          Use NFT as collateral, NFT must worth more than the amount to be
          borrowed.{" "}
        </p>
      </div>
      <div className="sm:mt-8 mt-0">
        <Image src={Three} width={100} height={100} alt="3" />
        <h1 className="font-bold text-3xl sm:text-lg">Borrow</h1>
        <p className="mt-2 w-[250px] sm:w-full  text-2xl">
          Borrow AE coin and pay back according to your plan.
        </p>
      </div>
    </div>
  );
};

export default BorrowStep;
