/* eslint-disable class-methods-use-this */
import { database } from "./fb_init/initialFB";
import { TaskType } from "../types/taskType";

interface GetDataType {
  [id: string]: TaskType
}

export interface CRUDType {
  getData(): Promise<GetDataType | string>;

  createData(creatingObject: TaskType): Promise<string>;

  deleteData(id: number): Promise<string>;

  updateData(updatingObject: TaskType): Promise<string>;
}


export class Crud implements CRUDType {
  async getData(): Promise<GetDataType | string> {
    const dbref = database.ref(database.db);
    return database
      .get(database.child(dbref, `tasks/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return `some problem with request data`;
      })
      .catch((error) => error);
  }

  async createData(creatingObject: TaskType): Promise<string> {
    return database
      .set(
        database.ref(database.db, `tasks/${creatingObject.id}`),
        creatingObject
      )
      .then(() => creatingObject)
      .catch((error) => error);
  }

  async deleteData(id: number): Promise<string> {
    return database
      .set(database.ref(database.db, `tasks/${id}`), null)
      .then(() => null)
      .catch((error) => error);
  }

  async updateData(updatingObject: TaskType): Promise<string> {
    return database
      .update(
        database.ref(database.db, `tasks/${updatingObject.id}`),
        updatingObject
      )
      .then(() => updatingObject)
      .catch((error) => error);
  }
}
