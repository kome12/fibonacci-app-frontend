import { SignIn } from "../../components/SignIn";
import { useUserState } from "../../store/user/useUserState";

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
    <div>
      <h2>Home</h2>
      {!userData && <SignIn />}
    </div>
  );
};
