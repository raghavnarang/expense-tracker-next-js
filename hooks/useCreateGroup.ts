import axios from "axios";
import { useMutation } from "react-query";
import { getApiUrl } from "../utils";
import useAxiosConfig from "./useAxiosConfig";

const useCreateGroup = () => {
    const config = useAxiosConfig();
    
    return useMutation((name: string) => {
        return axios.post(getApiUrl(`group`), { title: name }, config);
    })
};

export default useCreateGroup;