import { useContext } from "react";
import ApiContext from "../context/ApiProvider";

export const useAPI = () => {
    return useContext(ApiContext);
}