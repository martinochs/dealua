import { Suspense } from "react";
import { SearchBar } from "./SearchBar";

export function SearchBarWrapper({ defaultQuery }: { defaultQuery?: string }) {
  return (
    <Suspense fallback={null}>
      <SearchBar defaultQuery={defaultQuery} />
    </Suspense>
  );
}
