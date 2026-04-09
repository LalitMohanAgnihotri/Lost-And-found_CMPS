import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ClaimsPieChart = ({ claims }) => {
  const data = [
    {
      name: "Approved",
      value: claims.filter(c => c.status === "approved").length,
    },
    {
      name: "Pending",
      value: claims.filter(c => c.status === "pending").length,
    },
    {
      name: "Rejected",
      value: claims.filter(c => c.status === "rejected").length,
    },
  ];

  const COLORS = ["#22c55e", "#fbbf24", "#f87171"];

  return (
    <div className="chart-card">
      <h5 className="chart-title">Claims Distribution</h5>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            innerRadius={50}
            paddingAngle={4}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClaimsPieChart;