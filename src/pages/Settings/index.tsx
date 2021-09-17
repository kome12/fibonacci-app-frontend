import { createStyles, makeStyles, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
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
import { Rule } from "../../models/rule.model";
import { useApi } from "../../utils/api/useApi";
import { CategorySelector } from "./components/CategorySelector";
import { CreateSeedModal } from "./components/CreateSeedModal";
import { DescriptionInput } from "./components/DescriptionInput";
import { GardenDataWrapper } from "./components/GardenDataWrapper";
import { NameInput } from "./components/NameInput";
import { SeedList } from "./components/SeedList";
import styles from "./Settings.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createGardenSeed: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      alignSelf: "center",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);

const descriptionPlaceholder = "Add a Garden Description";
export const Settings = () => {
  const classes = useStyles();
  const { gardenId } = useParams<{ gardenId: string }>();

  const [gardenDataApi, getGardenData] = useApi(getGardenByGardenId);
  const [initName, setInitName] = useState<string | undefined>(undefined);
  const [initDesc, setInitDesc] = useState<string | undefined>(undefined);
  const [initCategory, setInitCategory] = useState<string | undefined>(
    undefined
  );
  const [initSeeds, setInitSeeds] = useState<Rule[] | undefined>(undefined);

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

  const initialGardenSeeds = useMemo(
    () => initSeeds || rules || [],
    [rules, initSeeds]
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

  // Garden Seeds Input
  const [gardenSeeds, setGardenSeeds] = useState<Rule[] | undefined>(undefined);
  const currentGardenSeeds = useMemo(() => {
    return gardenSeeds !== undefined ? gardenSeeds : initialGardenSeeds;
  }, [gardenSeeds, initialGardenSeeds]);

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

  const onCategoryInputChange = useCallback(
    (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      setGardenCategoryId(e.target.value as string);
    },
    []
  );

  const onSeedInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, seedIndex: number) => {
      const { value, name } = e.currentTarget;

      setGardenSeeds((seeds) => {
        const currentSeeds = [...(seeds ?? initialGardenSeeds)];
        let seed = currentSeeds[seedIndex];
        seed = { ...seed, [name]: value };
        currentSeeds[seedIndex] = seed;

        return currentSeeds;
      });
    },
    [initialGardenSeeds]
  );

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

  const [openCreateSeedModal, setOpenCreateSeedModal] = useState(false);

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

            <section className={styles.seedListSection}>
              <SectionTitle title="Seeds 🌱">
                <IconButton
                  className={classes.createGardenSeed}
                  onClick={() => setOpenCreateSeedModal(true)}
                >
                  <AddIcon />
                </IconButton>
              </SectionTitle>

              <CreateSeedModal
                initSeeds={initialGardenSeeds}
                updateInitSeeds={setInitSeeds}
                handleModal={setOpenCreateSeedModal}
                showModal={openCreateSeedModal}
                gardenId={gardenId}
              />

              <SeedList
                initSeeds={initialGardenSeeds}
                seeds={currentGardenSeeds}
                setGardenSeeds={setGardenSeeds}
                setInitSeeds={setInitSeeds}
                onSeedInputChange={onSeedInputChange}
              />
            </section>
          </LoadingWrapper>
        </Section>
      </motion.div>
    </>
  );
};
