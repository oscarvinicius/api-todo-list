import "dotenv/config";
import "./controllers/utils/YupMessages";
import { AppDataSource } from "./data-source";
import { server } from "./server/server";

AppDataSource.initialize()
  .then(async () => {
    /*
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );*/

    server.listen(process.env.SERVER_PORT, () => {
      console.log("Rodando na porta " + process.env.SERVER_PORT);
    });
  })
  .catch((error) => console.log(error));
