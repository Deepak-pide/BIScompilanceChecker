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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { getStandardByCode } from "@/lib/standards";

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
  const standard = getStandardByCode(report.standardCode);

  const passedRequirements = standard
    ? standard.rules.slice(0, report.passedRules)
    : [];

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
    <div className="space-y-6 print-container w-full">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <h2 className="text-2xl font-bold break-words">
          Compliance Report for:{" "}
          <span className="text-primary">{productName}</span>
        </h2>
        {viewMode === "page" && (
          <div className="flex gap-2 no-print self-start md:self-end flex-wrap">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2" /> Back
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2" /> Save
            </Button>
            <Button onClick={handleGeneratePdf}>
              <FileText className="mr-2" /> PDF
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
          <CardTitle>Compliance Checklist</CardTitle>
          <CardDescription>
            A detailed breakdown of the compliance requirements for the standard{" "}
            {report.standardCode}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={["failed-reqs"]}>
            <AccordionItem value="failed-reqs">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <XCircle className="text-destructive" />
                  <span className="font-semibold">
                    Missing Requirements ({report.missingRequirements.length})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {report.missingRequirements.length > 0 ? (
                  <ul className="space-y-3 pt-4">
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
                      No missing requirements found.
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="passed-reqs">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" />
                  <span className="font-semibold">
                    Passed Requirements ({passedRequirements.length})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {passedRequirements.length > 0 ? (
                  <ul className="space-y-3 pt-4">
                    {passedRequirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start p-3 bg-green-500/10 rounded-md"
                      >
                        <CheckCircle2 className="text-green-500 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No passed requirements to show.
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
