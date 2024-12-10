import React, { useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { fetchCSV } from "../services/fetchCSV";
import { scaleLinear } from "d3-scale";
import { TASK1A_CSV_URL } from "../utils/constants";

const BarChartComponentA = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadCSVData = async () => {
            try {
                const rawData = await fetchCSV(TASK1A_CSV_URL);
                const formattedData = rawData.map((row) => ({
                    Product: row.Product,
                    TotalValue: parseInt(row.TotalValue, 10),
                    TotalSales: parseInt(row.TotalSales, 10),
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data for Task 1 (a):", error);
            }
        };
        loadCSVData();
    }, []);

    const productOrder = useMemo(
        () => ["ghh", "dww", "aaa", "ooo", "hgt", "ytt", "qyy", "prp", "eee", "rtt"],
        []
    );

    const sortedData = useMemo(() => {
        return data.sort(
            (a, b) => productOrder.indexOf(a.Product) - productOrder.indexOf(b.Product)
        );
    }, [data, productOrder]);
    

    const valueTicks = useMemo(() => [10, 15, 20, 25, 30, 35, 40], []);

    const colorScale = useMemo(
        () =>
            scaleLinear()
                .domain([Math.min(...valueTicks), Math.max(...valueTicks)])
                .range(["#FFD9B3", "#800000"]),
        [valueTicks]
    );

    return (
        <div style={containerStyle}>
            <div style={chartWrapperStyle}>
                <div style={chartSection}>
                    <h2 style={titleStyle}>Interactive Bar Chart with Dynamic Color Scale</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart
                            data={sortedData}
                            margin={{
                                top: 20,
                                right: 70,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Product" label={{ value: "Product", position: "bottom" }} />
                            <YAxis
                                label={{
                                    value: "TotalSales",
                                    angle: -90,
                                    position: "insideLeft",
                                }}
                                ticks={[0, 2, 4, 6, 8, 10, 12, 14]}
                            />
                            <Tooltip
                                formatter={(value, name) => [`${value}`, name]}
                                labelFormatter={(label) => `Product: ${label}`}
                                content={CustomTooltip}
                            />
                            <Bar dataKey="TotalSales" name="Total Sales">
                                {sortedData.map((entry) => (
                                    <Cell key={entry.Product} fill={colorScale(entry.TotalValue)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={legendWrapperStyle}>
                    <p style={legendTitleStyle}>TotalValue</p>
                    <div style={colorScaleStyle(colorScale, valueTicks)}>
                        {valueTicks.map((tick) => (
                            <div key={tick} style={tickStyle(tick, valueTicks)}>
                                {tick}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CustomTooltip = ({ payload }) => {
    if (payload && payload.length) {
        const { Product, TotalSales, TotalValue } = payload[0].payload;
        return (
            <div style={tooltipStyle}>
                <p>Product: {Product}</p>
                <p>TotalSales: {TotalSales}</p>
                <p>TotalValue: {TotalValue}</p>
            </div>
        );
    }
    return null;
};

// Inline Styles for Improved Readability
const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    height: "auto",
};

const chartWrapperStyle = {
    width: "80%",
    display: "flex",
    flexDirection: "row",
};

const chartSection = {
    flex: 4,
};

const titleStyle = {
    textAlign: "center",
};

const legendWrapperStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    paddingTop: "20px",
};

const legendTitleStyle = {
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
};

const tooltipStyle = {
    backgroundColor: "white",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    color: "#333",
    maxWidth: "200px",
    lineHeight: "0.8",
};

const colorScaleStyle = (colorScale, valueTicks) => ({
    width: "20px",
    height: "300px",
    background: `linear-gradient(to bottom, ${colorScale(Math.max(...valueTicks))}, ${colorScale(
        Math.min(...valueTicks)
    )})`,
    position: "relative",
});

const tickStyle = (tick, valueTicks) => ({
    position: "absolute",
    right: "-20px",
    bottom: `${((tick - Math.min(...valueTicks)) / (Math.max(...valueTicks) - Math.min(...valueTicks))) * 100}%`,
    transform: "translateY(50%)",
    fontSize: "12px",
});

export default BarChartComponentA;