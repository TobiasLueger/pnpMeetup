import dnd from "../../images/categories/dnd.webp";
import pathfinder from "../../images/categories/pathfinder.jpeg";
import htbah from "../../images/categories/htbah.webp";
import midgard from "../../images/categories/midgard.jpeg";

export default function CharacterSheet() {
  const sheetArray = [
    {
      name: "dnd",
      link: "/character-sheet/dnd",
      img: dnd
    },
    {
      name: "htbah",
      link: "/character-sheet/htbah",
      img: htbah,
      out: true
    },
    {
      name: "pathfinder",
      link: "/character-sheet/#",
      img: pathfinder,
      out: true
    },
    {
      name: "midgard",
      link: "/character-sheet/#",
      img: midgard,
      out: true
    },
    // {
    //   name: "Cthulhu",
    //   link: "/character-sheet/#",
    //   img: "",
    //   out: true
    // },
  ]
  return (
    <div>
      <h1>Build Player <span className="text-[#cbe458]">Character Sheet</span></h1>
      <div className="flex flex-wrap gap-10">
      { sheetArray && sheetArray.map((sheet, index) => {
        if (sheet.out) {
          return (
            <div key={index} className={`flex flex-col p-5 rounded-2xl border-2 border-[#cbe458] w-fit aspect-square max-w-sm group ${sheet.out ? "grayscale cursor-not-allowed": ""}`}>
              <img src={sheet.img} className="rounded-2xl border-2 border-[#cbe458] object-cover group-hover:scale-105 transition-all"/>
              <div className="mx-0 my-auto">
                <p className="text-3xl group-hover:text-4xl uppercase text-center h-auto transition-all">{sheet.name}</p>
              </div>
            </div>
          )
        } else {
          return (
            <a href={sheet.link} key={index}>
              <div className={`flex flex-col p-5 rounded-2xl border-2 border-[#cbe458] w-fit aspect-square max-w-sm group ${sheet.out ? "grayscale cursor-not-allowed": ""}`}>
                <img src={sheet.img} className="rounded-2xl border-2 border-[#cbe458] object-cover group-hover:scale-105 transition-all"/>
                <div className="mx-0 my-auto">
                  <p className="text-3xl group-hover:text-4xl uppercase text-center h-auto transition-all">{sheet.name}</p>
                </div>
              </div>
            </a>
            
          )
        }
      })}
      </div>
    </div>
  );
}
