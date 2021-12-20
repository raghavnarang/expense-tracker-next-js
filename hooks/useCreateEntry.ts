import axios from "axios";
import { useMutation } from "react-query";
import { EntryInput } from "../types/entry";
import { getApiUrl } from "../utils";
import useAxiosConfig from "./useAxiosConfig";

const useCreateEntry = () => {
    const config = useAxiosConfig();

    return useMutation((entry: EntryInput) => {
        return axios.post(getApiUrl(`entry`), entry, config);
    })
};

export default useCreateEntry;