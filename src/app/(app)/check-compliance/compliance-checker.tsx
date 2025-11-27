"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { checkComplianceAction, type FormState } from "./actions";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Paperclip, Send, X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ComplianceReportView } from "./compliance-report-view";
import type { GenerateComplianceReportOutput } from "@/ai/flows/generate-compliance-report";

const initialState: FormState = {};

type SavedReport = GenerateComplianceReportOutput & {
  id: string;
  productName: string;
  savedAt: string;
};

export function ComplianceChecker() {
  const { toast } = useToast();
  const [formState, formAction] = useFormState(
    checkComplianceAction,
    initialState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<GenerateComplianceReportOutput | null>(
    null
  );
  const [productName, setProductName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) {
        // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 4MB.",
        });
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setFileDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setProductName(formData.get("productName") as string);
    if (fileDataUri) {
      formData.append("fileDataUri", fileDataUri);
    }

    setIsLoading(true);
    formAction(formData);
  };

  useEffect(() => {
    setIsLoading(false);
    if (formState?.report) {
      setReport(formState.report);
    }
    if (formState?.error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: formState.error,
      });
    }
  }, [formState, toast]);

  const handleGoBack = () => {
    setReport(null);
    formRef.current?.reset();
    setFile(null);
    setFileDataUri(null);
    setProductName("");
  };

  const handleSaveReport = (reportToSave: GenerateComplianceReportOutput) => {
    const newSavedReport: SavedReport = {
      ...reportToSave,
      id: crypto.randomUUID(),
      productName: productName,
      savedAt: new Date().toISOString(),
    };
    const savedReports = JSON.parse(
      localStorage.getItem("savedReports") || "[]"
    ) as SavedReport[];
    localStorage.setItem(
      "savedReports",
      JSON.stringify([newSavedReport, ...savedReports])
    );
  };

  if (report) {
    return (
      <ComplianceReportView
        report={report}
        productName={productName}
        onBack={handleGoBack}
        onSave={handleSaveReport}
      />
    );
  }

  return (
    <Card>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              placeholder="e.g., Helmet, Charger, Toy"
              required
            />
            {formState?.fieldErrors?.productName && (
              <p className="text-sm text-destructive">
                {formState.fieldErrors.productName[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Material, rating, features..."
              required
              rows={5}
            />
            {formState?.fieldErrors?.description && (
              <p className="text-sm text-destructive">
                {formState.fieldErrors.description[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload Image / PDF (optional)</Label>
            <Input
              id="file"
              name="file"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="mr-2" />
              Choose File
            </Button>
            {file && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted rounded-md">
                <FileText className="w-4 h-4" />
                <span>{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-auto"
                  onClick={() => {
                    setFile(null);
                    setFileDataUri(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto ml-auto bg-accent hover:bg-accent/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Send className="mr-2" />
                Check Compliance
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
