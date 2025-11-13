// import { connectDB } from "../db";
// import { Country } from "../models/Country";
// import { State } from "../models/State";
// import { City } from "../models/City";
// import { User } from "../models/User";

// const MONGO_URI =
//   process.env.MONGO_URI ||
//   "mongodb+srv://lockdownstories2021_db_user:qBYruqlShYL9RTB8@cluster0.aashsz2.mongodb.net/user_management?retryWrites=true&w=majority&appName=Cluster0";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// async function seed() {
//   await connectDB(MONGO_URI);

//   // clear existing
//   await User.deleteMany({});
//   await City.deleteMany({});
//   await State.deleteMany({});
//   await Country.deleteMany({});

//   // 5 countries, each 2 states, each 2 cities
//   const countriesData = [
//     { name: "India", code: "IN" },
//     { name: "Germany", code: "DE" },
//     { name: "Japan", code: "JP" },
//     { name: "USA", code: "US" },
//     { name: "Italy", code: "IT" },
//   ];

//   const createdCountries = [];
//   for (const c of countriesData) {
//     const doc = await Country.create(c);
//     createdCountries.push(doc);
//   }

//   const stateCityMapping: any = {};

//   // For each country create 2 states and 2 cities each
//   for (const country of createdCountries) {
//     const s1 = await State.create({
//       name: `${country.name} State A`,
//       country: country._id,
//     });
//     const s2 = await State.create({
//       name: `${country.name} State B`,
//       country: country._id,
//     });

//     const c11 = await City.create({ name: `${s1.name} City 1`, state: s1._id });
//     const c12 = await City.create({ name: `${s1.name} City 2`, state: s1._id });

//     const c21 = await City.create({ name: `${s2.name} City 1`, state: s2._id });
//     const c22 = await City.create({ name: `${s2.name} City 2`, state: s2._id });

//     stateCityMapping[country.name] = {
//       states: [s1, s2],
//       cities: [c11, c12, c21, c22],
//     };
//   }

//   // create ~12 users (spread across countries / cities)
//   const users = [
//     {
//       firstName: "Sujit",
//       lastName: "Bhatta",
//       email: "sujit@example.com",
//       country: createdCountries[0]._id,
//       state: stateCityMapping[createdCountries[0].name].states[0]._id,
//       city: stateCityMapping[createdCountries[0].name].cities[0]._id,
//       role: "Admin",
//     },
//     {
//       firstName: "Emma",
//       lastName: "Smith",
//       email: "emma@example.com",
//       country: createdCountries[1]._id,
//       state: stateCityMapping[createdCountries[1].name].states[0]._id,
//       city: stateCityMapping[createdCountries[1].name].cities[1]._id,
//       role: "User",
//     },
//     {
//       firstName: "Lukas",
//       lastName: "Meyer",
//       email: "lukas@example.com",
//       country: createdCountries[1]._id,
//       state: stateCityMapping[createdCountries[1].name].states[1]._id,
//       city: stateCityMapping[createdCountries[1].name].cities[2]._id,
//       role: "Moderator",
//     },
//     {
//       firstName: "Aisha",
//       lastName: "Khan",
//       email: "aisha@example.com",
//       country: createdCountries[0]._id,
//       state: stateCityMapping[createdCountries[0].name].states[1]._id,
//       city: stateCityMapping[createdCountries[0].name].cities[3]._id,
//       role: "User",
//     },
//     {
//       firstName: "Hiro",
//       lastName: "Tanaka",
//       email: "hiro@example.com",
//       country: createdCountries[2]._id,
//       state: stateCityMapping[createdCountries[2].name].states[0]._id,
//       city: stateCityMapping[createdCountries[2].name].cities[0]._id,
//       role: "Developer",
//     },
//     {
//       firstName: "Maria",
//       lastName: "Gonzales",
//       email: "maria@example.com",
//       country: createdCountries[3]._id,
//       state: stateCityMapping[createdCountries[3].name].states[0]._id,
//       city: stateCityMapping[createdCountries[3].name].cities[1]._id,
//       role: "Manager",
//     },
//     {
//       firstName: "James",
//       lastName: "Anderson",
//       email: "james@example.com",
//       country: createdCountries[3]._id,
//       state: stateCityMapping[createdCountries[3].name].states[1]._id,
//       city: stateCityMapping[createdCountries[3].name].cities[2]._id,
//       role: "Designer",
//     },
//     {
//       firstName: "Sofia",
//       lastName: "Rossi",
//       email: "sofia@example.com",
//       country: createdCountries[4]._id,
//       state: stateCityMapping[createdCountries[4].name].states[0]._id,
//       city: stateCityMapping[createdCountries[4].name].cities[0]._id,
//       role: "User",
//     },
//     {
//       firstName: "Ethan",
//       lastName: "Patel",
//       email: "ethan@example.com",
//       country: createdCountries[4]._id,
//       state: stateCityMapping[createdCountries[4].name].states[1]._id,
//       city: stateCityMapping[createdCountries[4].name].cities[3]._id,
//       role: "Tester",
//     },
//     {
//       firstName: "Nora",
//       lastName: "Muller",
//       email: "nora@example.com",
//       country: createdCountries[1]._id,
//       state: stateCityMapping[createdCountries[1].name].states[0]._id,
//       city: stateCityMapping[createdCountries[1].name].cities[0]._id,
//       role: "User",
//     },
//     {
//       firstName: "Liam",
//       lastName: "Chen",
//       email: "liam@example.com",
//       country: createdCountries[2]._id,
//       state: stateCityMapping[createdCountries[2].name].states[1]._id,
//       city: stateCityMapping[createdCountries[2].name].cities[3]._id,
//       role: "User",
//     },
//   ];

//   for (const u of users) {
//     await User.create({
//       ...u,
//       createdAt: new Date().toISOString(),
//     });
//     await delay(50);
//   }

//   console.log("✅ Seed complete");
//   process.exit(0);
// }

// seed().catch((err) => {
//   console.error("Seed error:", err);
//   process.exit(1);
// });

// seed.ts
import { connectDB } from "../db";
import { Country } from "../models/Country";
import { State } from "../models/State";
import { City } from "../models/City";
import { User } from "../models/User";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://lockdownstories2021_db_user:qBYruqlShYL9RTB8@cluster0.aashsz2.mongodb.net/user_management?retryWrites=true&w=majority&appName=Cluster0";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function seed() {
  await connectDB(MONGO_URI);

  console.log("🧹 Clearing old data...");
  await User.deleteMany({});
  await City.deleteMany({});
  await State.deleteMany({});
  await Country.deleteMany({});

  console.log("🌍 Seeding countries...");
  const countriesData = [
    { name: "India", code: "IN" },
    { name: "Germany", code: "DE" },
    { name: "Japan", code: "JP" },
    { name: "USA", code: "US" },
    { name: "Italy", code: "IT" },
  ];

  const createdCountries = [];
  for (const c of countriesData) {
    const doc = await Country.create(c);
    createdCountries.push(doc);
  }

  const stateCityMapping: Record<string, { states: any[]; cities: any[] }> = {};

  console.log("🏙️ Seeding states and cities...");

  // Realistic state and city data
  const geography = {
    India: {
      states: [
        { name: "Maharashtra", cities: ["Mumbai", "Pune"] },
        { name: "Karnataka", cities: ["Bengaluru", "Mysuru"] },
      ],
    },
    Germany: {
      states: [
        { name: "Bavaria", cities: ["Munich", "Nuremberg"] },
        { name: "Berlin", cities: ["Berlin", "Potsdam"] },
      ],
    },
    Japan: {
      states: [
        { name: "Tokyo Prefecture", cities: ["Tokyo", "Hachioji"] },
        { name: "Osaka Prefecture", cities: ["Osaka", "Sakai"] },
      ],
    },
    USA: {
      states: [
        { name: "California", cities: ["Los Angeles", "San Francisco"] },
        { name: "Texas", cities: ["Houston", "Austin"] },
      ],
    },
    Italy: {
      states: [
        { name: "Lombardy", cities: ["Milan", "Bergamo"] },
        { name: "Lazio", cities: ["Rome", "Frosinone"] },
      ],
    },
  };

  // Seed states & cities
  for (const country of createdCountries) {
    const geo = geography[country.name as keyof typeof geography];
    const states = [];
    const cities = [];

    for (const st of geo.states) {
      const stateDoc = await State.create({
        name: st.name,
        country: country._id,
      });
      states.push(stateDoc);

      for (const cityName of st.cities) {
        const cityDoc = await City.create({
          name: cityName,
          state: stateDoc._id,
        });
        cities.push(cityDoc);
      }
    }

    stateCityMapping[country.name] = { states, cities };
  }

  console.log("👤 Seeding users...");

  const users = [
    {
      firstName: "Sujit",
      lastName: "Bhatta",
      email: "sujit@example.com",
      dob: "1995-06-15",
      country: createdCountries[0]._id, // India
      state: stateCityMapping["India"].states[0]._id,
      city: stateCityMapping["India"].cities[0]._id,
      role: "Admin",
    },
    {
      firstName: "Emma",
      lastName: "Schmidt",
      email: "emma@example.com",
      dob: "1992-09-10",
      country: createdCountries[1]._id, // Germany
      state: stateCityMapping["Germany"].states[0]._id,
      city: stateCityMapping["Germany"].cities[1]._id,
      role: "User",
    },
    {
      firstName: "Lukas",
      lastName: "Meyer",
      email: "lukas@example.com",
      dob: "1990-03-22",
      country: createdCountries[1]._id,
      state: stateCityMapping["Germany"].states[1]._id,
      city: stateCityMapping["Germany"].cities[0]._id,
      role: "Moderator",
    },
    {
      firstName: "Aisha",
      lastName: "Khan",
      email: "aisha@example.com",
      dob: "1998-11-30",
      country: createdCountries[0]._id,
      state: stateCityMapping["India"].states[1]._id,
      city: stateCityMapping["India"].cities[3]._id,
      role: "User",
    },
    {
      firstName: "Hiro",
      lastName: "Tanaka",
      email: "hiro@example.com",
      dob: "1987-05-19",
      country: createdCountries[2]._id,
      state: stateCityMapping["Japan"].states[0]._id,
      city: stateCityMapping["Japan"].cities[0]._id,
      role: "Developer",
    },
    {
      firstName: "Maria",
      lastName: "Gonzales",
      email: "maria@example.com",
      dob: "1985-12-25",
      country: createdCountries[3]._id,
      state: stateCityMapping["USA"].states[0]._id,
      city: stateCityMapping["USA"].cities[1]._id,
      role: "Manager",
    },
    {
      firstName: "James",
      lastName: "Anderson",
      email: "james@example.com",
      dob: "1991-07-04",
      country: createdCountries[3]._id,
      state: stateCityMapping["USA"].states[1]._id,
      city:
        stateCityMapping["USA"].cities[2]?._id ||
        stateCityMapping["USA"].cities[0]._id,
      role: "Designer",
    },
    {
      firstName: "Sofia",
      lastName: "Rossi",
      email: "sofia@example.com",
      dob: "1996-10-12",
      country: createdCountries[4]._id,
      state: stateCityMapping["Italy"].states[0]._id,
      city: stateCityMapping["Italy"].cities[0]._id,
      role: "User",
    },
    {
      firstName: "Ethan",
      lastName: "Patel",
      email: "ethan@example.com",
      dob: "1993-04-09",
      country: createdCountries[4]._id,
      state: stateCityMapping["Italy"].states[1]._id,
      city: stateCityMapping["Italy"].cities[3]._id,
      role: "Tester",
    },
    {
      firstName: "Nora",
      lastName: "Müller",
      email: "nora@example.com",
      dob: "1997-01-17",
      country: createdCountries[1]._id,
      state: stateCityMapping["Germany"].states[0]._id,
      city: stateCityMapping["Germany"].cities[0]._id,
      role: "User",
    },
    {
      firstName: "Liam",
      lastName: "Chen",
      email: "liam@example.com",
      dob: "1994-08-05",
      country: createdCountries[2]._id,
      state: stateCityMapping["Japan"].states[1]._id,
      city: stateCityMapping["Japan"].cities[3]._id,
      role: "User",
    },
  ];

  for (const u of users) {
    await User.create(u);
    await delay(50);
  }

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
