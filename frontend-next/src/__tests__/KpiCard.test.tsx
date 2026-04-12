import { render, screen } from "@testing-library/react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { DollarSign } from "lucide-react";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("KpiCard", () => {
  const defaultProps = {
    title: "Total Spend",
    value: "$5,847.50",
    subtext: { highlight: "Live", normal: "total monthly tracking" },
    icon: DollarSign,
    colorClass: { bg: "bg-indigo-500/10", icon: "text-indigo-500" },
  };

  it("renders correctly with provided props", () => {
    render(<KpiCard {...defaultProps} />);
    
    expect(screen.getByText("Total Spend")).toBeInTheDocument();
    expect(screen.getByText("$5,847.50")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("total monthly tracking")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<KpiCard {...defaultProps} loading={true} />);
    
    // In loading state, value is replaced by a skeleton div
    expect(screen.queryByText("$5,847.50")).not.toBeInTheDocument();
  });
});
