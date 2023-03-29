import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useState } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 1,
};

function UpdateModal({ open, setOpen, blogDetailInfo, setBlogDetailInfo }) {
    const { updateBlog, getBlogDetail } = useBlogCalls();
    const [blogModalInfo, setBlogModalInfo] = useState({ ...blogDetailInfo });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setBlogModalInfo({ ...blogModalInfo, [name]: value });
    };

    const handleUpdate = () => {
        updateBlog(blogModalInfo);
        setOpen(false);
        getBlogDetail(blogDetailInfo.id, setBlogDetailInfo);
    };

    const handleModalClose = () => {
        setOpen(false);
        setBlogModalInfo({ ...blogDetailInfo });
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ width: "50%", minWidth: "25rem", m: "auto" }}
            >
                <Box sx={style}>
                    <TextField
                        type="text"
                        name="title"
                        variant="filled"
                        label="Title"
                        value={blogModalInfo.title || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        type="text"
                        multiline
                        maxRows={10}
                        name="content"
                        variant="filled"
                        label="Content"
                        value={blogModalInfo.content || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        type="url"
                        name="image"
                        variant="filled"
                        label="Image"
                        value={blogModalInfo.image || ""}
                        onChange={handleChange}
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        name="status"
                        value={blogModalInfo.status || ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="P">Publish</MenuItem>
                        <MenuItem value="D">Draft</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default UpdateModal;
