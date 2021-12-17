import { useRouter } from "next/router";
import { useEffect } from "react";
import useCreateGroup from "../../hooks/useCreateGroup";
import useFetchGroups from "../../hooks/useFetchGroups";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useToast from "../../hooks/useToast";
import TabsComponent, { TabsSkeleton } from "../global/Tabs";
import GroupSettings from "./GroupSettings";

const Tabs: React.FC = () => {
    const { isLoading, isError, data: groups, currentGroupSlug, refetch } = useFetchGroups();
    const createGroup = useCreateGroup();
    const showToast = useToast();
    const router = useRouter();

    const { auth } = useFirebaseAuth();

    useEffect(() => {
        if (isError) {
            showToast('Unable to fetch Expenses');
        }
    }, [isError]);

    useEffect(() => {
        if (createGroup.isSuccess) {
            showToast('Group Added successfully');
            refetch();
        }
    }, [createGroup.isSuccess]);

    const groupTabs: { [key: string]: string } = {};
    if (groups) {
        for (const tab of groups) {
            groupTabs[tab.groupSlug] = tab.title;
        }
    }

    const onTabAdd = (name: string) => {
        createGroup.mutate(name);
    }

    const onTabClick = (slug: string) => {
        !!slug && router.push(`/${slug}`);
    }

    return isLoading ? <TabsSkeleton /> :
        <TabsComponent onTabAdd={onTabAdd} onTabClick={onTabClick} tabs={groupTabs} currentTab={currentGroupSlug}>
            <GroupSettings />
            <button
                onClick={() => auth.signOut()}
                className={'py-1 px-3 text-sm rounded cursor-pointer border border-gray-300 inline-flex items-center justify-center hover:shadow-md hover:border-gray-500 transition-all duration-300'}
            >
                Signout
            </button>
        </TabsComponent>
}

export default Tabs;