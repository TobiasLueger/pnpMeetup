import Image from "next/image";
import stageBgImg from "../../public/travelwith-bg.jpg";

const Header = () => {
  return (
    <div className="w-full fixed top-5 z-50 flex justify-end">
      <a
        href="#"
        className="bg-[#eab148] w-fit rounded-full w-10 h-10 flex justify-center items-center text-white font-bold mr-10"
      >
        TL
      </a>
    </div>
  );
};

export default Header;
