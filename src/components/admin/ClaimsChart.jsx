import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ClaimsChart = ({ claims }) => {
  const data = [
    {
      name: "Claims",
      Pending: claims.filter(c => c.status === "pending").length,
      Approved: claims.filter(c => c.status === "approved").length,
      Rejected: claims.filter(c => c.status === "rejected").length,
    },
  ];

  return (
    <div className="chart-card">
      <h5 className="chart-title">Claims Overview</h5>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />

          <Tooltip
            contentStyle={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />

          <Legend />

          {/* 🔥 Soft SaaS Colors */}
          <Bar dataKey="Approved" fill="#22c55e" radius={[12, 12, 0, 0]} />
          <Bar dataKey="Pending" fill="#fbbf24" radius={[12, 12, 0, 0]} />
          <Bar dataKey="Rejected" fill="#f87171" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClaimsChart;