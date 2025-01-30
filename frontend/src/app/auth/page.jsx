import { getSession } from "@/lib/getSession";
import Auth from "../../components/auth/Auth";
import { redirect } from "next/navigation";
const page = async ({ searchParams }) => {
  const params = await searchParams;
  const formType = params.type || "login";
  const session = await getSession();
  console.log(session);
  if (session.user) {
    redirect("/notes");
  }
  return (
    <>
      <Auth type={formType} />
    </>
  );
};

export default page;
