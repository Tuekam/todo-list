import type { GetTasksRepository, CreateTaskRepository, UpdateTaskRepository, DeleteTaskRepository } from "../interfaces/TaskRepository";
export interface DIContainer {
    getRepository: GetTasksRepository;
    createRepository: CreateTaskRepository;
    updateRepository: UpdateTaskRepository;
    deleteRepository: DeleteTaskRepository;
    taskUseCases: any;
}
export declare const DI_KEYS: {
    readonly GET_REPOSITORY: "getRepository";
    readonly CREATE_REPOSITORY: "createRepository";
    readonly UPDATE_REPOSITORY: "updateRepository";
    readonly DELETE_REPOSITORY: "deleteRepository";
    readonly TASK_USE_CASES: "taskUseCases";
};
//# sourceMappingURL=types.d.ts.map