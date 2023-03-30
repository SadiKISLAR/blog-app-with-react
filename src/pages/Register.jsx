import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import loginStyle from "./styles/Login.module.css";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useState } from "react";
import useAuthCalls from "../hooks/useAuthCalls";
import blogImage from "../assets/images.jpg";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";

const Register = () => {
    const { register } = useAuthCalls();
    const [info, setInfo] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(info);
    };

    return (
        <Box className={loginStyle["login-main"]}>
            <Box
                component="form"
                className={loginStyle["form"]}
                onSubmit={handleSubmit}
            >
                <Box sx={{ textAlign: "center" }}>
                    <img src={blogImage} alt="blog" width={"150px"} />
                </Box>
                <TextField
                    required
                    type="name"
                    name="first_name"
                    variant="outlined"
                    label="Name"
                    value={info.first_name || ""}
                    onChange={handleChange}
                />
                <TextField
                    required
                    type="lastname"
                    name="last_name"
                    variant="outlined"
                    label="Lastname"
                    value={info.last_name || ""}
                    onChange={handleChange}
                />
                <TextField
                    required
                    type="username"
                    name="username"
                    variant="outlined"
                    label="Username"
                    value={info.username || ""}
                    onChange={handleChange}
                />
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
                <TextField
                    required
                    type="password"
                    name="password2"
                    variant="outlined"
                    label="Password Again"
                    value={info.password2 || ""}
                    onChange={handleChange}
                />
                <Typography
                    color={grey[100]}
                    onClick={() => navigate("/login")}
                    sx={{ cursor: "pointer" }}
                >
                    I have an account
                </Typography>
                <Button type="submit" variant="contained" endIcon={<FingerprintIcon />}>
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default Register;
