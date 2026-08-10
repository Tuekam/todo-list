import { 
  Task, 
  TaskFilters, 
  TaskResult, 
  TaskUseCase,
  GetTasksRepository,
  CreateTaskRepository,
  UpdateTaskRepository, 
  DeleteTaskRepository 
} from "core";

export class TaskUseCaseImpl implements TaskUseCase {
  private getRepository: GetTasksRepository;
  private createRepository: CreateTaskRepository;
  private updateRepository: UpdateTaskRepository;
  private deleteRepository: DeleteTaskRepository;

  constructor({
    getRepository,
    createRepository,
    updateRepository,
    deleteRepository,
  }: {
    getRepository: GetTasksRepository;
    createRepository: CreateTaskRepository;
    updateRepository: UpdateTaskRepository;
    deleteRepository: DeleteTaskRepository;
  }) {
    this.getRepository = getRepository;
    this.createRepository = createRepository;
    this.updateRepository = updateRepository;
    this.deleteRepository = deleteRepository;
  }

  async getTasks(filters?: TaskFilters): Promise<TaskResult> {
    return this.getRepository.getAll(filters);
  }

  async createTask(title: string, category?: string): Promise<Task> {
    if (!title || title.trim() === "") {
      throw new Error("Le titre est obligatoire");
    }

    return this.createRepository.create({
      title: title.trim(),
      completed: false,
      category: category as "study" | "work" | "personal",
    });
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    if (!id) throw new Error("ID requis");
    return this.updateRepository.update(id, data);
  }

  async deleteTask(id: string): Promise<void> {
    if (!id) throw new Error("ID requis");
    return this.deleteRepository.delete(id);
  }
}