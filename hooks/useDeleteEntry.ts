import axios from "axios";
import { useMutation } from "react-query";
import { getApiUrl } from "../utils";
import useAxiosConfig from "./useAxiosConfig";

const useDeleteEntry = () => {
    const config = useAxiosConfig();
    
    return useMutation((id: number) => {
        return axios.delete(getApiUrl(`entry/${id}`), config)
    })
};

export default useDeleteEntry;