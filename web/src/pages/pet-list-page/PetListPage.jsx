import {
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import PageHeader from '../../components/header/PageHeader';
import { useEffect, useState } from 'react';
import { addPet, getPets } from '../../api';
import { useNavigate } from 'react-router-dom';
import AddPetDialog from './AddPetDialog';

const PetListPage = () => {
  const [petList, setPetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const getPetList = async () => {
    try {
      setIsLoading(true);
      const { data } = await getPets();
      setPetList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPetList();
  }, []);

  const onDialogClose = () => setIsDialogOpen(false);

  const handleAddPet = async (body) => {
    try {
      const response = await addPet({
        name: body.name,
        dob: body.date,
        client_email: body.email,
      });

      setPetList((prev) => [
        ...prev,
        {
          client_email: body.email,
          id: response.insertId,
          name: body.name,
          dob: body.date,
        },
      ]);

      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const PetCard = (petData) => {
    return (
      <>
        <CardContent>
          <Typography variant="h4">{petData.name}</Typography>
          <Typography paragraph>{petData.dob}</Typography>
          <Typography paragraph>{petData.client_email}</Typography>
        </CardContent>
        <Stack spacing={1} alignItems="center">
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={() =>
              navigate(`/healthLogs/${petData.id}`, {
                state: {
                  name: petData.name,
                },
              })
            }
          >
            View Log
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={() =>
              navigate(`/prescriptions/${petData.id}`, {
                state: {
                  name: petData.name,
                },
              })
            }
          >
            View Prescriptions
          </Button>
          <Button variant="outlined" disabled={isLoading}>
            Delete
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      <PageHeader title="Pet List">
        <Button
          variant="contained"
          size="medium"
          onClick={() => setIsDialogOpen(true)}
        >
          Add Pet
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}
      <Grid
        container
        spacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
        textAlign="center"
      >
        {petList.map((pet) => (
          <Grid key={pet.id} item xs={4} sm={4} md={4}>
            <Card key={pet.id} variant="outlined">
              {PetCard(pet)}
            </Card>
          </Grid>
        ))}
      </Grid>
      {isDialogOpen && (
        <AddPetDialog
          loading={isLoading}
          open={isDialogOpen}
          onClose={onDialogClose}
          onSave={handleAddPet}
        ></AddPetDialog>
      )}
    </>
  );
};

export default PetListPage;
