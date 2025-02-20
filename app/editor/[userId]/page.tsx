import HandlerHeader from "@/components/handler-header";
import { BodyClient } from "./body-client";
import { SidebarClient } from "./sidebar-client";
import { stackServerApp } from "@/stack";
import { getData, addNewData } from "@/app/utils/postgre";
import { defaultCode } from "@/app/utils/constants";

export default async function EditorUser() {

  const user = await stackServerApp.getUser();
  if (!user) return null;

  let data = await getData(user.id);
  // create new data
  if (!data) {
    data = { id: user.id, code: defaultCode };
    await addNewData(data);
  }

  return (
    <>
      <HandlerHeader />
      <div className="flex-1 flex w-full overflow-hidden">
        {/* sidebar */}
        <SidebarClient />

        {/* body */}
        <BodyClient data={data} />
      </div>
    </>
  )
}
