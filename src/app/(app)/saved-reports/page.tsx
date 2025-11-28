"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Eye, FileWarning } from "lucide-react";
import type { GenerateComplianceReportOutput } from "@/ai/flows/generate-compliance-report";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComplianceReportView } from "../check-compliance/compliance-report-view";

type SavedReport = GenerateComplianceReportOutput & {
  id: string;
  productName: string;
  savedAt: string;
};

function ReportDialog({
  report,
  productName,
}: {
  report: GenerateComplianceReportOutput;
  productName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" /> View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Report Details</DialogTitle>
        </DialogHeader>
        <ComplianceReportView
          report={report}
          productName={productName}
          viewMode="dialog"
        />
      </DialogContent>
    </Dialog>
  );
}

export default function SavedReportsPage() {
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const reports = JSON.parse(
      localStorage.getItem("savedReports") || "[]"
    ) as SavedReport[];
    setSavedReports(reports);
  }, []);

  const deleteReport = (id: string) => {
    const updatedReports = savedReports.filter((report) => report.id !== id);
    setSavedReports(updatedReports);
    localStorage.setItem("savedReports", JSON.stringify(updatedReports));
  };

  if (!isMounted) {
    return (
        <div className="space-y-4 w-full">
            <Card><CardContent className="p-4"><div className="h-16 animate-pulse bg-muted rounded-md"></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="h-16 animate-pulse bg-muted rounded-md"></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="h-16 animate-pulse bg-muted rounded-md"></div></CardContent></Card>
        </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-2">Saved Reports</h1>
      <p className="text-muted-foreground mb-8">
        Review your previously generated compliance reports.
      </p>

      {savedReports.length > 0 ? (
        <div className="space-y-4">
          {savedReports.map((savedReport) => (
            <Card key={savedReport.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <div className="flex flex-col items-center justify-center p-3 rounded-md bg-primary/10 w-20 flex-shrink-0">
                    <span className="text-3xl font-bold text-primary">
                      {savedReport.report.complianceScore}%
                    </span>
                    <span className="text-xs text-primary/80">Score</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {savedReport.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Standard: {savedReport.report.standardCode} &bull; Saved
                      on: {new Date(savedReport.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <ReportDialog
                    report={{ report: savedReport.report }}
                    productName={savedReport.productName}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteReport(savedReport.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <CardContent>
            <FileWarning className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No Saved Reports</h3>
            <p className="text-muted-foreground mt-2">
              You haven't saved any compliance reports yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
