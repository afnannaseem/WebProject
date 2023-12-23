import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSignup from "../Hooks/useSinup";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 700,
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const schema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    name: z.string().min(3, "Name must be at least 3 characters."),
});

export default function SinUpModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [role, setRole] = useState('User');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(schema) });
    const handleClose = () => {
        reset();
        setOpen(false)
    };
    const { signUp, loading, error, success } = useSignup();
    const form = useRef();
    const onSubmit = async (fieldValues) => {
        try {
            fieldValues.role = role;
            console.log(fieldValues);
            await signUp(fieldValues);
            reset();
        } catch (error) {
            console.error(error);
        }
    };
    const roles = [
        { label: 'Admin' },
        { label: 'Vendor' },
        { label: 'User' },
    ];
    return (
        <div>
            {props.index === 0 ? < Button sx={{ marginRight: 4 }} variant="outlined" onClick={handleOpen}>Sinup</Button>
                : <Typography onClick={handleOpen} textAlign="center">Sinup</Typography>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: "end", alignContent: 'end' }}
                        >
                            <CloseIcon onClick={handleClose} color='black' className='hover:bg-gray-200 cursor-pointer' />
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: 20, opacity: 0.7 }}>
                        </div>
                        <Box
                            component="form"
                            ref={form}
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 3 }}
                        >
                            <TextField
                                {...register("email")}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                                id="email"
                                required
                                placeholder='E-mail'
                                name="email"
                                type='email'
                                sx={{
                                    width: 400,
                                    marginTop: 1.0,
                                    marginLeft: 1.5,
                                    '& input::placeholder': {
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: 2,
                                            borderColor: 'gray',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                {...register("password")}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                                id="password"
                                required
                                name="password"
                                placeholder='Password' type='password' variant="outlined" sx={{
                                    width: 400,
                                    marginTop: 2.5,
                                    marginLeft: 1.5,
                                    '& input::placeholder': {
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: 2,
                                            borderColor: 'gray',
                                        },
                                    },
                                }} />
                            <TextField
                                {...register("name")}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                                id="name"
                                required
                                name="name"
                                placeholder='Name' type='text' variant="outlined" sx={{
                                    width: 400,
                                    marginTop: 2.5,
                                    marginLeft: 1.5,
                                    '& input::placeholder': {
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: 2,
                                            borderColor: 'gray',
                                        },
                                    },
                                }} />
                            <Autocomplete
                                disablePortal
                                id="role"
                                name="role"
                                options={roles}
                                isOptionEqualToValue={(option, value) => option.label === value}
                                value={role}
                                onChange={(event, newValue) => {
                                    setRole(newValue?.label);
                                }}
                                sx={{
                                    width: 400,
                                    marginLeft: 1.5,
                                    marginTop: 3.0,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: 2,
                                            borderColor: 'gray',
                                        },
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} placeholder="Choose your role" />}
                            />
                            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', marginTop: 30, marginRight: 25 }}>
                                <Checkbox
                                    id="Checkbox"
                                    required
                                    name="Checkbox"
                                    type="checkbox"
                                    {...register("Checkbox")}
                                />
                                <Typography id="modal-modal-title" variant="h7" component="h2">
                                    {errors.Checkbox ? "You must agree to the terms and conditions." : "I agree to join Fastian mailing list"}
                                </Typography>
                            </div>
                            <Button type="submit" sx={{ marginTop: 2.0, width: 400, marginLeft: 1.5, height: 45 }} variant="contained">Sinup</Button>
                        </Box>
                        <div style={{ marginTop: 20, marginLeft: 15, color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography id="modal-modal-title" variant="h7" component="h2"  >
                                {"Already have an account?"}&nbsp;
                            </Typography>
                            <Typography id="modal-modal-title" variant="link" component="h2" sx={{ color: 'blue' }} className='cursor-pointer hover:underline' >
                                {" login"}
                            </Typography>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}