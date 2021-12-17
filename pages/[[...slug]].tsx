import type { NextPage } from "next";
import PageCard from "../components/global/PageCard";
import Entries from "../components/main/Entries";
import Tabs from "../components/main/Tabs";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const Group: NextPage = () => {
  const { isLogin, loginId } = useFirebaseAuth();

  if (!isLogin) {
    return <PageCard>
      <div id={loginId} />
    </PageCard>
  }

  return <PageCard>
    <Tabs />
    <Entries />
  </PageCard>;
}

export default Group;