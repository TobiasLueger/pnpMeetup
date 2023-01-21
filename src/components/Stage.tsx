import Image from "next/image";
import stageBgImg from "../images/travelwith-bg.jpg";

const Stage = () => {
  return (
    <div className="w-full h-full relative">
      <Image
        src={stageBgImg}
        alt="bg img"
        width={3636}
        height={3385}
        className="object-cover w-full"
      ></Image>
      <div className="absolute top-72 left-1/2 -translate-x-1/2">
        <h1 className="italic font-bold text-3xl">
          Finde deine Fahrgemeinschaf
        </h1>
      </div>
    </div>
  );
};

export default Stage;
