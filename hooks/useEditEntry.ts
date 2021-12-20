import axios from "axios";
import { useMutation } from "react-query";
import { EditEntryInput } from "../types/entry";
import { getApiUrl } from "../utils";
import useAxiosConfig from "./useAxiosConfig";

const useEditEntry = () => {
    const config = useAxiosConfig();
    
    return useMutation((entry: EditEntryInput) => {
        return axios.put(getApiUrl(`entry/${entry.id}`), entry, config)
    })
};

export default useEditEntry;