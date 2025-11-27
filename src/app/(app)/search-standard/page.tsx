"use client";

import { useState } from "react";
import { standards } from "@/lib/standards";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Search as SearchIcon } from "lucide-react";

export default function SearchStandardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStandards = standards.filter(
    (standard) =>
      standard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      standard.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      standard.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredStandards.map((standard) => (
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
        {filteredStandards.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-10">
            No standards found for "{searchTerm}".
          </p>
        )}
      </div>
    </div>
  );
}
