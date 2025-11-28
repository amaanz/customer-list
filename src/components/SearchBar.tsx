import { Input } from "@/components/ui/input";
import searchIcon from "@/assets/icon-search.svg";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export function SearchBar({ value, onChange, resultCount, totalCount }: SearchBarProps) {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <img 
          src={searchIcon} 
          alt="" 
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40"
        />
        <Input
          type="text"
          placeholder="Search Customers"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
