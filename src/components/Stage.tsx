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
      <div className="absolute top-0">
        <h1>TravelWith - Finde deine Fahrgemeinschaf</h1>
        <p>
          TravelWith ist die Plattform, auf der du einfach und schnell Leute
          findest, mit denen du gemeinsam verreisen kannst. Spare Geld und
          genieße die Gesellschaft, während du dein Ziel erreichst. Melde dich
          jetzt an und finde deine nächste Fahrgemeinschaft!
        </p>
        <a className="btn">Jetzt anmelden</a>
      </div>
    </div>
  );
};

export default Stage;
