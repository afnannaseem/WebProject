import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import GoogleButton from 'react-google-button';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../Hooks/AuthContext";
import { useLogin } from "../Hooks/useLogin";
import { useVerifyAccount } from "../Hooks/useVerifyAccount";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 600,
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const schema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

export default function LoginModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [role, setRole] = useState('User');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(schema) });
    const [registered, setRegister] = useState(true);
    const handleClose = () => {
        setRegister(true);
        reset();
        setOpen(false)

    };
    const { login, loading, error, success } = useLogin();
    const { verifyAccount } = useVerifyAccount();
    const form = useRef();
    const { googleSignIn } = useAuth() || {};
    const [data, setdata] = useState({
        email: "",
        name: "",
        signIn: "",
        role: "",
    });
    const handleClick = async () => {
        try {
            const response = await googleSignIn();
            const email = response.user.email;
            const name = response.user.displayName;
            const verified = response.user.emailVerified;
            const detail = {
                email: email,
                name: name,
                signIn: verified,
            }
            setdata(detail);
            const res = await verifyAccount(data);
            if (res?.registered === true) {
                setdata({ ...data, role: role });
                const res = await login(data);
                console.log(res);
                if (res?.verified === false) {
                    navigate('/pending', { replace: true });
                }
                else if (res?.showMessages === false) {
                    navigate('/accept', { replace: true });
                }
            }
            else {
                setRegister(false);
            }

        } catch (error) {
            console.log(error);
        }
    };
    //toast.error("Error: Please try again", {
    //     //         position: "top-right",
    //     //         autoClose: 5000,
    //     //         hideProgressBar: false,
    //     //         closeOnClick: true,
    //     //         pauseOnHover: true,
    //     //         draggable: true,
    //     //         progress: undefined,
    //     //         theme: "dark",
    //     //     });
    const GoogleSinUp = async () => {
        setdata({ ...data, role: role });
        const res = await login(data);
        if (res?.verified === true) {
            navigate('/pending', { replace: true });
        }
        else if (res?.showMessages === false) {
            navigate('/accept', { replace: true });
        }
    }
    const navigate = useNavigate();
    const onSubmit = async (fieldValues) => {
        try {
            console.log(fieldValues);
            const res = await login(fieldValues);
            console.log(res);
            if (res?.verified === false) {
                navigate('/pending', { replace: true });
            }
            else if (res?.showMessages === false) {
                navigate('/accept', { replace: true });
            }
            else if (res?.role === 'admin') {

            }
            else if (res?.role === 'vendor') {

            }
            else if (res?.role === 'user') {

            }
            else if (res?.role === 'superadmin') {
                navigate('/Dashboard', { replace: true });
            }
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
            {props.index === 0 ? < Button sx={{ marginRight: 4 }} variant="contained" onClick={handleOpen}>Login</Button>
                : <Typography onClick={handleOpen} textAlign="center">Login</Typography>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    {registered === true ? <div>
                        <div style={{ display: 'flex', justifyContent: "end", alignContent: 'end' }}
                        >
                            <CloseIcon onClick={handleClose} color='black' className='hover:bg-gray-200 cursor-pointer' />
                        </div>
                        <GoogleButton style={{ marginTop: 40, width: 400, marginLeft: 15 }} onClick={handleClick} />
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: 20, opacity: 0.7 }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                or
                            </Typography>
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
                            <Button type="submit" sx={{ marginTop: 2.0, width: 400, marginLeft: 1.5, height: 45 }} variant="contained">Login</Button>
                        </Box>
                        <div style={{ marginTop: 20, marginLeft: 15, color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography id="modal-modal-title" variant="h7" component="h2"  >
                                No account?&nbsp;
                            </Typography>
                            <Typography id="modal-modal-title" variant="link" component="h2" sx={{ color: 'blue' }} className='cursor-pointer hover:underline' >
                                {" Create one"}
                            </Typography>
                        </div>
                    </div> :
                        <div>
                            <div style={{ display: 'flex', justifyContent: "space-between", alignContent: 'center' }}
                            >
                                <ArrowBackIcon onClick={() => { setRegister(true) }} color='black' className='hover:bg-gray-200 cursor-pointer' />
                                <CloseIcon onClick={handleClose} color='black' className='hover:bg-gray-200 cursor-pointer' />
                            </div>
                            <div>
                                <Typography id="modal-modal-title" variant="h6" component="h2"
                                    sx={{ marginTop: 3.0, ml: 1.5 }}
                                >
                                    Register
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1.5 }}>
                                    Create your account. It's free and only takes a minute.
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1.5 }}>
                                    <b>Role</b>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1.5 }}>
                                    Select your role
                                </Typography>

                            </div>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={roles}
                                isOptionEqualToValue={(option, value) => option.label === value}
                                value={role}
                                onChange={(event, newValue) => {
                                    setRole(newValue?.label);
                                }}
                                sx={{ width: 400, marginLeft: 1.5, marginTop: 3.0 }}
                                renderInput={(params) => <TextField {...params} placeholder="Choose your role" />}
                            />
                            <Button sx={{ mt: 8.0, width: 400, marginLeft: 1.5, height: 45 }} variant="contained" onClick={GoogleSinUp}>Register</Button>
                            <div style={{ marginTop: 30, marginLeft: 15, color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography id="modal-modal-title" variant="h7" component="h2"  >
                                    Login with email?&nbsp;
                                </Typography>
                                <Typography id="modal-modal-title" variant="link" component="h2" sx={{ color: 'blue' }} className='cursor-pointer hover:underline'
                                >
                                    Create one
                                </Typography>
                                <Typography id="modal-modal-title" variant="link" component="h2" sx={{ color: 'blue' }} className='cursor-pointer hover:underline'
                                >
                                    Forgot Password?
                                </Typography>
                            </div>

                        </div>
                    }
                </Box>
            </Modal>
        </div>
    );
}