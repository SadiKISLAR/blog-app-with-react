import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, IconButton } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";
import { useState } from "react";
import UpdateModal from "../modals/UpdateModal";

function ProfileBlogCard({ blog }) {
    const [openBlog, setOpenBlog] = useState(false);

    const [blogInfo, setBlogInfo] = useState({ ...blog });

    return (
        <Card
            sx={{
                width: "30vw",
                minWidth: 300,
                maxWidth: 400,
                display: "flex",
                justifyContent: "space-between",
                background: blogInfo?.status === "D" ? grey[400] : lightGreen[400],
                p: "0 .5rem",
            }}
        >
            <IconButton sx={{ p: 0 }}>
                <Avatar alt="avatar" src={blogInfo?.image} />
            </IconButton>
            <CardContent>
                <Typography variant="body2">{blogInfo?.title}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => setOpenBlog(true)}>
                    <EditIcon />
                </Button>
                <UpdateModal
                    blogDetailInfo={blogInfo}
                    setBlogDetailInfo={setBlogInfo}
                    open={openBlog}
                    setOpen={setOpenBlog}
                />
            </CardActions>
        </Card>
    );
}

export default ProfileBlogCard;