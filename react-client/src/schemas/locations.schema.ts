import { z } from "zod";

export const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const StateSchema = z.object({
  id: z.string(),
  name: z.string(),
  cities: z.array(CitySchema),
});

export const CountrySchema = z.object({
  id: z.string(),
  name: z.string(),
  states: z.array(StateSchema),
});

export const LocationTreeSchema = z.array(CountrySchema);
export const LocationDataSchema = z.object({
  locationTree: LocationTreeSchema,
});

export type LocationTreeResponse = z.infer<typeof LocationDataSchema>;

export type City = z.infer<typeof CitySchema>;
export type State = z.infer<typeof StateSchema>;
export type Country = z.infer<typeof CountrySchema>;

export interface LocationTreeProps {
  data: Country[];
  onSelect?: (type: "country" | "state" | "city", id: string) => void;
}

export const CountriesOptionsSchema = z.object({
  countries: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type CountriesResponse = z.infer<typeof CountriesOptionsSchema>;

export const StatesOptionsSchema = z.object({
  states: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type StatesResponse = z.infer<typeof StatesOptionsSchema>;

export const CitiesOptionsSchema = z.object({
  cities: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type CitiesResponse = z.infer<typeof CitiesOptionsSchema>;
