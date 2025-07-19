import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  referenceFile: f({ image: { maxFileSize: "4MB" }, pdf: { maxFileSize: "8MB" } })
    .onUploadComplete(async ({ file }) => {
      // Optionally save file info to your DB here
      return { uploadedUrl: file.url };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
