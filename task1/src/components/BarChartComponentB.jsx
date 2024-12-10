import React, { useEffect, useState, useMemo } from "react";
import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchCSV } from "../services/fetchCSV";
import { TASK1B_CSV_URL } from "../utils/constants";

const productOrder = ["aaa", "ooo", "rtt", "ghh", "dww", "ytt", "eee", "qyy", "prp", "hgt"];

const BarChartComponentB = () => {
  const [data, setData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [previousMonth, setPreviousMonth] = useState("");

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const rawData = await fetchCSV(TASK1B_CSV_URL);
        const formattedData = rawData
          .map((row) => {
            const [day, month, year] = row.Date.split("/");
            const formattedDate = new Date(`${year}-${month}-${day}`);
            if (isNaN(formattedDate.getTime())) {
              console.error("Invalid Date:", row.Date);
              return null; // Skip invalid rows
            }
            return {
              Date: formattedDate.toISOString().split("T")[0],
              Product: row.Product,
              Sales: parseInt(row.MonthSales, 10),
            };
          })
          .filter((row) => row !== null); // Remove invalid rows

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data for Task 1 (b):", error);
      }
    };
    loadCSVData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const allMonths = [...new Set(data.map((entry) => entry.Date.slice(0, 7)))];
      const latestMonth = allMonths.sort().reverse()[0]; // Most recent month
      const previousMonth = new Date(`${latestMonth}-01`);
      previousMonth.setMonth(previousMonth.getMonth() - 1); // Go one month back
      const formattedPreviousMonth = `${previousMonth.getFullYear()}-${(previousMonth.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      setCurrentMonth(latestMonth);
      setPreviousMonth(formattedPreviousMonth);
    }
  }, [data]);

  const chartData = useMemo(() => {
    const groupedData = {};
    data.forEach((entry) => {
      const entryMonth = entry.Date.slice(0, 7);
      if (!groupedData[entry.Product]) {
        groupedData[entry.Product] = { Product: entry.Product, CurrentMonthSales: 0, PreviousMonthSales: 0 };
      }
      if (entryMonth === currentMonth) groupedData[entry.Product].CurrentMonthSales += entry.Sales;
      else if (entryMonth === previousMonth) groupedData[entry.Product].PreviousMonthSales += entry.Sales;
    });

    const finalData = Object.values(groupedData);
    finalData.sort((a, b) => productOrder.indexOf(a.Product) - productOrder.indexOf(b.Product));
    return finalData;
  }, [data, currentMonth, previousMonth]);

  return (
    <div style={containerStyle}>
      <div style={chartStyle}>
        <h2 style={{ textAlign: "center" }}>Current & Previous Month Sales by Product</h2>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Product" label={{ value: "Product", position: "bottom" }} />
            <YAxis label={{ value: "Values", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ top: 0, right: 20 }} />
            <Bar dataKey="CurrentMonthSales" fill="blue" name="Current Month Sales" barSize={60} />
            <Line
              type="linear"
              dataKey="PreviousMonthSales"
              stroke="red"
              name="Previous Month Sales"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  height: "auto",
};

const chartStyle = {
  width: "60%",
};

export default BarChartComponentB;