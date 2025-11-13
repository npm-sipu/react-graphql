import { Country } from "../models/Country";
import { State } from "../models/State";
import { City } from "../models/City";
import { User } from "../models/User";
import mongoose from "mongoose";

// Helper function to convert _id -> id for all documents
const transformId = (doc: any) => {
  if (!doc) return doc;
  const id = doc._id ? doc._id.toString() : undefined;
  const { _id, ...rest } = doc;
  return { id, ...rest };
};

export const rootValue = {
  // 🟢 Get all countries
  countries: async () => {
    const countries = await Country.find().lean();
    return countries.map(transformId);
  },

  // 🟢 Get states by country
  states: async ({ countryId }: { countryId: string }) => {
    const states = await State.find({ country: countryId }).lean();
    return states.map(transformId);
  },

  // 🟢 Get cities by state
  cities: async ({ stateId }: { stateId: string }) => {
    const cities = await City.find({ state: stateId }).lean();
    return cities.map(transformId);
  },

  // 🟢 Get all users (with optional filters)
  users: async ({
    countryId,
    stateId,
    cityId,
  }: {
    countryId?: string;
    stateId?: string;
    cityId?: string;
  }) => {
    const filter: any = {};
    if (countryId) filter.country = countryId;
    if (stateId) filter.state = stateId;
    if (cityId) filter.city = cityId;

    const users = await User.find(filter)
      .populate("country")
      .populate("state")
      .populate("city")
      .lean();

    return users.map((u: any) => ({
      ...transformId(u),
      country: transformId(u.country),
      state: transformId(u.state),
      city: transformId(u.city),
    }));
  },

  // 🟢 Get single user by ID
  user: async ({ id }: { id: string }) => {
    if (!mongoose.isValidObjectId(id)) return null;

    const u = await User.findById(id)
      .populate("country")
      .populate("state")
      .populate("city")
      .lean();

    if (!u) return null;

    return {
      ...transformId(u),
      country: transformId(u.country),
      state: transformId(u.state),
      city: transformId(u.city),
    };
  },

  // 🟢 Create new user
  createUser: async ({ input }: { input: any }) => {
    const existing = await User.findOne({ email: input.email });
    if (existing) {
      throw new Error("Email already in use");
    }

    const newUser = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      dob: input.dob,
      country: input.countryId,
      state: input.stateId,
      city: input.cityId,
      role: input.role,
      createdAt: new Date().toISOString(),
    });

    const u = await User.findById(newUser._id)
      .populate("country")
      .populate("state")
      .populate("city")
      .lean();

    return {
      ...transformId(u),
      country: transformId(u?.country),
      state: transformId(u?.state),
      city: transformId(u?.city),
    };
  },
};
