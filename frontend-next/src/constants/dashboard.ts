export const DEFAULT_TREND_DATA = [
  { name: "Week 1", total: 0 },
  { name: "Week 2", total: 0 },
  { name: "Week 3", total: 0 },
  { name: "Current", total: 0 },
];

export const COLORS = [
  "#6366F1",
  "#00E5C0",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

export const INITIAL_DATA = {
  total_spend: 0.0,
  savings: 0.0,
  active_platforms: 0,
  roi: 0,
  trend_data: DEFAULT_TREND_DATA,
  platform_breakdown: [],
  health_status: [],
  recent_activity: [],
};

export const INITIAL_KPIS = { clients: 0, automations: 0 };
