import { useRecordContext } from "react-admin";
import { Card, CardMedia, Modal } from "@mui/material";
import { useCallback, useState } from "react";
import { AttachmentType } from "../../types";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

type AttachmentImageFieldProps = {
  imagSize: {
    width: number;
    height: number;
  },
}

const AttachmentImageField = (props: AttachmentImageFieldProps) => {
  const { imagSize } = props
  const record = useRecordContext<AttachmentType>();
  const [isLightboxOpen, setLightboxOpen] = useState(false)
  if (!record) return null;
  const handleOpenLightbox = useCallback(() => setLightboxOpen(true), [])
  const handleCloseLightbox = useCallback(
    () => setLightboxOpen(false),
    [],
  )

  const imagePath = record.path;
  return (
    <>
      <Card sx={{ display: 'inline-block', margin: '0.6vw' }}>
        <CardMedia
          component="img"
          image={imagePath}
          width={imagSize.width}
          height={imagSize.height}
          alt={record.id}
          sx={{ maxWidth: '42em', maxHeight: '15em' }}
          onClick={handleOpenLightbox}
        />
      </Card>
      {
        isLightboxOpen && (
          <Modal
            open={isLightboxOpen}
            onClose={handleCloseLightbox}
          >
            <Card sx={style}>
              <CardMedia
                component="img"
                image={imagePath}
                alt={record.id}
                sx={{ maxWidth: '50vh', maxHeight: '50vh' }}
                onClick={handleCloseLightbox}
              />
            </Card>
          </Modal>
        )
      }
    </>
  );
};

export default AttachmentImageField;