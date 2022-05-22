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
import { DBTable } from '@constants';
import { Exercise, ExerciseFormValues } from '@types';
import { supabase } from '@utils/supabaseClient';
import { formatMuscleGroups } from '@utils/formatMuscleGroups';

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

type ExerciseEditValues = {
  isEditing: boolean;
  exerciceId?: string;
};

interface IExerciseContext {
  editValues: ExerciseEditValues;
  exercises: Exercise[];
  formIsOpen: boolean;
  setEditValues: Dispatch<SetStateAction<ExerciseEditValues>>;
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
  const [editValues, setEditValues] = useState<ExerciseEditValues>({
    isEditing: false,
  });
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

    const { error } = await supabase.from(DBTable.EXERCISES).insert({
      name: name.toLowerCase(),
      reps,
      sets,
      weight,
      muscleGroups: formatMuscleGroups(muscleGroups),
      userId: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }
    resetForm();
    setSynchronizeData((trigger) => !trigger);
  };

  const updateExercise = async (
    { name, muscleGroups, reps, sets, weight }: ExerciseFormValues,
    { resetForm }: FormikHelpers<ExerciseFormValues>,
  ) => {
    if (!editValues.exerciceId) {
      throw new Error(
        'Trying to update exercise in database without exerciseId',
      );
    }

    const { error } = await supabase
      .from(DBTable.EXERCISES)
      .update({
        name: name.toLowerCase(),
        reps,
        sets,
        weight,
        muscleGroups: formatMuscleGroups(muscleGroups),
      })
      .eq('id', editValues.exerciceId);

    if (error) {
      throw new Error(error.message);
    }
    resetForm();
    setEditValues({ isEditing: false });
    setSynchronizeData((trigger) => !trigger);
  };

  const getExercises = async () => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from(DBTable.EXERCISES)
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
    editValues,
    exercises,
    formIsOpen,
    setEditValues,
    setExercises,
    setFormIsOpen,
    synchronizeData,
  };

  return (
    <ExerciseContext.Provider value={value}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={editValues.isEditing ? updateExercise : addExercise}
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
