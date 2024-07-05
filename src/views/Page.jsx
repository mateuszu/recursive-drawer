import PageComponent from "../components/Page";
import { useParams } from "react-router-dom";

const Page = ({ label }) => {
  const { name, id, categoryName } = useParams();
  return (
    <PageComponent
      heading={decodeURIComponent(categoryName)}
      subheading={label}
    />
  );
};

export default Page;
