import { useState } from "react";
import FileSelect from "./FileSelect";
import Canvas from "./Canvas";

const Editor = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | undefined>();

  return (
    <>
      <FileSelect onChange={setSelectedFileId} />
      {selectedFileId && <Canvas fileId={selectedFileId} />}
    </>
  );
};

export default Editor;
