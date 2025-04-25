import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import DatasetIcon from '@mui/icons-material/Dataset';
import { Access, Post, TypeSelectPost } from './PostType';
const DataOfAccess: TypeSelectPost[] = [
    {
        value: Access.Public,
        label: "Public",
        icon: <PublicIcon />,
    },
    {
        value: Access.Follow,
        label: 'Follow',
        icon: <PeopleIcon />,
    },
];
const DataOfPost: TypeSelectPost[] = [

    {
        value: Post.Daily,
        label: 'Daily',
        icon: <DatasetIcon />
    },
    {
        value: Post.Shop,
        label: 'Shop',
        icon: <StoreIcon />
    },
];

export { DataOfAccess, DataOfPost }