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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const initialState: FormState = {};

type SavedReport = GenerateComplianceReportOutput & {
  id: string;
  productName: string;
  savedAt: string;
};

const exampleProducts = [
  {
    value: "helmet",
    label: "Motorcycle Helmet",
    name: "RiderSafe Pro Helmet",
    description:
      "A high-impact polycarbonate shell helmet for motorcycle riders. Features include a multi-density EPS liner, an advanced ventilation system, and a scratch-resistant visor. Certified for safety and comfort.",
  },
  {
    value: "charger",
    label: "Mobile Charger",
    name: "QuickCharge 20W Adapter",
    description:
      "A 20W USB-C mobile charger. Provides fast charging for compatible devices. Input: 100-240V AC, 50/60Hz. Output: 5V-3A / 9V-2.22A. Made with fire-resistant materials and features over-current protection.",
  },
  {
    value: "toy",
    label: "Children's Toy",
    name: "FunBlocks Building Set",
    description:
      "A set of colorful building blocks for children aged 3 and up. Made from non-toxic, lead-free ABS plastic. No sharp edges. Complies with toy safety standards for physical and mechanical properties.",
  },
  {
    value: "cement",
    label: "Cement",
    name: "BuildStrong OPC 33 Cement",
    description:
      "Ordinary Portland Cement, 33 Grade. Suitable for general construction purposes. Setting time: Initial 30 mins, Final 600 mins. Compressive strength meets IS 269 standards.",
  },
  {
    value: "water",
    label: "Packaged Water",
    name: "AquaPure Packaged Drinking Water",
    description:
      "1-liter packaged drinking water bottle. pH value: 7.2. Total Dissolved Solids (TDS): 150 mg/L. Treated through reverse osmosis and UV sterilization. Packaged in a sealed, tamper-proof PET bottle.",
  },
  {
    value: "led",
    label: "LED Bulb",
    name: "BrightGlow 9W LED Bulb",
    description:
      "A 9-watt self-ballasted LED lamp for general lighting. Luminous efficacy: 90 lm/W. Color Rendering Index (CRI): >80. Rated voltage: 220-240V AC. Lifespan: 15,000 hours.",
  },
];

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
  const [description, setDescription] = useState("");
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
      formData.set("fileDataUri", fileDataUri);
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

  const handleExampleSelect = (value: string) => {
    const example = exampleProducts.find((p) => p.value === value);
    if (example) {
      setProductName(example.name);
      setDescription(example.description);
    }
  };
  
  const handleGoBack = () => {
    setReport(null);
    formRef.current?.reset();
    setFile(null);
    setFileDataUri(null);
    setProductName("");
    setDescription("");
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
        <input type="hidden" name="fileDataUri" value={fileDataUri || ""} />
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Start with an Example</Label>
            <Select onValueChange={handleExampleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product type..." />
              </SelectTrigger>
              <SelectContent>
                {exampleProducts.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              placeholder="e.g., Helmet, Charger, Toy"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
              placeholder="Provide as much detail as possible about your product, including materials, features, ratings, and any existing certifications."
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
