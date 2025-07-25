import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  revenueStatistics,
  trafficData,
  paymentMethodShare as initialPaymentMethodShare
} from "@/features/AdminPage/DefaultData/index";
import type { PieLabelProps } from "recharts/types/polar/Pie";
import { useState } from "react";

const RADIAN = Math.PI / 180;
const COLORS = ["#4F2CD2", "#1E3A8A", "#0F766E", "#2563EB", "#0EA5E9"];

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: PieLabelProps) => {
  if (!percent || percent === 0) return null;
  const radius = innerRadius! + (outerRadius! - innerRadius!) * 0.5;
  const x = cx! + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy! + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x} y={y}
      fill="#fff"
      fontSize={12}
      fontWeight={600}
      textAnchor={x > cx! ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent! * 100).toFixed(0)}%`}
    </text>
  );
};

interface Method {
  name: string;
  value: number;
  active: boolean;
}

export function AnalyticsPage() {
  const [methods, setMethods] = useState<Method[]>(
    initialPaymentMethodShare.map(item => ({ ...item, active: true }))
  );
  
  const handleLegendClick = (payload: any) => {
    const name = payload.value as string;
    setMethods(ms =>
      ms.map(m => m.name === name ? { ...m, active: !m.active } : m)
    );
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 card bg-admin-palette p-4 rounded-lg">
          <p className="text-lg mb-4 font-semibold">Page View</p>
          <div className="bg-[#020517] p-4 rounded">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={trafficData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                <XAxis dataKey="name" axisLine={{ stroke: "#555" }} tickLine={false}
                  tick={{ fill: "#aaa", fontSize: 12 }} />
                <YAxis axisLine={{ stroke: "#555" }} tickLine={false}
                  tick={{ fill: "#aaa", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a2e", border: "none" }}
                  labelStyle={{ color: "#ccc" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#ccc" }} />
                <Line
                  type="monotone"
                  dataKey="visits"
                  name="Visits"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#4ade80" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  name="Page Views"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#60a5fa" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-1/3 card bg-admin-palette p-4 rounded-lg">
          <p className="text-lg mb-4 font-semibold">Payment Method</p>
          <div className="bg-admin-template h-64 p-0 rounded">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e2b4f", border: "none" }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#ccc" }}
                />
                <Legend
                  verticalAlign="bottom"
                  layout="horizontal"
                  iconType="circle"
                  wrapperStyle={{ color: "#bbb", marginTop: 8 }}
                  payload={methods.map((entry, idx) => ({
                    id: entry.name,
                    value: entry.name,
                    type: "circle",
                    color: entry.active ? COLORS[idx % COLORS.length] : "#555"
                  }))}
                  onClick={handleLegendClick}
                  formatter={value => {
                    const m = methods.find(x => x.name === value)!;
                    return <span style={{ opacity: m.active ? 1 : 0.4 }}>{value}</span>;
                  }}
                />
                <Pie
                  data={methods.map(m => ({
                    name: m.name,
                    value: m.active ? m.value : 0
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  dataKey="value"
                >
                  {methods.map((entry, idx) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-admin-palette p-4 rounded-lg">
        <p className="text-lg mb-4 font-semibold">Web Traffic – Desktop vs Mobile</p>
        <div className="bg-admin-template h-64 p-0 rounded">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueStatistics}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="web" fill="#5C2880ED" />
              <Bar dataKey="mobile" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
