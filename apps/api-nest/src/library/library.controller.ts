import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  getLibraryItemById,
  LIBRARY_CATALOG,
  LIBRARY_CATEGORIES,
  LIBRARY_COUNTS,
} from "@neuropi/shared";
import { DemoAuthGuard } from "../common/demo-auth.guard";

@Controller("library")
@UseGuards(DemoAuthGuard)
export class LibraryController {
  @Get()
  list(
    @Query("categoryId") categoryId?: string,
    @Query("type") type?: string,
    @Query("q") q?: string,
  ) {
    let items = [...LIBRARY_CATALOG];

    if (categoryId) {
      items = items.filter((i) => i.categoryId === categoryId);
    }
    if (type) {
      items = items.filter((i) => i.type === type);
    }
    if (q) {
      const needle = q.toLowerCase();
      items = items.filter(
        (i) =>
          i.titleEs.toLowerCase().includes(needle) ||
          i.summaryEs.toLowerCase().includes(needle) ||
          i.tags.some((t) => t.toLowerCase().includes(needle)),
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
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    const item = getLibraryItemById(id);
    if (!item) {
      throw new NotFoundException({
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
  }
}
