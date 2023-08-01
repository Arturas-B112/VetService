import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

const AddLogDialog = ({ open, onClose, onSave, loading }) => {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={!loading ? onClose : undefined}
      >
        <DialogTitle>Add new log</DialogTitle>
        <DialogContent>
          <Stack pt={2} spacing={2}>
            <TextField
              fullWidth
              label="Status"
              value={status}
              disabled={loading}
              onChange={(e) => setStatus(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              disabled={loading}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={!loading ? onClose : undefined}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            onClick={() => onSave({ status, description })}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddLogDialog;
