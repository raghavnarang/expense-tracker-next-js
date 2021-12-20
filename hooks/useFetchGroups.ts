import axios, { AxiosRequestConfig } from "axios";
import { getApiUrl } from "../utils";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import Group from '../types/group';
import useAxiosConfig from "./useAxiosConfig";

const fetchGroups = (config: AxiosRequestConfig) => async () => {
  const data = await axios.get<Group[]>(getApiUrl("group/list"), config);
  return data.data;
};

const useFetchGroups = () => {
  const config = useAxiosConfig();

  const query = useQuery(["group-list"], fetchGroups(config), { refetchOnMount: false, enabled: !!config.headers['X-ID-Token'] });

  /** Using this fake loading to wait for the Firebase ID Token fetching in progress */
  const finalQuery = !!config.headers['X-ID-Token'] ? query : {
    ...query,
    isError: false,
    isIdle: false,
    isLoading: true,
    isSuccess: false,
    status: 'loading'
  }

  const groups = finalQuery.data;

  const router = useRouter();
  const routerSlug = Array.isArray(router.query.slug) && router.query.slug.length > 0 ? router.query.slug[0] : undefined;

  let currentGroup: Group | undefined;
  if (!!groups && groups.length > 0) {
    currentGroup = groups.find(group => group.groupSlug === routerSlug);

    if (!currentGroup) {
      currentGroup = groups[0];
    }
  }

  return { ...finalQuery, currentGroupId: currentGroup?.id, currentGroupSlug: currentGroup?.groupSlug };
};

export default useFetchGroups;
