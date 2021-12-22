import type { NextPage } from "next";
import { TiSocialGithub } from "react-icons/ti";
import EntryHead from "../global/EntryHead";
import EntrySkeleton from "../global/EntrySkeleton";
import PageCard from "../global/PageCard";
import { TabsSkeleton } from "../global/Tabs";
import Entries from "./Entries";
import Tabs from "./Tabs";
import { useFirebaseAuthSetup, FirebaseAuthContext } from '../../hooks/useFirebaseAuth';

const header = <div className={'flex justify-between items-center'}>
  <h1 className={'text-2xl text-gray-700 mb-2'}>Expense Tracker</h1>
  <div className={'flex justify-end'}>
    <a href="https://github.com/raghavnarang/expense-tracker-next-js" rel="noreferrer" target={'_blank'} className={'bg-gray-800 text-xs text-white rounded flex h-6 px-2 items-center mr-2'}>
      <TiSocialGithub color={'text-white'} size={20} className={'mr-1'} /> Frontend
    </a>
    <a href="https://github.com/raghavnarang/expense-tracker" rel="noreferrer" target={'_blank'} className={'bg-gray-800 text-xs text-white rounded flex h-6 px-2 items-center mr-2'}>
      <TiSocialGithub color={'text-white'} size={20} className={'mr-1'} /> Backend
    </a>
  </div>
</div>;

const footer = <p className={'flex items-center justify-center'}>Made with ❤️ by
  <a href="https://github.com/raghavnarang" rel="noreferrer" target={'_blank'} className={'bg-gray-800 text-xs text-white rounded inline-flex h-6 px-2 items-center ml-2'}>
    <TiSocialGithub color={'text-white'} size={20} /> @raghavnarang
  </a>
</p>

const MainPage: React.FC = () => {
  const fbAuth = useFirebaseAuthSetup();
  const { isLogin, loginId, isLoading } = fbAuth;

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
    <FirebaseAuthContext.Provider value={fbAuth}>
      <Tabs />
      <Entries />
    </FirebaseAuthContext.Provider>
  </PageCard>;
}

export default MainPage;