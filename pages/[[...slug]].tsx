import type { NextPage } from "next";
import EntryHead from "../components/global/EntryHead";
import EntrySkeleton from "../components/global/EntrySkeleton";
import PageCard from "../components/global/PageCard";
import { TabsSkeleton } from "../components/global/Tabs";
import Entries from "../components/main/Entries";
import Tabs from "../components/main/Tabs";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const Group: NextPage = () => {
  const { isLogin, loginId, isLoading } = useFirebaseAuth();

  if (isLoading) {
    return <PageCard>
      <TabsSkeleton tabs={3} />
      <div className={"h-5/6 overflow-y-auto"}>
        <EntryHead />
        {Array.from(Array(5).keys()).map(key =>
          <EntrySkeleton key={key} />
        )}
      </div>
    </PageCard>;
  }

  if (!isLogin) {
    return <PageCard small={true}>
      <div className={'text-center'}>
        <h1 className={'text-2xl text-gray-700 mb-2'}>Expense Tracker</h1>
        <p className={'text-sm text-gray-700 mb-10'}>Login to continue</p>
      </div>
      <div id={loginId} />
    </PageCard>
  }

  return <PageCard>
    <Tabs />
    <Entries />
  </PageCard>;
}

export default Group;