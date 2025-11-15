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

export const UserFormSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
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
    dob: data?.dob ?? "", // or undefined if you want optional
  };
}

interface IAddEditUserDialogProps {
  open: boolean;
  onClose: () => void;
  //   handleReset: () => void;
  defaultValues?: Partial<TUserForm>;
}

function AddEditUserModal({
  open,
  onClose,
}: //   handleReset,
//   defaultValues,
IAddEditUserDialogProps) {
  const {
    formState: { errors, isDirty },
    // reset,
    control,
    handleSubmit,
  } = useForm<TUserForm>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = (data: TUserForm) => {
    console.log("data of form", data);
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
                      options={[]}
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
                      options={[]}
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
                      options={[]}
                      placeholder='Select City'
                      error={errors.city?.message as string}
                    />
                  </div>
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='flex items-center gap-2 w-full'>
                    <p className='w-1/2 text-[13px]'>Date of Birth</p>
                    <RHFDatePicker
                      name='dob'
                      control={control}
                      placeholder=' '
                      error={errors.dob?.message ? true : false}
                      helperText={errors.dob?.message}
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </Container>
          </div>

          <div className='flex justify-end mt-4 gap-2'>
            <Button variant='outlined' size='small' onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant='outlined'
              size='small'
              color='primary'
              type='submit'
              // onClick={handleReset}
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
          open={false}
        >
          <CircularProgress color='primary' />
        </Backdrop>
      </DialogContent>
    </Dialog>
  );
}

export default AddEditUserModal;
