import { listFolders } from "../../api";
import useSWR from "swr";
import { FileMetadataT } from "../../types/file";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  onChange: (fileId: string) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FileSelect = (props: Props) => {
  const [selectedFileId, setSelectedFileId] = useState<string | undefined>(undefined);
  const { data, isLoading } = useSWR("listFolder", listFolders);

  const files =
    (data?.entries?.filter((entry) => entry[".tag"] === "file") as FileMetadataT[]) || [];

  // Automatically select the first file on initial fetch.
  useEffect(() => {
    !selectedFileId && setSelectedFileId(files[0]?.id);
  }, [files]);

  useEffect(() => {
    selectedFileId && props.onChange(selectedFileId);
  }, [selectedFileId]);

  return (
    <Container>
      <h4 style={{ marginBottom: 8 }}>Select image</h4>
      <select onChange={(e) => setSelectedFileId(e.currentTarget.value)} disabled={isLoading}>
        {files.map((file) => (
          <option value={file.id} key={file.id}>
            {file.name}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default FileSelect;
