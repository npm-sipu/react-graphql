import { Country } from "../models/Country";
import { State } from "../models/State";
import { City } from "../models/City";
import { User } from "../models/User";
import mongoose from "mongoose";
import { transformId } from "../helpers/utils";

export const rootValue = {
  countries: async () => {
    const countries = await Country.find().lean();
    return countries.map(transformId);
  },

  states: async ({ countryId }: { countryId: string }) => {
    const states = await State.find({ country: countryId }).lean();
    return states.map(transformId);
  },

  cities: async ({ stateId }: { stateId: string }) => {
    const cities = await City.find({ state: stateId }).lean();
    return cities.map(transformId);
  },

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
  editUser: async ({ id, input }: { id: string; input: any }) => {
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid user ID");

    const existingUser = await User.findById(id);
    if (!existingUser) throw new Error("User not found");

    // Check if email already exists for another user
    if (input.email) {
      const emailUser = await User.findOne({
        email: input.email,
        _id: { $ne: id },
      });
      if (emailUser) throw new Error("Email already in use by another user");
    }

    // Update user fields dynamically
    const updatedData: any = {};
    const fields = [
      "firstName",
      "lastName",
      "email",
      "dob",
      "role",
      "countryId",
      "stateId",
      "cityId",
    ];

    fields.forEach((key) => {
      if (input[key]) {
        if (key === "countryId") updatedData.country = input.countryId;
        else if (key === "stateId") updatedData.state = input.stateId;
        else if (key === "cityId") updatedData.city = input.cityId;
        else updatedData[key] = input[key];
      }
    });

    await User.findByIdAndUpdate(id, updatedData);

    const u = await User.findById(id)
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
