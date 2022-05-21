import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { supabase } from '@utils/supabaseClient';
import { Exercise, ExerciseFormValues } from '@types';

const initialValues = {
  muscleGroups: '',
  name: '',
  reps: '',
  sets: '',
  weight: '',
};

const validationSchema = Yup.object({
  muscleGroups: Yup.string().required('Fyll i en kategori'),
  name: Yup.string().required('Fyll i en övning'),
  reps: Yup.string().required('Fyll i antalet repetition'),
  sets: Yup.string().required('Fyll i antalet sets'),
  weight: Yup.string().required('Fyll i vikten'),
});

interface IExerciseContext {
  editExercise: (exercise: Exercise) => void;
  exercises: Exercise[];
  formIsOpen: boolean;
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
  synchronizeData: boolean;
}

export const ExerciseContext = createContext<IExerciseContext | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const ExerciseContextProvider: React.FC<Props> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [synchronizeData, setSynchronizeData] = useState(false);

  const addExercise = async (
    { name, muscleGroups, reps, sets, weight }: ExerciseFormValues,
    { resetForm }: FormikHelpers<ExerciseFormValues>,
  ) => {
    const user = supabase.auth.user();
    if (!user?.id) {
      // TODO: handle no user id
      return null;
    }

    const formattedmuscleGroups = muscleGroups
      .split(',')
      .map((muscleGroup) => muscleGroup.toLowerCase().trim())
      .filter(Boolean);

    const { error } = await supabase.from('exercises').insert({
      name: name.toLowerCase(),
      reps,
      sets,
      weight,
      muscleGroups: formattedmuscleGroups,
      userId: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    resetForm();
    setSynchronizeData((trigger) => !trigger);
  };

  const editExercise = (exercise: Exercise) => {
    console.log(exercise);
    setFormIsOpen(true);
    scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const getExercises = async () => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from('exercises')
        .select()
        .eq('userId', user?.id);

      if (error) {
        throw new Error(error.message);
      }

      setExercises(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises();
  }, [synchronizeData]);

  const value: IExerciseContext = {
    editExercise,
    exercises,
    formIsOpen,
    setExercises,
    setFormIsOpen,
    synchronizeData,
  };

  return (
    <ExerciseContext.Provider value={value}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={addExercise}
      >
        {children}
      </Formik>
    </ExerciseContext.Provider>
  );
};

export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExerciseContext must be used within a ExerciseContext');
  }
  return context;
};

export default ExerciseContext;
