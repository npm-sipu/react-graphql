import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import RHFInput from "./FormControl/RHFInput";
import ReactCustomSelect from "./FormControl/ReactCustomSelect";
import { RHFDatePicker } from "./FormControl/RHFDatePicker";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  createUser,
  getCities,
  getCountries,
  getStates,
} from "../services/api.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { roles } from "../helper/Constant";
import type { CreateUserInput } from "../schemas/user.schema";

export const UserFormSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  dob: z.string().optional(), // if optional
});

export type TUserForm = z.infer<typeof UserFormSchema>;

// Default values helper
// eslint-disable-next-line react-refresh/only-export-components
export function getDefaultValues(data?: Partial<TUserForm>): TUserForm {
  return {
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    email: data?.email ?? "",
    country: data?.country ?? "",
    state: data?.state ?? "",
    city: data?.city ?? "",
    dob: data?.dob ?? "",
    role: data?.role ?? "",
    // or undefined if you want optional
  };
}

interface IAddEditUserDialogProps {
  open: boolean;
  onClose: () => void;
  //   handleReset: () => void;
  defaultValues?: Partial<TUserForm>;
  reloadData: () => void;
}

function AddEditUserModal({
  open,
  onClose,
  reloadData,
}: IAddEditUserDialogProps) {
  const {
    formState: { errors, isDirty },
    reset,
    control,
    handleSubmit,
    watch,
  } = useForm<TUserForm>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: getDefaultValues(),
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const {
    data: countryOptionsData = [],
    isLoading: countryOptionsDataLoading,
  } = useQuery({
    queryKey: ["country_data"],
    queryFn: getCountries,
    select: (data) => {
      return data.countries.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    },
    enabled: open,
  });

  const countryId = watch("country");

  const { data: statesOptionsData = [], isLoading: statesOptionsDataLoading } =
    useQuery({
      queryKey: ["states_data", countryId],
      queryFn: () => getStates(countryId),
      select: (data) => {
        return data.states.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      },
      enabled: !!countryId,
    });

  const stateId = watch("state");

  const { data: cityOptionsData = [], isLoading: cityOptionsDataLoading } =
    useQuery({
      queryKey: ["cities_data", stateId],
      queryFn: () => getCities(stateId),
      select: (data) => {
        return data.cities.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      },
      enabled: !!stateId,
    });

  const { mutate: createUserMutate, isPending } = useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),
    onSuccess: (data) => {
      console.log("data", data);
      reloadData();
      handleClose();
    },
    onError: (error) => {
      console.error("Error creating apr:", error);
    },
  });

  const onSubmit = (data: TUserForm) => {
    console.log("data of form", data);

    const payload: CreateUserInput = {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      email: data.email ?? "",
      countryId: data.country ?? "",
      stateId: data.state ?? "",
      cityId: data.city ?? "",
      dob: data.dob ?? "",
      role: data.role ?? "",
    };
    createUserMutate(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#299d46",
          color: "#fff",
          paddingY: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
          }}
          variant='h6'
        >
          Create User Modal
        </Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col mt-6 gap-2 w-full'>
            <Container maxWidth='md' sx={{ py: 0 }}>
              <div className='flex flex-col items-center gap-4 gap-x-8'>
                <div className='flex items-center gap-2 w-full'>
                  <p className='w-1/3 text-[13px]'>First Name</p>
                  <RHFInput
                    control={control}
                    containerClassName='flex-1'
                    inputClassName='w-full !py-0.5'
                    name='firstName'
                    error={errors.firstName?.message}
                  />
                </div>
                <div className='flex items-center gap-2 w-full'>
                  <p className='w-1/3 text-[13px]'>Last Name</p>
                  <RHFInput
                    control={control}
                    containerClassName='flex-1'
                    inputClassName='w-full !py-0.5'
                    name='lastName'
                    error={errors.lastName?.message}
                  />
                </div>
                <div className='flex items-center gap-2 w-full'>
                  <p className='w-1/3 text-[13px]'>Email</p>
                  <RHFInput
                    control={control}
                    containerClassName='flex-1'
                    inputClassName='w-full !py-0.5'
                    name='email'
                    error={errors.email?.message}
                  />
                </div>

                <div className='flex items-center gap-2 w-full'>
                  <p className='w-1/3 text-[13px]'>Country *</p>
                  <div className='flex-1'>
                    <ReactCustomSelect
                      isLoading={false}
                      name='country'
                      control={control}
                      options={countryOptionsData ?? []}
                      placeholder='Select Country'
                      error={errors.country?.message as string}
                    />
                  </div>
                </div>

                <div className='flex items-center gap-2 w-full'>
                  <p className='w-1/3 text-[13px]'>State *</p>
                  <div className='flex-1'>
                    <ReactCustomSelect
                      isLoading={false}
                      name='state'
                      control={control}
                      options={statesOptionsData ?? []}
                      placeholder='Select State'
                      error={errors.state?.message as string}
                    />
                  </div>
                </div>

                <div className='flex items-center gap-2 w-full'>
                  <p className='w-1/3 text-[13px]'>City *</p>
                  <div className='flex-1'>
                    <ReactCustomSelect
                      isLoading={false}
                      name='city'
                      control={control}
                      options={cityOptionsData ?? []}
                      placeholder='Select City'
                      error={errors.city?.message as string}
                    />
                  </div>
                </div>

                <div className='flex items-center gap-2 w-full'>
                  <p className='w-1/3 text-[13px]'>Roles *</p>
                  <div className='flex-1'>
                    <ReactCustomSelect
                      isLoading={false}
                      name='role'
                      control={control}
                      options={roles ?? []}
                      placeholder='Select Country'
                      error={errors.country?.message as string}
                    />
                  </div>
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='flex items-center gap-2 w-full'>
                    <p className='w-1/2 text-[13px]'>Date of Birth</p>
                    <RHFDatePicker
                      name='dob'
                      control={control}
                      placeholder='Select a Date'
                      error={errors.dob?.message ? true : false}
                      helperText={errors.dob?.message}
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </Container>
          </div>

          <div className='flex justify-end mt-4 gap-2 mx-5'>
            <Button variant='outlined' size='small' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='outlined'
              size='small'
              color='primary'
              type='submit'
              disabled={!isDirty}
            >
              Create
            </Button>
          </div>
        </form>

        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={
            countryOptionsDataLoading ||
            cityOptionsDataLoading ||
            statesOptionsDataLoading ||
            isPending
          }
        >
          <CircularProgress color='primary' />
        </Backdrop>
      </DialogContent>
    </Dialog>
  );
}

export default AddEditUserModal;
