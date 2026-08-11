import { getTaskUseCases } from "@/lib/services";

export async function GET(request: Request) {
  try {
    const taskUseCases = await getTaskUseCases();
    const { searchParams } = new URL(request.url);

    const filters = {
      completed: searchParams.get("completed") === "true" ? true
        : searchParams.get("completed") === "false" ? false : undefined,
      search: searchParams.get("search") || undefined,
      sort: searchParams.get("sort") || undefined,
      direction: searchParams.get("direction") as "asc" | "desc" || "asc",
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
      lastDocId: searchParams.get("lastDocId") || undefined,
    };

    const result = await taskUseCases.getTasks(filters);
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return Response.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const taskUseCases = await getTaskUseCases();
    const body = await request.json();
    const task = await taskUseCases.createTask(body.title, body.category);
    return Response.json(task, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return Response.json({ message }, { status: 500 });
  }
}