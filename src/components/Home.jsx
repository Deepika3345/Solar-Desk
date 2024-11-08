import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import GaugeChart from "react-gauge-chart";
import { solarDataGet, getWeeklyData } from "../features/solar/solarSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { data, weeklyData, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.solar);

  // Get current date
  const currentDate = new Date()
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");

  const getWeekDateRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 7);

    const endOfWeek = today;

    const startDate = startOfWeek
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    const endDate = endOfWeek.toLocaleDateString("en-GB").replace(/\//g, "-");

    return { startDate, endDate };
  };

  const { startDate, endDate } = getWeekDateRange();

  useEffect(() => {
    //  daily data
    dispatch(solarDataGet(currentDate));

    // weekly data
    dispatch(getWeeklyData({ startDate, endDate }));
  }, [dispatch, currentDate, startDate, endDate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  const dailyData = isSuccess && data ? [data] : null;

  const chartData = dailyData
    ? dailyData
    : weeklyData.length > 0
    ? weeklyData
    : [{ date: "No Data", production: 0, consumption: 0 }];

  const batteryData = dailyData
    ? dailyData[0].batteryLevel
    : weeklyData.length > 0
    ? weeklyData[weeklyData.length - 1].batteryLevel
    : 50;

  return (
    <div
      className="dashboard"
      style={{ display: "grid", gridTemplateColumns: "60% 40%", gap: "30px" }}
    >
      <div style={{ width: "100%" }}>
        <div className="chart-container">
          <h3 className="text-center mt-3">Energy Production & Consumption</h3>
          <ResponsiveContainer height={450}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="production" fill="#82ca9d" barSize={40} />
              <Bar dataKey="consumption" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Battery Info */}
      <div className="battery-info" style={{ padding: "10px", width: "100%" }}>
        <h3>Battery Level</h3>
        <GaugeChart
          id="battery-gauge"
          nrOfLevels={20}
          percent={batteryData / 100}
          textColor="#000"
        />
      </div>
    </div>
  );
};

export default Home;
