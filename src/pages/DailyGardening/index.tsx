import { Card, Grid, Theme, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { createStyles, makeStyles } from "@material-ui/styles";
import { ApexOptions } from "apexcharts";
import * as d3 from "d3";
import {
  addDays,
  differenceInCalendarISOWeeks,
  formatISO,
  getDay,
  isBefore,
  isSameDay,
  startOfWeek,
  sub,
} from "date-fns";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { Bar, Line } from "react-chartjs-2";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
// TODO: Revisit when delete api is implemented
// import { deleteCompletedTask } from "../../helpers/api/completedTasks/deleteCompletedTask";
import {
  CompletedTaskToSend,
  sendCompletedTask,
} from "../../helpers/api/completedTasks/sendCompletedTask";
import { getGardenByGardenId } from "../../helpers/api/gardens/getGardenByGardenId";
import { getGardenByGardenIdWithDates } from "../../helpers/api/gardens/getGardenByGardenIdWithDates";
import { CompletedTask } from "../../models/completedTask.model";
import { Rule } from "../../models/rule.model";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import wateringAnimation from "./assets/watering.gif";
import styles from "./DailyGardening.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskDescription: {
      width: "100%",
    },
    ruleButton: {
      margin: "2%",
    },
    returnButton: {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.default,
      marginTop: "5%",
    },
  })
);

interface GardenProgressProps {
  gardenId: string;
}

const useD3 = (renderChartFn, dependencies) => {
  const ref = useRef(null);

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
};

const GardenProgress: React.FC<GardenProgressProps> = ({ gardenId }) => {
  const startDate = sub(new Date(), { weeks: 4 });
  const endDate = new Date();

  const options = {
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const [gardenProgressDataApi, getGardenProgressData] = useApi(
    getGardenByGardenIdWithDates
  );

  const gardenProgress = useMemo(
    () => gardenProgressDataApi.response?.garden,
    [gardenProgressDataApi]
  );

  const rules = useMemo(
    () => gardenProgressDataApi.response?.rules ?? [],
    [gardenProgressDataApi]
  );

  const completedTasks = useMemo(() => {
    const currentCompletedTasks =
      gardenProgressDataApi.response?.completedTasks ?? [];
    return currentCompletedTasks;
  }, [gardenProgressDataApi]);

  const data = useMemo(() => {
    const labels: Array<string> = [];
    const data: Array<number> = [];
    let date = startDate;
    while (isBefore(date, endDate) || isSameDay(date, endDate)) {
      labels.push(
        formatISO(date, {
          representation: "date",
        })
      );

      const completedTasksPerDay: Array<CompletedTask> = completedTasks.filter(
        // eslint-disable-next-line no-loop-func
        (completedTask: CompletedTask) =>
          isSameDay(new Date(completedTask.date), date)
      );
      data.push(completedTasksPerDay.length);
      date = addDays(date, 1);
    }

    const chartJsData = {
      labels,
      datasets: [
        {
          label: "# of Tasks Completed",
          data: data,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };
    return chartJsData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenProgressDataApi]);

  const tableHeader = useMemo(() => {
    const labels: Array<string> = [];
    let date = startDate;
    while (isBefore(date, endDate) || isSameDay(date, endDate)) {
      labels.push(
        formatISO(date, {
          representation: "date",
        })
      );
      date = addDays(date, 1);
    }
    return labels;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenProgressDataApi]);

  const dataRows = useMemo(() => {
    // const dataRows: Array<any> = [];
    const completedTasksByRuleId: { [ruleId: string]: Array<CompletedTask> } =
      rules.reduce((ruleMapping: {}, rule: Rule) => {
        const completedTasksPerRule: Array<CompletedTask> =
          completedTasks.filter(
            (completedTask: CompletedTask) => completedTask.ruleId === rule._id
          );
        ruleMapping[rule._id || "emptyRuleId"] = completedTasksPerRule;
        return ruleMapping;
      }, {});

    console.log({ completedTasksByRuleId });

    const dataRows = rules.map((rule: Rule) => {
      const row: {
        ruleId: string;
        ruleName: string;
      } = {
        ruleId: rule._id || "emptyRuleId",
        ruleName: rule.name,
      };

      let date = startDate;
      const dates: { [date: string]: boolean } = {};
      while (isBefore(date, endDate) || isSameDay(date, endDate)) {
        const dateISO = formatISO(date, {
          representation: "date",
        });
        dates[dateISO] = completedTasksByRuleId[rule._id || "emptyRuleId"].some(
          // eslint-disable-next-line no-loop-func
          (completedTask: CompletedTask) =>
            isSameDay(new Date(completedTask.date), date)
        );

        date = addDays(date, 1);
      }

      return Object.assign(dates, row);
    });

    return dataRows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenProgressDataApi]);

  const heatMapOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
    xaxis: {
      type: "category",
      categories: ["", "", "", ""],
    },
  };

  const series = useMemo(() => {
    const data: Array<{
      name: string;
      data: Array<number>;
    }> = [
      {
        name: "Saturday",
        data: [],
      },
      {
        name: "Friday",
        data: [],
      },
      {
        name: "Thursday",
        data: [],
      },
      {
        name: "Wednesday",
        data: [],
      },
      {
        name: "Tuesday",
        data: [],
      },
      {
        name: "Monday",
        data: [],
      },
      {
        name: "Sunday",
        data: [],
      },
    ];
    let date: Date = startOfWeek(startDate);
    while (isBefore(date, endDate) || isSameDay(date, endDate)) {
      const completedTasksPerDay: Array<CompletedTask> = completedTasks.filter(
        // eslint-disable-next-line no-loop-func
        (completedTask: CompletedTask) =>
          isSameDay(new Date(completedTask.date), date)
      );
      data[6 - getDay(date)].data.push(completedTasksPerDay.length);
      date = addDays(date, 1);
    }
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenProgressDataApi]);

  // const svgHeatMap = useRef(null);

  // const drawChart = useMemo(() => {
  //   const data = [12, 5, 6, 6, 9, 10];

  //   d3.select(svgHeatMap).append("svg").attr("width", 700).attr("height", 300);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [gardenProgressDataApi]);

  const ref = useD3(
    (svg) => {
      // const data = [12, 5, 6, 6, 9, 10];
      const margin = { top: 30, right: 30, bottom: 30, left: 30 },
        width = 450 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      svg
        .select(".heatMap")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const vars = ["6", "5", "4", "3", "2", "1", "0"];
      const groups = ["-5", "-4", "-3", "-2", "-1", "0"];
      // var groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      // var vars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"];
      const data: {
        group: string;
        variable: string;
        value: string;
      }[] = [];

      let date: Date = startOfWeek(startDate);
      while (isBefore(date, endDate) || isSameDay(date, endDate)) {
        const completedTasksPerDay: Array<CompletedTask> =
          completedTasks.filter(
            // eslint-disable-next-line no-loop-func
            (completedTask: CompletedTask) =>
              isSameDay(new Date(completedTask.date), date)
          );
        data.push({
          variable: getDay(date).toString(),
          group: differenceInCalendarISOWeeks(date, endDate).toString(),
          value: completedTasksPerDay.length.toString(),
        });
        // data[6 - getDay(date)].data.push(completedTasksPerDay.length);
        date = addDays(date, 1);
      }
      console.log("test data:", data);

      const x = d3.scaleBand().range([0, width]).domain(groups).padding(0.01);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Build X scales and axis:
      const y = d3.scaleBand().range([height, 0]).domain(vars).padding(0.01);
      svg.append("g").call(d3.axisLeft(y));

      // Build color scale
      const colors = d3
        // .scaleSequential()
        // .interpolator(d3.interpolateInferno)
        // .domain([1, 100]);
        .scaleLinear()
        // .range(["white", "#69b3a2"])
        .range([800, 1])
        .domain([0, 100]);

      svg
        .selectAll()
        .data(data, function (d) {
          return d.group + ":" + d.variable;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.group);
        })
        .attr("y", function (d) {
          return y(d.variable);
        })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .text(function (d) {
          return d.value;
        })
        .style("fill", function (d) {
          return colors(d.value);
        });
      // d3.csv(
      //   "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv"
      // ).then(() => {
      //   console.log("data:", data);
      //   svg
      //     .selectAll()
      //     .data(data, function (d) {
      //       return d.group + ":" + d.variable;
      //     })
      //     .enter()
      //     .append("rect")
      //     .attr("x", function (d) {
      //       return x(d.group);
      //     })
      //     .attr("y", function (d) {
      //       return y(d.variable);
      //     })
      //     .attr("width", x.bandwidth())
      //     .attr("height", y.bandwidth())
      //     .style("fill", function (d) {
      //       return colors(d.value);
      //     });
      // });
      // svg
      //   .select(".plot-area")
      //   .attr("fill", "steelblue")
      //   .selectAll(".bar")
      //   .data(data)
      //   .join("rect")
      //   .attr("class", "bar");
    },
    [gardenProgressDataApi]
  );

  useEffect(() => {
    if (gardenId) {
      const startDateISO: string = formatISO(startDate, {
        representation: "date",
      });
      const endDateISO: string = formatISO(endDate, {
        representation: "date",
      });
      getGardenProgressData(gardenId, startDateISO, endDateISO);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenId]);

  return (
    <div>
      <Typography>Progress</Typography>
      <div>Chart / Calendar section for {gardenProgress?.name}</div>
      <ul>
        {rules.map((rule: Rule) => {
          return <li key={rule._id}>{rule.name}</li>;
        })}
      </ul>
      <ul>
        {completedTasks.map((completedTask: CompletedTask) => {
          return (
            <li key={completedTask._id}>
              <span>Date: {completedTask.date}</span>
              <br />
              <span>Rule Id: {completedTask.ruleId}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <Typography>Line Chart Version</Typography>
        <Line data={data} options={options} />
      </div>
      <div>
        <Typography>Bar Chart Version</Typography>
        <Bar data={data} options={options} />
      </div>
      <div>
        <Typography>Table Version</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rule</TableCell>
                {tableHeader.map((header) => (
                  <TableCell>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows.map((row) => (
                <TableRow key={row.ruleId}>
                  <TableCell>{row.ruleName}</TableCell>
                  {console.log("testing:", row)}
                  {tableHeader.map((header) => (
                    <TableCell>{row[header] ? "◯" : "✖︎"}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Typography>Heat Map version</Typography>
        <Chart
          options={heatMapOptions}
          series={series}
          type="heatmap"
          width={500}
          height={320}
        />
      </div>
      <div>
        <svg
          ref={ref}
          style={{
            height: 500,
            width: "100%",
            marginRight: "0px",
            marginLeft: "100px",
          }}
        ></svg>
      </div>
    </div>
  );
};

export const DailyGardening = () => {
  const history = useHistory();
  const { userData, setUserData } = useUserState();

  const [gardenDataApi, getGardenData] = useApi(getGardenByGardenId);
  const [completedTaskApi, sendCompletedTaskData] = useApi(sendCompletedTask);
  // TODO: Revisit when delete api is implemented
  // const [deletedTaskApi, deleteTask] = useApi(deleteCompletedTask);

  const [lastClicked, setLastClicked] = useState("");

  const userId = useMemo(
    () => (userData.isLoggedIn ? userData.id : ""),
    [userData]
  );
  const garden = useMemo(() => gardenDataApi.response?.garden, [gardenDataApi]);
  console.log("TODO: Use garden data:", { garden });

  const rules = useMemo(
    () => gardenDataApi.response?.rules ?? [],
    [gardenDataApi]
  );

  const completedTasks = useMemo(() => {
    const currentCompletedTasks = gardenDataApi.response?.completedTasks ?? [];
    if (completedTaskApi.response) {
      currentCompletedTasks.push(completedTaskApi.response.completedTask);
      return currentCompletedTasks;
    }
    return currentCompletedTasks;
  }, [gardenDataApi, completedTaskApi]);

  const isRuleCompleted = useCallback(
    (ruleId?: string) => {
      if (!completedTasks || !ruleId) return false;

      return completedTasks.some((completedTask) => {
        return (
          isSameDay(new Date(), new Date(completedTask.date)) &&
          completedTask.ruleId === ruleId
        );
      });
    },
    [completedTasks]
  );

  // TODO: Please uncomment below line for delete!
  // const [completedTasks, setCompletedTasks] = useState(Array<CompletedTask>());
  const { gardenId } = useParams<{ gardenId: string }>();
  const [showDescriptions, setShowDescriptions] = useState(false);

  useEffect(() => {
    if (gardenId) {
      const dateISO: string = formatISO(new Date(), {
        representation: "date",
      });
      getGardenData(gardenId, dateISO);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenId]);

  const completeTaskHandler = useCallback(
    async (rule: Rule) => {
      if (rule._id) {
        setLastClicked(rule._id);
      }
      const localeDate = new Date();
      const utcDate = new Date(
        Date.UTC(
          localeDate.getFullYear(),
          localeDate.getMonth(),
          localeDate.getDate(),
          0,
          0,
          0,
          0
        )
      );
      const completedTask: CompletedTaskToSend = {
        ruleId: rule._id || "",
        fireBaseUserId: userId,
        date: utcDate.toISOString(),
        rewardTypeId: "61274429d20570644762b99b",
      };

      sendCompletedTaskData(completedTask);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userData]
  );

  useEffect(() => {
    if (completedTaskApi.status === "succeeded") {
      const { balance: newCoinBalance } = completedTaskApi.response.user;
      setUserData((data) => {
        return { ...data, balance: newCoinBalance };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedTaskApi]);

  // TODO: Revisit when delete api is implemented.
  // const handleDelete = useCallback(
  //   async (rule: Rule) => {
  //     const deleteCompletedTask: CompletedTask | undefined =
  //       completedTasks.find(
  //         (completedTask: CompletedTask) =>
  //           completedTask.ruleId === rule._id &&
  //           isSameDay(new Date(), new Date(completedTask.date))
  //       );

  //     if (deleteCompletedTask && userId) {
  //       // will return updated coins for users
  //       await deleteTask(deleteCompletedTask._id, userId);
  //     }
  //   },
  //   [completedTasks, deleteTask, userId]
  // );

  const handleChipColor = (bool: boolean) => {
    return bool ? "primary" : "secondary";
  };

  const classes = useStyles();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.gardenParentContainer}>
        <h1>Daily Gardening</h1>
        <LoadingWrapper isLoading={!gardenDataApi.isLoaded}>
          <div className={styles.gardenViewContainer}>
            <div className={styles.wateringAnimationContainer}>
              <img
                src={wateringAnimation}
                alt="watering animation"
                className={styles.wateringAnimation}
              />
            </div>
            <div className={styles.rulesContainer}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid container alignItems="center" xs={6}>
                  <h2 className={styles.subtitle}>Daily Goals:</h2>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  xs={6}
                  justifyContent="flex-end"
                >
                  <Switch
                    checked={showDescriptions}
                    color="primary"
                    onChange={() => setShowDescriptions((status) => !status)}
                    name="detailView"
                  />
                  <h5>View Details</h5>
                </Grid>
              </Grid>
              <div className={styles.taskButtonContainer}>
                {rules.map((rule) => {
                  return (
                    <LoadingWrapper
                      key={rule._id}
                      isLoading={
                        lastClicked === rule._id &&
                        completedTaskApi.status === "loading"
                      }
                    >
                      <Button
                        startIcon={!isRuleCompleted(rule._id) && <CloseIcon />}
                        endIcon={isRuleCompleted(rule._id) && <DoneIcon />}
                        className={classes.ruleButton}
                        size="large"
                        variant="contained"
                        color={handleChipColor(isRuleCompleted(rule._id))}
                        onClick={() => {
                          !isRuleCompleted(rule._id) &&
                            completeTaskHandler(rule);
                        }}
                        disabled={completedTaskApi.status === "loading"}
                        // TODO: Implement UNDO
                        // onDelete={() => handleDelete(rule)}
                        // deleteIcon={<UndoIcon />}
                      >
                        {rule.name}
                      </Button>
                      {rule.description && showDescriptions && (
                        <Card className={classes.taskDescription}>
                          <p className={styles.ruleDescription}>
                            {showDescriptions && rule.description}
                          </p>
                        </Card>
                      )}
                    </LoadingWrapper>
                  );
                })}
              </div>
            </div>
            <div className={styles.centered}>
              <Button
                variant="contained"
                className={classes.returnButton}
                onClick={() => history.push("/user/myniwa")}
              >
                Go back to My Gardens
              </Button>
            </div>
          </div>
        </LoadingWrapper>
      </div>
      <div>
        <GardenProgress gardenId={gardenId} />
      </div>
    </motion.div>
  );
};
