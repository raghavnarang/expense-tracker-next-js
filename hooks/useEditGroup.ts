import axios from "axios";
import { useMutation } from "react-query";
import { getApiUrl } from "../utils";
import useAxiosConfig from "./useAxiosConfig";

type GroupEditArgs = {
    id: number,
    title: string
}

const useEditGroup = () => {
    const config = useAxiosConfig();
    
    return useMutation((group: GroupEditArgs) => {
        return axios.put(getApiUrl(`group/${group.id}`), { title: group.title }, config)
    })
};

export default useEditGroup;