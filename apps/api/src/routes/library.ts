import type { FastifyInstance } from "fastify";
import {
  getLibraryItemById,
  LIBRARY_CATALOG,
  LIBRARY_CATEGORIES,
  LIBRARY_COUNTS,
} from "@neuropi/shared";

export async function libraryRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    "/library",
    { preHandler: [app.authenticate] },
    async (request) => {
      const query = request.query as {
        categoryId?: string;
        type?: string;
        q?: string;
      };

      let items = [...LIBRARY_CATALOG];

      if (query.categoryId) {
        items = items.filter((i) => i.categoryId === query.categoryId);
      }
      if (query.type) {
        items = items.filter((i) => i.type === query.type);
      }
      if (query.q) {
        const q = query.q.toLowerCase();
        items = items.filter(
          (i) =>
            i.titleEs.toLowerCase().includes(q) ||
            i.summaryEs.toLowerCase().includes(q) ||
            i.tags.some((t) => t.toLowerCase().includes(q)),
        );
      }

      return {
        counts: LIBRARY_COUNTS,
        categories: LIBRARY_CATEGORIES,
        items: items.map((i) => ({
          id: i.id,
          type: i.type,
          categoryId: i.categoryId,
          titleEs: i.titleEs,
          titleEn: i.titleEn,
          summaryEs: i.summaryEs,
          durationMin: i.durationMin,
          tags: i.tags,
        })),
        clinicalNoteEs:
          "Contenidos educativos de Neuropi. No reemplazan evaluación ni tratamiento profesional.",
      };
    },
  );

  app.get(
    "/library/:id",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const item = getLibraryItemById(id);
      if (!item) {
        return reply.status(404).send({
          error: "not_found",
          message: "Contenido no encontrado en la biblioteca.",
        });
      }

      const category = LIBRARY_CATEGORIES.find((c) => c.id === item.categoryId);

      return {
        item,
        category: category ?? null,
        clinicalNoteEs:
          "Material de psicoeducación y apoyo. Orientación prudente: no diagnostica.",
      };
    },
  );
}
