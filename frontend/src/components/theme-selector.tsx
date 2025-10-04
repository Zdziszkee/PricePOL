"use client";

import { useThemeConfig } from "@/components/active-theme";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_THEMES = [
  {
    name: "Default",
    value: "default",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Rose",
    value: "rose",
  },
  {
    name: "Violet",
    value: "violet",
  },
];

const SCALED_THEMES = [
  {
    name: "Default Scaled",
    value: "default-scaled",
  },
  {
    name: "Blue Scaled",
    value: "blue-scaled",
  },
  {
    name: "Mono Scaled",
    value: "mono-scaled",
  },
];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-select" className="text-sm font-medium">
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger id="theme-select" className="w-[180px]">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Standard Themes</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Scaled Themes</SelectLabel>
            {SCALED_THEMES.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
