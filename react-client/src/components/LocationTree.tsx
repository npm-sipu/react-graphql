import type { LocationTreeProps } from "../schemas/locations.schema";
import { SimpleTreeView } from "@mui/x-tree-view";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function LocationTree({ data, onSelect }: LocationTreeProps) {
  return (
    <SimpleTreeView defaultExpandedItems={["root"]}>
      {data.map((country) => (
        <TreeItem
          key={country.id}
          itemId={`country-${country.id}`}
          label={country.name}
          onClick={() => onSelect?.("country", country.id)}
        >
          {country.states?.map((state) => (
            <TreeItem
              key={state.id}
              itemId={`state-${state.id}`}
              label={state.name}
              onClick={() => onSelect?.("state", state.id)}
            >
              {state.cities?.map((city) => (
                <TreeItem
                  key={city.id}
                  itemId={`city-${city.id}`}
                  label={city.name}
                  onClick={() => onSelect?.("city", city.id)}
                />
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </SimpleTreeView>
  );
}
