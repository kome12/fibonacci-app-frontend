import { SignIn } from "../../components/SignIn";
import { useUserState } from "../../store/user/useUserState";
import { ReactComponent as Niwa } from "./assets/niwa.svg";
import "./home.css";


export const Home = () => {
  const { userData } = useUserState();

  // // Sample code of how to use the useApi hook in a component
  // // If you want to check useApi: src/utils/api/useApi.ts
  // // How to define the apiHelper(getGardens): src/helpers/api/gardens/getGardens.ts
  // const [gardensApi, getGardensData] = useApi(getGardens);
  // const gardens = useMemo(() => gardensApi.response ?? [], [gardensApi]);

  // useEffect(() => {
  //   getGardensData();
  // }, []);

  return (
    <div className="splash-page">
      <div className="ni-wa-container">
        <Niwa className="ni-wa-character" />
        <h1 className="ni-wa">ni•wa</h1>
        <h3 className="ni-wa-definition">a garden or courtyard</h3>
        {!userData && <SignIn />}
      </div>
    </div>
  );
};
