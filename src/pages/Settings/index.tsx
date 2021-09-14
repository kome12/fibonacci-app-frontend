import { formatISO } from "date-fns";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Head } from "../../components/Head";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { Section } from "../../components/Section";
import { SectionTitle } from "../../components/SectionTitle";
import { getGardenByGardenId } from "../../helpers/api/gardens/getGardenByGardenId";
// import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
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

export const MyNiwaSettings = () => {
  // const history = useHistory();
  // const { userData } = useUserState();
  // const classes = useStyles();
  const { gardenId } = useParams<{ gardenId: string }>();

  const [gardenDataApi, getGardenData] = useApi(getGardenByGardenId);

  const garden = useMemo(() => gardenDataApi.response?.garden, [gardenDataApi]);
  const initialGardenName = garden?.name ?? "";
  const initialGardenDescription = garden?.description ?? "";

  const rules = useMemo(
    () => gardenDataApi.response?.rules ?? [],
    [gardenDataApi]
  );

  // Garden Name Input
  const [showNameInput, setShowNameInput] = useState(false);
  const [gardenName, setGardenName] = useState<string | undefined>(undefined);
  const currentGardenName = useMemo(() => {
    return (gardenName !== undefined ? gardenName : garden?.name) ?? "-";
  }, [gardenName, garden?.name]);

  // Garden Description Input
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [gardenDescription, setGardenDescription] = useState<
    string | undefined
  >(undefined);
  const currentGardenDescription = useMemo(() => {
    return (
      (gardenDescription !== undefined
        ? gardenDescription
        : garden?.description) ?? "-"
    );
  }, [gardenDescription, garden?.description]);

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
          <SectionTitle title="My Niwa Settings" />

          <LoadingWrapper isLoading={!gardenDataApi.isLoaded}>
            <section className={styles.gardenDataInputs}>
              <GardenDataWrapper
                showInput={showNameInput}
                currentData={currentGardenName}
                editData={() => setShowNameInput(true)}
              >
                <NameInput
                  garden={garden ? { ...garden, _id: gardenId } : undefined}
                  initialGardenName={initialGardenName}
                  currentGardenName={currentGardenName}
                  onNameInputChange={onNameInputChange}
                  setShowNameInput={setShowNameInput}
                  setGardenName={setGardenName}
                />
              </GardenDataWrapper>

              <GardenDataWrapper
                showInput={showDescriptionInput}
                currentData={currentGardenDescription}
                editData={() => setShowDescriptionInput(true)}
              >
                <DescriptionInput
                  garden={garden ? { ...garden, _id: gardenId } : undefined}
                  initialGardenDescription={initialGardenDescription}
                  currentGardenDescription={currentGardenDescription}
                  onDescriptionInputChange={onDescriptionInputChange}
                  setShowDescriptionInput={setShowDescriptionInput}
                  setGardenDescription={setGardenDescription}
                />
              </GardenDataWrapper>
            </section>

            <section>
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
