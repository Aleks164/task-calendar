/* eslint-disable class-methods-use-this */
import { database } from "./memory/initialFB";
import {TaskType } from "../taskCreator/types/taskType";

export interface CRUDType {
  getData(id: number): Promise<TaskType | string>;

  createData(creatingObject: TaskType): Promise<string>;

  deleteData(id: number): Promise<string>;

  updateData(updatingObject: TaskType): Promise<string>;
}

export class Crud implements CRUDType {
  async getData(id?: number): Promise<TaskType | string> {
    const dbref = database.ref(database.db);
    return database
      .get(database.child(dbref, `tasks/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return `object with id= not found`;
      })
      .catch((error) => {
        return error;
      });
  }

  async createData(creatingObject: TaskType): Promise<string> {
    return database
      .set(
        database.ref(database.db, `tasks/${creatingObject.id}`),
        creatingObject
      )
      .then(() => {
        return creatingObject;
      })
      .catch((error) => {
        return error;
      });
  }

  async deleteData(id: number): Promise<string> {
    return database
      .set(database.ref(database.db, `tasks/${id}`), null)
      .then(() => {
        return null;
      })
      .catch((error) => {
        return error;
      });
  }

  async updateData(updatingObject: TaskType): Promise<string> {
    return database
      .update(
        database.ref(database.db, `tasks/${updatingObject.id}`),
        updatingObject
      )
      .then(() => {
        return updatingObject;
      })
      .catch((error) => {
        return error;
      });
  }
}
