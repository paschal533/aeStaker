const Banner = ({ text }: any) => {
  return (
    <div className="w-full justify-center mt-20 items-center text-center h-20">
      <h1 className="font-bold text-[#564d4d]  w-full text-center text-2xl">
        {text}
      </h1>
    </div>
  );
};

export default Banner;
