import { useCallback, useState } from "react";
import { AttachmentType } from "../../../types";

type AttachmentImageFieldProps = {
  id: string,
  path: string,
  imagSize: {
    width: number;
    height: number;
  },
}

const AttachmentImageField = ({ id, imagSize, path }: AttachmentImageFieldProps) => {
  const [isLightboxOpen, setLightboxOpen] = useState(false)
  const handleOpenLightbox = useCallback(() => setLightboxOpen(true), [])
  const handleCloseLightbox = useCallback(
    () => setLightboxOpen(false),
    [],
  )

  return (
    <>
      <div className="inline-block m-[0.6vw]">
        <img
          src={path}
          alt={id}
          style={{ 
            width: imagSize.width, 
            height: imagSize.height,
            maxWidth: '42em',
            maxHeight: '15em'
          }}
          className="cursor-pointer"
          onClick={handleOpenLightbox}
        />
      </div>
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={handleCloseLightbox}>
          <div className="bg-background border-2 border-border rounded-lg shadow-24 p-4">
            <img
              src={path}
              alt={id}
              style={{ 
                maxWidth: '50vh', 
                maxHeight: '50vh'
              }}
              className="cursor-pointer"
              onClick={handleCloseLightbox}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AttachmentImageField;
