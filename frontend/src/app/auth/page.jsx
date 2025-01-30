import Auth from "../../components/auth/Auth";
const page = async ({ searchParams }) => {
  const params = await searchParams;
  const formType = params.type || "login";
  return (
    <>
      <Auth type={formType} />
    </>
  );
};

export default page;
