import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  categoryTaxonomy,
  type CategoryGroup,
  type CategoryKey,
} from "../../consts/categoryTaxonomy";

export type ActiveFilters = Partial<Record<CategoryGroup["id"], Set<CategoryKey>>>;

const selectSx = {
  width: 220,
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2e2e2e" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#00ffff" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#00ffff" },
  "& .MuiInputLabel-root": { color: "#9ca3af" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#00ffff" },
  "& .MuiSvgIcon-root": { color: "#9ca3af" },
  "& .MuiSelect-select": {
    color: "#fff",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingRight: "32px !important",
  },
};

const menuProps = {
  slotProps: {
    paper: {
      sx: {
        bgcolor: "#141414",
        border: "1px solid #2e2e2e",
        maxHeight: 320,
        "& .MuiMenuItem-root": { color: "#fff" },
        "& .MuiMenuItem-root:hover": { bgcolor: "rgba(0,255,255,0.08)" },
        "& .MuiMenuItem-root.Mui-selected": { bgcolor: "rgba(0,255,255,0.12)" },
        "& .MuiMenuItem-root.Mui-selected:hover": { bgcolor: "rgba(0,255,255,0.18)" },
      },
    },
  },
};

interface CategoryFilterBarProps {
  activeFilters: ActiveFilters;
  onChange: (groupId: CategoryGroup["id"], values: CategoryKey[]) => void;
}

// Não renderiza wrapper próprio — os FormControls entram direto na linha flex
// que a página (Projetos/index.tsx) controla, junto do campo de busca.
const CategoryFilterBar = ({ activeFilters, onChange }: CategoryFilterBarProps) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      {categoryTaxonomy.map((group) => {
        const selected = activeFilters[group.id] ?? new Set<CategoryKey>();
        const selectedValues = Array.from(selected);
        const labelId = `${group.id}-select-label`;
        const groupLabel = t(group.labelKey);

        if (group.mode === "single") {
          const currentValue = selectedValues[0] ?? "todos";

          const handleSingleChange = (event: SelectChangeEvent) => {
            const value = event.target.value as CategoryKey;
            onChange(group.id, value === "todos" ? [] : [value]);
          };

          return (
            <FormControl key={group.id} sx={selectSx} size="small">
              <InputLabel id={labelId}>{groupLabel}</InputLabel>
              <Select
                labelId={labelId}
                value={currentValue}
                onChange={handleSingleChange}
                input={<OutlinedInput label={groupLabel} />}
                renderValue={(value) =>
                  t(group.items.find((i) => i.key === value)?.labelKey ?? String(value))
                }
                MenuProps={menuProps}
              >
                {group.items.map((item) => {
                  const isActive = currentValue === item.key;
                  const Icon = isActive ? RadioButtonCheckedIcon : RadioButtonUncheckedIcon;
                  return (
                    <MenuItem key={item.key} value={item.key}>
                      <Icon
                        fontSize="small"
                        style={{ marginRight: 8, color: isActive ? item.color : "#5b5b5b" }}
                      />
                      <ListItemText primary={t(item.labelKey)} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }

        const handleMultiChange = (event: SelectChangeEvent<CategoryKey[]>) => {
          const { value } = event.target;
          const values = typeof value === "string" ? (value.split(",") as CategoryKey[]) : value;
          onChange(group.id, values);
        };

        const renderValue = (values: CategoryKey[]) => {
          if (values.length === 0) return t("project.categories.todos");
          if (values.length <= 2) {
            return values
              .map((key) => t(group.items.find((i) => i.key === key)?.labelKey ?? key))
              .join(", ");
          }
          return `${values.length} selecionadas`;
        };

        return (
          <FormControl key={group.id} sx={selectSx} size="small">
            <InputLabel id={labelId}>{groupLabel}</InputLabel>
            <Select
              labelId={labelId}
              multiple
              value={selectedValues}
              onChange={handleMultiChange}
              input={<OutlinedInput label={groupLabel} />}
              renderValue={renderValue}
              MenuProps={menuProps}
            >
              {group.items.map((item) => {
                const isActive = selected.has(item.key);
                const Icon = isActive ? CheckBoxIcon : CheckBoxOutlineBlankIcon;
                return (
                  <MenuItem key={item.key} value={item.key}>
                    <Icon
                      fontSize="small"
                      style={{ marginRight: 8, color: isActive ? item.color : "#5b5b5b" }}
                    />
                    <ListItemText primary={t(item.labelKey)} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      })}
    </Fragment>
  );
};

export default CategoryFilterBar;