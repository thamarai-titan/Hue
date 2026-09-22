"use client";

import { useState } from "react";
import { Theme } from "../types";

export default function AnalyticsProject({ theme }: { theme: Theme }) {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "90D" | "1Y">("30D");
  const [selectedMetric, setSelectedMetric] = useState<number>(0);
  const t = theme.vars;

  const metrics = [
    { label: "Total Revenue", value: "$124,592", change: "+14.8%", up: true, subtitle: "vs. last period" },
    { label: "Active Subscriptions", value: "3,842", change: "+8.2%", up: true, subtitle: "net new: 219" },
    { label: "Net Churn Rate", value: "1.42%", change: "-0.38%", up: true, subtitle: "record low" },
    { label: "Avg Revenue / User", value: "$32.40", change: "+4.1%", up: true, subtitle: "expansion: +$1.20" },
  ];

  const transactions = [
    { id: "TX-9402", customer: "Stripe Inc.", plan: "Enterprise", amount: "$2,400.00", status: "completed", date: "Just now" },
    { id: "TX-9401", customer: "Supabase Labs", plan: "Growth Pro", amount: "$480.00", status: "completed", date: "14m ago" },
    { id: "TX-9400", customer: "Raycast Design", plan: "Team Tier", amount: "$190.00", status: "processing", date: "1h ago" },
    { id: "TX-9399", customer: "Vercel Systems", plan: "Enterprise", amount: "$3,800.00", status: "completed", date: "3h ago" },
    { id: "TX-9398", customer: "Linear Orbit", plan: "Startup", amount: "$99.00", status: "refunded", date: "5h ago" },
  ];

  // SVG dynamic spline chart points based on timeframe
  const chartData =
    timeframe === "7D"
      ? [20, 35, 28, 45, 62, 58, 80]
      : timeframe === "30D"
      ? [24, 32, 28, 42, 38, 55, 48, 62, 70, 65, 82, 94]
      : timeframe === "90D"
      ? [18, 25, 30, 38, 52, 60, 58, 72, 85, 90, 88, 102]
      : [15, 22, 28, 40, 55, 68, 75, 85, 94, 110, 125, 140];

  const maxVal = Math.max(...chartData);
  const minVal = Math.min(...chartData);
  const svgWidth = 600;
  const svgHeight = 160;

  const points = chartData.map((val, idx) => {
    const x = (idx / (chartData.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / (maxVal - minVal || 1)) * (svgHeight - 40) - 20;
    return `${x},${y}`;
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p}` : `${acc} L ${p}`), "");
  const areaD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  return (
    <div className="space-y-6">
      {/* Project Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: t.border }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: t.accentSubtle, color: t.accent }}
            >
              SaaS Analytics
            </span>
            <span className="text-xs" style={{ color: t.textMuted }}>Live Project View</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: t.textPrimary }}>
            Revenue & Growth Dashboard
          </h2>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center p-1 rounded-xl border" style={{ borderColor: t.border, background: t.cardBg }}>
          {(["7D", "30D", "90D", "1Y"] as const).map((tf) => (
            <button
              key={tf}
              id={`analytics-timeframe-${tf}`}
              onClick={() => setTimeframe(tf)}
              className="px-3 py-1 text-xs font-medium rounded-lg transition-all"
              style={{
                background: timeframe === tf ? t.accent : "transparent",
                color: timeframe === tf ? t.accentText : t.textSecondary,
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const isSel = selectedMetric === idx;
          return (
            <div
              key={m.label}
              onClick={() => setSelectedMetric(idx)}
              className="p-5 rounded-xl border transition-all cursor-pointer hover:scale-[1.01]"
              style={{
                background: t.cardBg,
                borderColor: isSel ? t.accent : t.border,
                boxShadow: isSel ? `0 0 0 1px ${t.accent}` : "none",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium" style={{ color: t.textSecondary }}>{m.label}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5"
                  style={{ background: t.successBg, color: t.success }}
                >
                  {m.change}
                </span>
              </div>
              <div className="text-2xl font-bold tracking-tight mb-1" style={{ color: t.textPrimary }}>
                {m.value}
              </div>
              <div className="text-[11px]" style={{ color: t.textMuted }}>{m.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Interactive Chart Card */}
      <div className="p-6 rounded-2xl border" style={{ background: t.cardBg, borderColor: t.border }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-semibold" style={{ color: t.textPrimary }}>
              Recurring Revenue Velocity ({timeframe})
            </h3>
            <p className="text-xs" style={{ color: t.textSecondary }}>
              Tracking net new MRR trends over the selected period
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.accent }} />
              <span style={{ color: t.textSecondary }}>Forecast</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.success }} />
              <span style={{ color: t.textSecondary }}>Actuals</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="relative w-full h-44 overflow-hidden pt-2">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`chart-gradient-${theme.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.accent} stopOpacity="0.35" />
                <stop offset="100%" stopColor={t.accent} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid horizontal lines */}
            {[0.25, 0.5, 0.75].map((factor) => (
              <line
                key={factor}
                x1="0"
                y1={svgHeight * factor}
                x2={svgWidth}
                y2={svgHeight * factor}
                stroke={t.border}
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            ))}
            <path d={areaD} fill={`url(#chart-gradient-${theme.id})`} />
            <path d={pathD} fill="none" stroke={t.accent} strokeWidth="3" strokeLinecap="round" />
            {points.map((pt, i) => {
              const [cx, cy] = pt.split(",");
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={i === points.length - 1 ? 5 : 3.5}
                  fill={t.cardBg}
                  stroke={t.accent}
                  strokeWidth="2.5"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Transactions & Activity Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: t.cardBg, borderColor: t.border }}>
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: t.border }}>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: t.textPrimary }}>Recent Invoices & Settlements</h3>
            <p className="text-xs" style={{ color: t.textMuted }}>Automated billing cycle updates</p>
          </div>
          <button
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-opacity hover:opacity-80"
            style={{ borderColor: t.border, color: t.textSecondary, background: t.bg }}
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b" style={{ borderColor: t.border, background: t.muted }}>
                <th className="p-3.5 font-medium" style={{ color: t.textMuted }}>INVOICE ID</th>
                <th className="p-3.5 font-medium" style={{ color: t.textMuted }}>CUSTOMER</th>
                <th className="p-3.5 font-medium" style={{ color: t.textMuted }}>TIER</th>
                <th className="p-3.5 font-medium" style={{ color: t.textMuted }}>AMOUNT</th>
                <th className="p-3.5 font-medium" style={{ color: t.textMuted }}>STATUS</th>
                <th className="p-3.5 font-medium text-right" style={{ color: t.textMuted }}>DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: t.border }}>
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-black/5 transition-colors">
                  <td className="p-3.5 font-mono" style={{ color: t.textSecondary }}>{tx.id}</td>
                  <td className="p-3.5 font-semibold" style={{ color: t.textPrimary }}>{tx.customer}</td>
                  <td className="p-3.5" style={{ color: t.textSecondary }}>{tx.plan}</td>
                  <td className="p-3.5 font-semibold font-mono" style={{ color: t.textPrimary }}>{tx.amount}</td>
                  <td className="p-3.5">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium inline-block"
                      style={{
                        background:
                          tx.status === "completed"
                            ? t.successBg
                            : tx.status === "processing"
                            ? t.warningBg
                            : t.dangerBg,
                        color:
                          tx.status === "completed"
                            ? t.success
                            : tx.status === "processing"
                            ? t.warning
                            : t.danger,
                      }}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono" style={{ color: t.textMuted }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
