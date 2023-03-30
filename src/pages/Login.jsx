import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import loginStyle from "./styles/Login.module.css";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import useAuthCalls from "../hooks/useAuthCalls";
import blogImage from "../assets/images.jpg";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router";

const Login = () => {
    const { login } = useAuthCalls();
    const [info, setInfo] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(info);
    };

    return (
        <Box className={loginStyle["login-main"]}>
            <Box
                component="form"
                className={loginStyle["form"]}
                onSubmit={handleSubmit}
            >
                <Box sx={{ textAlign: "center" }}>
                    <img src={blogImage} alt="laptop" width={"150px"} />
                </Box>
                <TextField
                    required
                    type="email"
                    name="email"
                    variant="outlined"
                    label="Email"
                    value={info.email || ""}
                    onChange={handleChange}
                />
                <TextField
                    required
                    type="password"
                    name="password"
                    variant="outlined"
                    label="Password"
                    value={info.password || ""}
                    onChange={handleChange}
                />
                <Typography
                    color={grey[100]}
                    onClick={() => navigate("/register")}
                    sx={{ cursor: "pointer" }}
                >
                    You don't have an account!
                </Typography>
                <Button type="submit" variant="contained" endIcon={<FingerprintIcon />}>
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
