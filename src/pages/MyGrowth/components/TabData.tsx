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
  // getMonth,
  endOfWeek,
  startOfMonth,
  format,
  isSameMonth,
} from "date-fns";
import { Rule } from "../../../models/rule.model";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styles from "../MyGrowth.module.css";
import { LoadingWrapper } from "../../../components/LoadingWrapper";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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
  const tableStartDate = sub(new Date(), { days: 6 });
  const endDate = new Date();
  
  const [gardenProgressDataApi, getGardenProgressData] = useApi(
    getGardenByGardenIdWithDates
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
    let date = tableStartDate;
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
        name: "Sat",
        data: [],
      },
      {
        name: "Fri",
        data: [],
      },
      {
        name: "Thu",
        data: [],
      },
      {
        name: "Wed",
        data: [],
      },
      {
        name: "Tue",
        data: [],
      },
      {
        name: "Mon",
        data: [],
      },
      {
        name: "Sun",
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

  const heatMapOptions: ApexOptions = useMemo(() => {
    let date = startOfWeek(startDate);
    // const startMonth = getMonth(date);
    const categories: Array<string> = [];
    if (isSameDay(date, startOfMonth(date))) {
      categories.push(format(date, "LLL"));
      date = addDays(date, 7);
    }
    while (isBefore(date, endDate) || isSameDay(date, endDate)) {
      const endOfWeekDay = endOfWeek(date);
      if (isSameMonth(date, endOfWeekDay)) { 
        categories.push("");
      } else {
        categories.push(format(endOfWeekDay, "LLL"))
      }
      date = addDays(date, 7);
    }
    const options: ApexOptions =   {
      chart: {
        height: 350,
        type: "heatmap",
        foreColor: "#172F4A"
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        type: "category",
        categories: categories,
      },
      plotOptions: {
        heatmap: {
          radius: 4
        }
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#6ac697",
        },
      },
    };
    return options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenProgressDataApi])

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
    <LoadingWrapper isLoading={gardenProgressDataApi.status === "loading"}>
      <Grid container>
        <Typography className={styles.gardenDescription} variant="h5">This week's Seeds:</Typography>
      </Grid>
      <Grid className={ styles.tableContainer }>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Seeds</TableCell>
                  {tableHeader.reverse().map((header) => (
                    <TableCell key={header}>{header.slice(5)}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataRows.map((row) => (
                  <TableRow key={row.ruleId}> 
                    <TableCell>{row.ruleName}</TableCell>
                    {tableHeader.map((header) => (
                      <TableCell key={row.ruleId + "_"+ header} className={row[header] ? styles.complete : styles.incomplete}>{row[header] ? <CheckIcon /> : <ClearIcon />}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      <Grid container>
        <Typography className={styles.heatMapDescription} variant="h5">Last 4 weeks:</Typography>
      </Grid>
      <Grid className={ styles.heatMapContainer }>
        <Chart
          options={heatMapOptions}
          series={series}
          type="heatmap"
          height={400}
        />
      </Grid>
      </LoadingWrapper>
    </>
  )
}