"use client";

import { useState, useMemo } from "react";
import { standards, type Standard } from "@/lib/standards";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Search as SearchIcon } from "lucide-react";

export default function SearchStandardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedStandards = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (!lowerCaseSearchTerm) {
      // Sort all standards by code when search is empty
      return [...standards].sort((a, b) => a.code.localeCompare(b.code));
    }

    const getScore = (standard: Standard): number => {
      const lowerCode = standard.code.toLowerCase();
      const lowerTitle = standard.title.toLowerCase();
      const lowerCategory = standard.category.toLowerCase();

      if (lowerCode === lowerCaseSearchTerm) return 10;
      if (lowerCode.startsWith(lowerCaseSearchTerm)) return 9;
      if (lowerCode.includes(lowerCaseSearchTerm)) return 8;

      if (lowerTitle.startsWith(lowerCaseSearchTerm)) return 7;
      if (lowerTitle.includes(lowerCaseSearchTerm)) return 6;
      
      if (lowerCategory.startsWith(lowerCaseSearchTerm)) return 5;
      if (lowerCategory.includes(lowerCaseSearchTerm)) return 4;
      
      return 0;
    };

    return standards
      .map(standard => ({ standard, score: getScore(standard) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.standard);

  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Search BIS Standard</h1>
      <p className="text-muted-foreground mb-8">
        Enter a product, category, or standard code (e.g., Charger, Cement, IS
        9873).
      </p>

      <div className="mb-8 relative max-w-lg">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for a standard..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedStandards.map((standard) => (
          <Link
            href={`/search-standard/${standard.id}`}
            key={standard.id}
            className="block group"
          >
            <Card className="h-full hover:border-primary hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex justify-between items-start text-lg">
                  <span className="text-primary">{standard.code}</span>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="font-semibold">{standard.category}</p>
                 <p className="text-sm text-muted-foreground mt-1">{standard.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredAndSortedStandards.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-10">
            No standards found for "{searchTerm}".
          </p>
        )}
      </div>
    </div>
  );
}
