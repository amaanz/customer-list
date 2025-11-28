import { Button } from "@/components/ui/button";
import filterIcon from "@/assets/icon-filter.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FiltersDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default">
          <img src={filterIcon} alt="" className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>
          Score: 0-25 (Low)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Score: 26-50 (Medium)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Score: 51-75 (High)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Score: 76-100 (Very High)
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>
          Last contacted: Last 7 days
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Last contacted: Last 30 days
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Last contacted: Last 90 days
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
