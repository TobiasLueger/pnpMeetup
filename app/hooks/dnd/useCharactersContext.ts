import { useContext } from "react";
import { CharactersContext } from "~/contexts/dnd/CharactersContext";

export const useCharactersContext = () => useContext(CharactersContext);


