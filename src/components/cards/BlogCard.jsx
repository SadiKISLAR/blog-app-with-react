import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import cardStyle from "../styles/BlogCard.module.css";
import useBlogCalls from "../../hooks/useBlogCalls";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthProvider";
import { toastError } from "../../helpers/toastify";

export default function BlogCard({ blog, setBlogInfo }) {
    const { like, getBlogs } = useBlogCalls();
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();

    const handleClick = async () => {
        if (currentUser) {
            await like(blog?.id);
            getBlogs(setBlogInfo);
        } else {
            navigate("/login");
            toastError("Please Login to Continue..");
        }
    };

    return (
        <Card sx={{ width: "400px", bgcolor: "custom1.main" }}>
            <Box
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/details/${blog?.id}`)}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {blog.author[0].toUpperCase()}
                        </Avatar>
                    }
                    title={blog.author.toUpperCase()}
                    subheader={new Date(blog?.published_date).toDateString()}
                />

                <CardMedia
                    component="img"
                    height="300"
                    image={blog?.image}
                    alt={blog?.title}
                />
                <CardContent>
                    <Typography variant="h5">{blog?.title}</Typography>
                    <Typography
                        variant="body2"
                        // color="text.secondary"
                        className={cardStyle["content"]}
                    >
                        {blog?.content}
                    </Typography>
                </CardContent>
            </Box>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleClick}>
                    <FavoriteIcon sx={{ color: blog.has_liked && "red" }} />
                    <Typography variant="body2">{blog?.like_count}</Typography>
                </IconButton>
                <IconButton aria-label="share">
                    <VisibilityIcon />
                    <Typography variant="body2">{blog?.get_view_count}</Typography>
                </IconButton>
            </CardActions>
        </Card>
    );
}
