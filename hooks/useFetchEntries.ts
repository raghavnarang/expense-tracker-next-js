import { QueryFunction, useQuery, UseQueryResult } from "react-query";
import axios, { AxiosRequestConfig } from 'axios';

import { getApiUrl } from "../utils";
import Entry from "../types/entry";
import useAxiosConfig from "./useAxiosConfig";

const fetchEntries = (config: AxiosRequestConfig): QueryFunction<Entry[]> => async ({ queryKey }) => {
    const [_key, groupId, offset = 0, limit = 10] = queryKey;
    if (!groupId) {
        throw new Error('Invalid Group ID');
    }

    const url = getApiUrl(`entry/list?groupId=${groupId}&offset=${offset}&limit=${limit}`);
    const data = await axios.get<Entry[]>(url, config);
    return data.data;
}

const useFetchEntries = (groupId?: number, offset: number = 0, limit: number = 10) => {
    const config = useAxiosConfig();

    const queryResult = useQuery<Entry[]>(['group-entries', groupId, offset, limit], fetchEntries(config), { enabled: !!groupId && !!config.headers['X-ID-Token'] });

    /** Using this fake loading to wait for the Firebase ID Token fetching in progress */
    const dummyResult = {
        ...queryResult,
        isError: false,
        isIdle: false,
        isLoading: true,
        isSuccess: false,
        status: 'loading'
    }

    return !!config.headers['X-ID-Token'] ? queryResult : dummyResult;
};

export default useFetchEntries;