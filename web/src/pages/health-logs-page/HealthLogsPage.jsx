import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageHeader from '../../components/header/PageHeader';
import {
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { createLogs, getLogs } from '../../api';
import AddLogDialog from './AddLogDialog';

const HealthLogsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getPetLogs = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getLogs(id);

      setLogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPetLogs(id);
  }, [id]);

  const handleCreateLog = async (body) => {
    setIsLoading(true);
    try {
      const response = await createLogs({
        pet_id: id,
        description: body.description,
        status: body.status,
      });

      setLogs((prev) => [
        ...prev,
        {
          id: response.insertId,
          pet_id: id,
          description: body.description,
          status: body.status,
        },
      ]);

      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={`${state.name} logs`}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => setIsDialogOpen(true)}
        >
          Add Log
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}
      <Grid
        container
        spacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
        textAlign="center"
      >
        {logs.map((log, index) => (
          <Grid key={log.id} item xs={4} sm={4} md={4}>
            <Card key={`${log.id}_${index}`} variant="outlined">
              <CardContent>
                <Typography variant="h4">{log.status}</Typography>
                <Typography paragraph>{log.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isDialogOpen && (
        <AddLogDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          loading={isLoading}
          onSave={(body) => handleCreateLog(body)}
        />
      )}
    </>
  );
};

export default HealthLogsPage;
