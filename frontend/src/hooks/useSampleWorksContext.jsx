import { SampleWorksContext  } from "../context/SampleWorksContext"
import { useContext } from "react"

export const useSampleWorksContext  = () => {
  const context = useContext(SampleWorksContext)

  if(!context) {
    throw Error('useSampleWorksContext  must be used inside a WorkoutsContextProvider')
  }

  return context

}