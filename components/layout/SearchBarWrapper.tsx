import { Suspense } from "react";
import { SearchBar } from "./SearchBar";

interface SearchBarWrapperProps {
  defaultQuery?: string;
  variant?: "default" | "header";
  className?: string;
}

export function SearchBarWrapper({ defaultQuery, variant, className }: SearchBarWrapperProps) {
  return (
    <Suspense fallback={null}>
      <SearchBar defaultQuery={defaultQuery} variant={variant} className={className} />
    </Suspense>
  );
}
