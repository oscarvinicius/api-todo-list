import { Router } from "express";
import { TodosController } from "../controllers";
const router = Router();

router.get("/todos", TodosController.list);
router.get("/todos/:id", TodosController.show);
router.post("/todos", TodosController.create);
router.put("/todos/:id", TodosController.update);
router.delete("/todos/:id", TodosController.remove);

export { router };
