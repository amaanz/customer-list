import { useState, useMemo, useCallback, useRef } from "react";
import { Customer, generateCustomers } from "@/utils/generateCustomers";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchBar } from "@/components/SearchBar";
import { FiltersDropdown } from "@/components/FiltersDropdown";
import { CustomersTable, SortConfig } from "@/components/CustomersTable";
import logo from "@/assets/doubletick-logo.png";

const TOTAL_CUSTOMERS = 1_000_000;
const PAGE_SIZE = 30;

const Index = () => {
  // Generate customers once and store in ref to avoid regeneration
  const allCustomersRef = useRef<Customer[]>([]);
  if (allCustomersRef.current.length === 0) {
    allCustomersRef.current = generateCustomers(TOTAL_CUSTOMERS);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Debounce search to avoid filtering on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return allCustomersRef.current;
    }

    const term = debouncedSearchTerm.toLowerCase();
    return allCustomersRef.current.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term)
    );
  }, [debouncedSearchTerm]);

  // Sort filtered customers
  const sortedCustomers = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return filteredCustomers;
    }

    const sorted = [...filteredCustomers];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      let comparison = 0;

      if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        // Check if it's a date string (for lastMessageAt)
        if (sortConfig.key === "lastMessageAt") {
          const dateA = new Date(aValue).getTime();
          const dateB = new Date(bValue).getTime();
          comparison = dateA - dateB;
        } else {
          comparison = aValue.localeCompare(bValue);
        }
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredCustomers, sortConfig]);

  // Slice for visible rows
  const visibleCustomers = useMemo(() => {
    return sortedCustomers.slice(0, visibleCount);
  }, [sortedCustomers, visibleCount]);

  const handleSort = useCallback((key: keyof Customer) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle direction: asc -> desc -> asc
        const newDirection = prev.direction === "asc" ? "desc" : "asc";
        return { key, direction: newDirection };
      }
      return { key, direction: "asc" };
    });
    // Reset visible count when sorting changes
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedCustomers.length));
  }, [sortedCustomers.length]);

  const hasMore = visibleCount < sortedCustomers.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <img src={logo} alt="DoubleTick" className="h-8" />
              <div>
                <h1 className="text-2xl font-bold">Customers</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage and browse your customer database
                </p>
              </div>
            </div>
            <FiltersDropdown />
          </div>
          <div className="mt-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              resultCount={sortedCustomers.length}
              totalCount={TOTAL_CUSTOMERS}
            />
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="container mx-auto px-6 py-6 flex-1 flex flex-col">
        <CustomersTable
          customers={visibleCustomers}
          sortConfig={sortConfig}
          onSort={handleSort}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </main>
    </div>
  );
};

export default Index;
