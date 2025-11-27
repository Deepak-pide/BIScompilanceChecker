"use client";

import type { GenerateComplianceReportOutput } from "@/ai/flows/generate-compliance-report";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Save,
  XCircle,
} from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";

type ReportViewProps = {
  report: GenerateComplianceReportOutput;
  productName: string;
  viewMode?: "page" | "dialog";
  onBack?: () => void;
  onSave?: (report: GenerateComplianceReportOutput) => void;
};

const chartConfig = {
  passed: {
    label: "Passed",
    color: "hsl(var(--chart-2))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--destructive))",
  },
};

export function ComplianceReportView({
  report: { report },
  productName,
  viewMode = "page",
  onBack = () => {},
  onSave = () => {},
}: ReportViewProps) {
  const { toast } = useToast();

  const handleSave = () => {
    onSave({ report });
    toast({
      title: "Report Saved",
      description: `The compliance report for "${productName}" has been saved.`,
    });
  };

  const handleGeneratePdf = () => {
    window.print();
  };

  const pieData = [
    { name: "Passed", value: report.passedRules, fill: "var(--color-passed)" },
    { name: "Failed", value: report.failedRules, fill: "var(--color-failed)" },
  ];

  return (
    <div className="space-y-6 print-container">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <h2 className="text-2xl font-bold">
          Compliance Report for:{" "}
          <span className="text-primary">{productName}</span>
        </h2>
        {viewMode === "page" && (
          <div className="flex gap-2 no-print self-end">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2" /> Go Back
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2" /> Save Report
            </Button>
            <Button onClick={handleGeneratePdf}>
              <FileText className="mr-2" /> Generate PDF
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Compliance Score</CardTitle>
            <CardDescription>
              {report.complianceScore}% compliance with standard{" "}
              {report.standardCode}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={120}
                  startAngle={90}
                  endAngle={450}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-4xl font-bold"
                >
                  {report.complianceScore}%
                </text>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Standard Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Standard Code:</strong> {report.standardCode}
              </p>
              <p>
                <strong>Product Category:</strong> {report.productCategory}
              </p>
              <p>
                <strong>Total Rules:</strong> {report.totalRules}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Product Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center">
                <CheckCircle2 className="text-green-500 mr-2" />{" "}
                <strong>Passed:</strong> {report.passedRules}
              </p>
              <p className="flex items-center">
                <XCircle className="text-red-500 mr-2" />{" "}
                <strong>Failed:</strong> {report.failedRules}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Missing Requirements</CardTitle>
          <CardDescription>
            The following requirements were not met or could not be verified
            from the provided information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {report.missingRequirements.length > 0 ? (
            <ul className="space-y-3">
              {report.missingRequirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start p-3 bg-destructive/10 rounded-md"
                >
                  <XCircle className="text-destructive w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-semibold">Congratulations!</p>
              <p className="text-muted-foreground">
                No missing requirements found. The product appears to be fully
                compliant.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
