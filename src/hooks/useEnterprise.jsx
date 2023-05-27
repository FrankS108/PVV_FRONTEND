import { useContext } from "react";
import EnterpriseContext from "../context/EnterpriseProvider";

export const useEnterprise = () => {
    return useContext(EnterpriseContext);
}