import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { useMemo, useEffect } from "react";
import { getGardenByGardenIdWithDates } from "../../../helpers/api/gardens/getGardenByGardenIdWithDates";
import { CompletedTask } from "../../../models/completedTask.model";
import { useApi } from "../../../utils/api/useApi";
import {
  addDays,
  formatISO,
  getDay,
  isBefore,
  isSameDay,
  startOfWeek,
  sub,
} from "date-fns";
import { Rule } from "../../../models/rule.model";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styles from "../MyGrowth.module.css";

interface ICompletedTasksByRuleId {
  [ruleId: string]: Array<CompletedTask>;
}

interface TabDataProps {
  gardenId: string | undefined;
}

export const TabData: React.FC<TabDataProps> = ({
  gardenId,
}) => {
  // TODO: fix this to state if we want to change state and end dates
  const startDate = sub(new Date(), { weeks: 4 });
  const endDate = new Date();

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
      categories: [
        "",
        "",
        "",
        "",
      ],
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

  const completedTasks = useMemo(
    () => gardenProgressDataApi.response?.completedTasks ?? [],
    [gardenProgressDataApi]
  );

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
    const completedTasksByRuleId: ICompletedTasksByRuleId =
      rules.reduce((ruleMapping: ICompletedTasksByRuleId, rule: Rule) => {
        const completedTasksPerRule: Array<CompletedTask> =
          completedTasks.filter(
            (completedTask: CompletedTask) => completedTask.ruleId === rule._id
          );
        ruleMapping[rule._id || "emptyRuleId"] = completedTasksPerRule;
        return ruleMapping;
      }, {});

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
    <>
      <Grid className={ styles.tableContainer }>
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
                    {tableHeader.map((header) => (
                      <TableCell key={row.ruleId + "_"+ row.ruleName}>{row[header] ? "◯" : "✖︎"}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      <Grid className={ styles.tableContainer }>
        <Typography>Heat Map version</Typography>
        <Chart
          options={heatMapOptions}
          series={series}
          type="heatmap"
          width={500}
          height={320}
        />
      </Grid>
    </>
  )
}