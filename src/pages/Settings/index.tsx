import { formatISO } from "date-fns";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Head } from "../../components/Head";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { Section } from "../../components/Section";
import { SectionTitle } from "../../components/SectionTitle";
import { getCategories } from "../../helpers/api/gardens/getCategories";
import { getGardenByGardenId } from "../../helpers/api/gardens/getGardenByGardenId";
// import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import { CategorySelector } from "./components/CategorySelector";
import { DescriptionInput } from "./components/DescriptionInput";
import { GardenDataWrapper } from "./components/GardenDataWrapper";
import { NameInput } from "./components/NameInput";
import styles from "./Settings.module.css";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       maxWidth: 845,
//     },
//     media: {
//       height: 140,
//     },
//     nameInput: {
//       width: "100%",
//     },
//   })
// );
const descriptionPlaceholder = "Add a Garden Description";
export const MyNiwaSettings = () => {
  // const history = useHistory();
  // const { userData } = useUserState();
  // const classes = useStyles();
  const { gardenId } = useParams<{ gardenId: string }>();

  const [gardenDataApi, getGardenData] = useApi(getGardenByGardenId);
  const [initName, setInitName] = useState<string | undefined>(undefined);
  const [initDesc, setInitDesc] = useState<string | undefined>(undefined);
  const [initCategory, setInitCategory] = useState<string | undefined>(
    undefined
  );

  const garden = useMemo(() => gardenDataApi.response?.garden, [gardenDataApi]);
  const initialGardenName = useMemo(
    () => initName || garden?.name || "",
    [garden?.name, initName]
  );
  const initialGardenDescription = useMemo(
    () => initDesc || garden?.description || descriptionPlaceholder,
    [garden?.description, initDesc]
  );
  const initialGardenCategoryId = useMemo(
    () => initCategory || garden?.gardenCategoryId || "",
    [garden?.gardenCategoryId, initCategory]
  );

  const rules = useMemo(
    () => gardenDataApi.response?.rules ?? [],
    [gardenDataApi]
  );

  // Get Categories
  const [categoriesApi] = useApi(getCategories, { autoCall: true });
  const categoryList = useMemo(
    () => categoriesApi.response ?? [],
    [categoriesApi]
  );

  // Garden Name Input
  const [showNameInput, setShowNameInput] = useState(false);
  const [gardenName, setGardenName] = useState<string | undefined>(undefined);
  const currentGardenName = useMemo(() => {
    return (gardenName !== undefined ? gardenName : initialGardenName) ?? "-";
  }, [gardenName, initialGardenName]);

  // Garden Description Input
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [gardenDescription, setGardenDescription] = useState<
    string | undefined
  >(undefined);
  const currentGardenDescription = useMemo(() => {
    return gardenDescription !== undefined
      ? gardenDescription
      : initialGardenDescription;
  }, [gardenDescription, initialGardenDescription]);

  // Garden Category Input
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [gardenCategoryId, setGardenCategoryId] = useState<string | undefined>(
    undefined
  );
  const currentGardenCategoryId = useMemo(() => {
    return (
      (gardenCategoryId !== undefined
        ? gardenCategoryId
        : initialGardenCategoryId) ?? "-"
    );
  }, [gardenCategoryId, initialGardenCategoryId]);

  const onNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { value } = e.currentTarget;

      setGardenName(value);
    },
    []
  );

  const onDescriptionInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { value } = e.currentTarget;

      setGardenDescription(value);
    },
    []
  );

  const onCategoryInputChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setGardenCategoryId(e.target.value as string);
  };

  const updateGardenData = useMemo(
    () => ({
      name: initialGardenName,
      description:
        initialGardenDescription === descriptionPlaceholder
          ? ""
          : initialGardenDescription,
      fireBaseUserId: garden?.fireBaseUserId ?? "",
      gardenCategoryId: initialGardenCategoryId,
    }),
    [
      garden?.fireBaseUserId,
      initialGardenCategoryId,
      initialGardenDescription,
      initialGardenName,
    ]
  );

  useEffect(() => {
    if (gardenId) {
      const dateISO: string = formatISO(new Date(), {
        representation: "date",
      });
      getGardenData(gardenId, dateISO);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenId]);

  return (
    <>
      <Head title="Settings ⚙️" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <Section>
          <SectionTitle title="Flower Bed Settings" />

          <LoadingWrapper
            isLoading={!gardenDataApi.isLoaded || !categoriesApi.isLoaded}
          >
            <section className={styles.gardenDataInputs}>
              <GardenDataWrapper>
                <NameInput
                  showInput={showNameInput}
                  gardenId={gardenId}
                  updateData={updateGardenData}
                  initialGardenName={initialGardenName}
                  currentGardenName={currentGardenName}
                  onNameInputChange={onNameInputChange}
                  setShowNameInput={setShowNameInput}
                  setGardenName={setGardenName}
                  updateInitVal={setInitName}
                />
              </GardenDataWrapper>

              <GardenDataWrapper>
                <DescriptionInput
                  showInput={showDescriptionInput}
                  gardenId={gardenId}
                  updateData={updateGardenData}
                  initialGardenDescription={initialGardenDescription}
                  currentGardenDescription={currentGardenDescription}
                  onDescriptionInputChange={onDescriptionInputChange}
                  setShowDescriptionInput={setShowDescriptionInput}
                  setGardenDescription={setGardenDescription}
                  updateInitVal={setInitDesc}
                />
              </GardenDataWrapper>

              <GardenDataWrapper>
                <CategorySelector
                  categories={categoryList}
                  showSelector={showCategoryInput}
                  gardenId={gardenId}
                  updateData={updateGardenData}
                  initialGardenCategoryId={initialGardenCategoryId}
                  currentGardenCategoryId={currentGardenCategoryId}
                  onCategoryInputChange={onCategoryInputChange}
                  setShowCategoryInput={setShowCategoryInput}
                  setGardenCategoryId={setGardenCategoryId}
                  updateInitVal={setInitCategory}
                />
              </GardenDataWrapper>
            </section>

            <section>
              <h2>Rules:</h2>
              <ul>
                {rules?.map((rule) => (
                  <li key={rule._id}>
                    {rule.name}
                    <br />
                    {rule.description}
                  </li>
                ))}
              </ul>
            </section>
          </LoadingWrapper>
        </Section>
      </motion.div>
    </>
  );
};
