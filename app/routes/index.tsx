import Navigation from "~/components/Navigation";
import hero from "../images/dice_hero.png";
import { useState } from "react";
import logo from "../images/d20.png";

export default function Index() {

  const [randomeNumber, setRandomeNumber] = useState("1");

  const rollDice = () => {
    setRandomeNumber(`${Math.floor(Math.random() * (20 - 1 + 1) + 1)}`)
  }

  return (
    <div style={{ fontFamily: "Roboto, sans-serif", lineHeight: "1.4" }} className="text-[#eee6e1]">
      
      <h1 className="text-7xl lg:text-8xl uppercase font-black mt-12 lg:mt-24 mb-12 ">PNP <span className="text-[#cbe458]">Meet</span>up</h1>
      <ul className="text-xl flex flex-col lg:flex-row gap-5"><li>Build your own world </li><li> Build your character </li><li> Play the best pnp round you ever will</li></ul>
      <a href="/pnp" className="p-5 uppercase rounded-md font-black text-[#cbe458] border-[#cbe458] border-2 transition-all block w-fit mt-12 hover:bg-[#cbe458] hover:text-[#0a0a0a]">Start Building</a>
      <div className="w-full flex flex-col lg:flex-row lg:items-center">
        <img src={hero} className='w-screen lg:w-full -ml-5 lg:-ml-40 mt-20'/>
        <div className="w-full uppercase font-black text-2xl flex flex-col gap-4 mt-10 lg:mt-0">
          <span className="text-center lg:text-left">
            Throw all your 
            <span className="text-[#cbe458] underline cursor-pointer ml-2" onClick={rollDice}>dice</span>
          </span>
          <div className="text-3xl relative" onClick={rollDice}><img src={logo} className={`rotate-12 w-1/2 lg:w-full mx-auto lg:mx-0`}/><span className="absolute text-[#0a0a0a] block top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" style={{fontFamily: "Jua"}}>{randomeNumber}</span></div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-4xl lg:text-6xl uppercase font-black mb-12">Generate your own <span className="text-[#cbe458]">Characters</span></h2>
        <p className="text-xl">You and your players can generate characters and select them in your pnp world.</p>
        <p className="text-xl">Use pre configured templates for DnD, Midgard or HTBAH sheets.</p>
      </div>
    </div>
  );
}
