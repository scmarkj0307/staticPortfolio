import { PersonalInfoContext } from "../context/PersonalInfoContext";
import { useContext } from "react";

export const usePersonalInfoContext = () => {
  const context = useContext(PersonalInfoContext);

  if (!context) {
    throw Error('usePersonalInfoContext must be used inside a PersonalInfoContextProvider');
  }

  return context;
};
