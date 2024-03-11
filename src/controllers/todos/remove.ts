import { Request, Response } from "express";
import { Todo } from "../../entity/Todo";
import { AppDataSource } from "../../data-source";
import { successResponse } from "../utils/controller.utils";

export const remove = async (req: Request, res: Response) => {
  if (req.params.id == undefined) {
    return res.status(404);
  }

  let id = parseInt(req.params.id);
  let todo = await AppDataSource.manager.findOneBy(Todo, {
    id: id,
  });

  await AppDataSource.manager.remove(todo);

  return res.json(successResponse());
};
