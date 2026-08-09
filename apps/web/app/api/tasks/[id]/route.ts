import { getTaskUseCases } from "@/lib/services";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const taskUseCases = await getTaskUseCases();
    const { id } = await params;
    const body = await request.json();
    const task = await taskUseCases.updateTask(id, body);
    return Response.json(task);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return Response.json({ message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const taskUseCases = await getTaskUseCases();
    const { id } = await params;
    await taskUseCases.deleteTask(id);
    return Response.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return Response.json({ message }, { status: 500 });
  }
}