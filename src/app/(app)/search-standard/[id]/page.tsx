import { getStandardById } from "@/lib/standards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ListChecks } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default function StandardDetailsPage({ params }: Props) {
  const standard = getStandardById(params.id);

  if (!standard) {
    notFound();
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Standard Details</h1>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl text-primary">
                {standard.code}: {standard.title}
              </CardTitle>
              <p className="text-muted-foreground mt-1">{standard.category}</p>
            </div>
            <Button asChild className="w-full md:w-auto mt-4 md:mt-0">
              <Link href="/check-compliance">
                <ListChecks className="mr-2" />
                Check a Product
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <List className="mr-2" />
            Rules & Requirements
          </h3>
          <ul className="space-y-3">
            {standard.rules.map((rule, index) => (
              <li key={index} className="flex items-start">
                <div className="w-6 h-6 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <span className="text-foreground/90">{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
