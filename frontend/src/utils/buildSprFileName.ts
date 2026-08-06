import { format } from "date-fns";
import type { DocumentKind } from "@/utils/cloudinaryUpload";

const TYPE_BY_DOCUMENT: Record<DocumentKind, string> = {
  spr: "spr",
  levelCheck: "level_check",
};

/** Strip characters that are awkward in downloads / Cloudinary display names. */
const sanitizeName = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\u0080-\uFFFF-]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

/**
 * Document file base name: teacher-student-type-yyyy-MM-dd-HH:mm (24-hour).
 * Example: Alice-Bob-spr-2026-08-06-17:53
 */
export function buildDocumentFileName(
  teacherName: string,
  studentName: string,
  documentKind: DocumentKind,
  date: Date = new Date()
): string {
  const teacher = sanitizeName(teacherName) || "teacher";
  const student = sanitizeName(studentName) || "student";
  const type = TYPE_BY_DOCUMENT[documentKind];
  const stamp = format(date, "yyyy-MM-dd-HH:mm");
  return `${teacher}-${student}-${type}-${stamp}`;
}
