import Home from "../page/Home";
import Error404 from "../page/Error404";
import User from "../page/user"
import Users from "../page/Users";
import Search from "../page/Search/Search";
import TweetPage from "../page/Tweet";
import Prueba from "../page/Prueba/Prueba";
import Messages from "../page/Messages";
import Denuncias from "../page/Denuncias";
import Config from "../page/Config/Config";
import Socket from "../page/socket";

export default [
    {
        path: "/twintter",
        exact: true,
        page: Home,
    },
    {
        path: "/socket",
        exact: true,
        page: Socket,
    },
    {
        path: "/setting",
        exact: true,
        page: Config,
    },
    {
        path: "/denuncias",
        exact: true,
        page: Denuncias,
    },
    {
        path: "/messages",
        exact: true,
        page: Messages,
    },
    {
        path: "/notifications",
        exact: true,
        page: Prueba,
    },
    {
        path: "/tweet",
        exact: true,
        page: TweetPage,
    },
    {
        path: "/search",
        exact: true,
        page: Search,
    },
    {
        path: "/users",
        exact: true,
        page: Users,
    },
    {
        path: "/:id",
        exact: true,
        page: User,
    },
    {
        path: "/",
        exact: true,
        page: Home,
    },
    {
        path: "*",
        page: Error404
    },
];

