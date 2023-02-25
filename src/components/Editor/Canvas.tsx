import { downloadFile } from "../../api";
import useSWR from "swr";
import { createRef, useEffect } from "react";
import styled from "styled-components";

type Props = {
  fileId: string;
};

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Canvas = (props: Props) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const { data, isLoading } = useSWR(props.fileId, downloadFile);

  useEffect(() => {
    if (data) {
      createImageBitmap(data).then((img) => {
        canvasRef.current?.setAttribute("width", `${img.width}`);
        canvasRef.current?.setAttribute("height", `${img.height}`);
        canvasRef.current?.getContext("2d")?.drawImage(img, 0, 0);
      });
    }
  }, [data]);

  if (isLoading) {
    return <h4>Loading image...</h4>;
  }

  return (
    <Container>
      <canvas ref={canvasRef} />
    </Container>
  );
};

export default Canvas;
