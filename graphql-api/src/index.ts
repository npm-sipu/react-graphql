import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { rootValue } from "./graphql/resolvers";
import { connectDB } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://lockdownstories2021_db_user:qBYruqlShYL9RTB8@cluster0.aashsz2.mongodb.net/user_management?retryWrites=true&w=majority&appName=Cluster0";

connectDB(MONGO_URI).then(() => {
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true,
    })
  );

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 GraphQL server running at http://localhost:${PORT}/graphql`
    );
  });
});
