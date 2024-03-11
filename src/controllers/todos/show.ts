import { Request, Response } from "express";
import { Todo } from "../../entity/Todo";
import { AppDataSource } from "../../data-source";
import { failResponse, successResponse } from "../utils/controller.utils";

export const show = async (req: Request, res: Response) => {
  if (req.params.id == undefined) {
    return res.status(404).json();
  }

  let id = parseInt(req.params.id);
  let todo = await AppDataSource.manager.findOneBy(Todo, {
    id: id,
  });

  if (todo == undefined) {
    return res.status(404).json();
  }

  return res.json(successResponse(todo));
};
