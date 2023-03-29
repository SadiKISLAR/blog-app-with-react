import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import writing from "../assets/writing.png";
import { useAuthContext } from "../contexts/AuthProvider";
import useBlogCalls from "../hooks/useBlogCalls";
import { useNavigate } from "react-router";

const NewBlog = () => {
    const { currentUser } = useAuthContext();
    const { postBlog } = useBlogCalls();
    const navigate = useNavigate();

    const initialValues = {
        title: "",
        content: "",
        image: "",
        author_id: currentUser.id,
        category: "",
    };

    const [info, setInfo] = useState(initialValues);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postBlog(info);
        setInfo(initialValues);
    };

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "1rem",
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "50%",
                        minWidth: "25rem",
                    }}
                >
                    <Box sx={{ aspectRatio: "2/1" }}>
                        <img src={writing} alt="writing" width="100%" />
                    </Box>

                    <TextField
                        type="text"
                        name="title"
                        variant="outlined"
                        label="Title"
                        value={info?.title || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        type="url"
                        name="image"
                        variant="outlined"
                        label="Image Url"
                        value={info?.image || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        multiline
                        minRows={3}
                        type="text"
                        name="content"
                        variant="outlined"
                        label="Content"
                        value={info?.content || ""}
                        onChange={handleChange}
                    />
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            name="category"
                            value={info?.category || ""}
                            label="Category"
                            onChange={handleChange}
                        >
                            <MenuItem value="p">Human</MenuItem>
                            <MenuItem value="n">Nature</MenuItem>
                            <MenuItem value="l">Life</MenuItem>
                            <MenuItem value="h">Health</MenuItem>
                            <MenuItem value="t">Technology</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" type="submit">
                        add blog
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate(-1)}
                    >
                        go back
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default NewBlog;
