import { useRef, useEffect } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { Customer } from "@/utils/generateCustomers";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <th className="text-left p-4 font-semibold text-sm">
              <Button
                variant="ghost"
                onClick={() => onSort("name")}
                className="hover:bg-transparent p-0 h-auto font-semibold"
              >
                Name
                {getSortIcon("name")}
              </Button>
            </th>
            <th className="text-left p-4 font-semibold text-sm">
              <Button
                variant="ghost"
                onClick={() => onSort("phone")}
                className="hover:bg-transparent p-0 h-auto font-semibold"
              >
                Phone
                {getSortIcon("phone")}
              </Button>
            </th>
            <th className="text-left p-4 font-semibold text-sm">
              <Button
                variant="ghost"
                onClick={() => onSort("email")}
                className="hover:bg-transparent p-0 h-auto font-semibold"
              >
                Email
                {getSortIcon("email")}
              </Button>
            </th>
            <th className="text-left p-4 font-semibold text-sm">
              <Button
                variant="ghost"
                onClick={() => onSort("score")}
                className="hover:bg-transparent p-0 h-auto font-semibold"
              >
                Score
                {getSortIcon("score")}
              </Button>
            </th>
            <th className="text-left p-4 font-semibold text-sm">
              <Button
                variant="ghost"
                onClick={() => onSort("lastMessageAt")}
                className="hover:bg-transparent p-0 h-auto font-semibold"
              >
                Last Message
                {getSortIcon("lastMessageAt")}
              </Button>
            </th>
            <th className="text-left p-4 font-semibold text-sm">
              <Button
                variant="ghost"
                onClick={() => onSort("addedBy")}
                className="hover:bg-transparent p-0 h-auto font-semibold"
              >
                Added By
                {getSortIcon("addedBy")}
              </Button>
            </th>
            <th className="text-right p-4 font-semibold text-sm w-16">
              Actions
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
                <div className="flex items-center gap-3">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{customer.name}</span>
                </div>
              </td>
              <td className="p-4 text-muted-foreground">{customer.phone}</td>
              <td className="p-4 text-muted-foreground">{customer.email}</td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.score >= 75
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : customer.score >= 50
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : customer.score >= 25
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {customer.score}
                </span>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {formatDate(customer.lastMessageAt)}
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {customer.addedBy}
              </td>
              <td className="p-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
