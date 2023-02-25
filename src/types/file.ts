import * as t from "io-ts";

const Metadata = t.type({
  id: t.string,
  name: t.string,
});

export const FileMetadata = t.intersection([
  Metadata,
  t.type({
    ".tag": t.keyof({ file: null }),
  }),
]);

export const FolderMetadata = t.intersection([
  Metadata,
  t.type({
    ".tag": t.keyof({ folder: null }),
  }),
]);

export const ListFolderResponse = t.type({
  cursor: t.string,
  has_more: t.boolean,
  entries: t.array(t.union([FileMetadata, FolderMetadata])),
});

export type FileMetadataT = t.TypeOf<typeof FileMetadata>;
export type FolderMetadataT = t.TypeOf<typeof FolderMetadata>;
export type ListFolderResponseT = t.TypeOf<typeof ListFolderResponse>;
