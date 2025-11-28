import { useRef, useEffect } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Customer } from "@/utils/generateCustomers";
import userIcon from "@/assets/icon-user.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type SortConfig = {
  key: keyof Customer | null;
  direction: "asc" | "desc" | null;
};

interface CustomersTableProps {
  customers: Customer[];
  sortConfig: SortConfig;
  onSort: (key: keyof Customer) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function CustomersTable({
  customers,
  sortConfig,
  onSort,
  onLoadMore,
  hasMore,
}: CustomersTableProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  const getSortIcon = (key: keyof Customer) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div
      ref={tableContainerRef}
      className="flex-1 overflow-auto border border-border rounded-lg bg-card"
    >
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-table-header z-10 border-b border-table-border">
          <tr>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground w-12">
              <Checkbox />
            </th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">
              Customer
            </th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">
              Score
            </th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">
              Email
            </th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">
              Last message sent at
            </th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">
              Added by
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-table-border hover:bg-table-hover transition-colors"
            >
              <td className="p-4">
                <Checkbox />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={customer.avatar || userIcon}
                      alt={customer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = userIcon;
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{customer.name}</span>
                    <span className="text-sm text-muted-foreground">{customer.phone}</span>
                  </div>
                </div>
              </td>
              <td className="p-4 text-foreground">{customer.score}</td>
              <td className="p-4 text-muted-foreground">{customer.email}</td>
              <td className="p-4 text-sm text-muted-foreground">
                {formatDate(customer.lastMessageAt)}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <img src={userIcon} alt="" className="w-4 h-4" />
                  <span>{customer.addedBy}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <div ref={loadMoreRef} className="p-4 text-center text-muted-foreground">
          Loading more...
        </div>
      )}
    </div>
  );
}
