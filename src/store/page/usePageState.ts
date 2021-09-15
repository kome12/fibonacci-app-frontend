import { useRecoilState } from "recoil";
import { pageState } from "./PageStateAtoms";

export const usePageState = () => {
  const [currentPage, setCurrentPage] = useRecoilState(pageState);

  return { currentPage, setCurrentPage } as const;
};
