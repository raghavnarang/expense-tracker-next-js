import type { NextPage } from "next";
import { TiSocialGithub } from "react-icons/ti";
import EntryHead from "../components/global/EntryHead";
import EntrySkeleton from "../components/global/EntrySkeleton";
import PageCard from "../components/global/PageCard";
import { TabsSkeleton } from "../components/global/Tabs";
import Entries from "../components/main/Entries";
import Tabs from "../components/main/Tabs";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const header = <div className={'flex justify-between items-center'}>
  <h1 className={'text-2xl text-gray-700 mb-2'}>Expense Tracker</h1>
  <div className={'flex justify-end'}>
    <a href="https://github.com/raghavnarang/expense-tracker-next-js" target={'_blank'} className={'bg-gray-800 text-xs text-white rounded flex h-6 px-2 items-center mr-2'}>
      <TiSocialGithub color={'text-white'} size={20} className={'mr-1'} /> Frontend
    </a>
    <a href="https://github.com/raghavnarang/expense-tracker" target={'_blank'}  className={'bg-gray-800 text-xs text-white rounded flex h-6 px-2 items-center mr-2'}>
      <TiSocialGithub color={'text-white'} size={20} className={'mr-1'} /> Backend
    </a>
  </div>
</div>;

const footer = <p className={'flex items-center justify-center'}>Made with ❤️ by
  <a href="https://github.com/raghavnarang" target={'_blank'} className={'bg-gray-800 text-xs text-white rounded inline-flex h-6 px-2 items-center ml-2'}>
    <TiSocialGithub color={'text-white'} size={20} /> @raghavnarang
  </a>
</p>

const Group: NextPage = () => {
  const { isLogin, loginId, isLoading } = useFirebaseAuth();

  if (isLoading) {
    return <PageCard head={header} foot={footer}>
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
    return <PageCard small={true} head={header} foot={footer}>
      <p className={'text-md text-gray-700 text-center mb-10'}>Login to continue</p>
      <div id={loginId} />
    </PageCard>
  }

  return <PageCard head={header} foot={footer}>
    <Tabs />
    <Entries />
  </PageCard>;
}

export default Group;