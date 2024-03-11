import * as create from "./create";
import * as list from "./list";
import * as show from "./show";
import * as update from "./update";
import * as remove from "./remove";

export const TodosController = {
  ...create,
  ...list,
  ...show,
  ...update,
  ...remove,
};
