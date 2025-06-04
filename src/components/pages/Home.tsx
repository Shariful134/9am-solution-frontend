import { getSubdomain } from "../../utils/getSubDomain";

const Home = () => {
  const subdomain = getSubdomain();
  console.log("subdomain:", subdomain);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-xl">This is Home page</h1>
      </div>
    </div>
  );
};

export default Home;
