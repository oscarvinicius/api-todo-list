import { Router } from "express";
import { TodosController } from "../controllers";
const router = Router();

router.get("/teste", (req, res) => {
  console.log("teste ok");
});

router.post("/", TodosController.create);

export { router };
