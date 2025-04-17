import { Button, FormControl, Paper, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import { DataOfAccess,DataOfPost } from "../../Type/DataPost";
export default function PostBox() {
    return (
        <div className=" w-1/2 p-2 rounded-md gap-3 flex flex-col">
            <div className=" flex justify-between">
                <a className=" text-xl">Post</a>
                <div className=" flex gap-4">
                    <FormControl sx={{ minWidth: 120}} size="small">
                        <Select
                            id="filled-basic"
                            defaultValue="public"
                        >
                            {DataOfAccess.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.icon} {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120}} size="small">
                        <Select
                            id="filled-basic"
                            defaultValue="daily"
                        >
                            {DataOfPost.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.icon}{option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <TextField
                id="filled-textarea"
                placeholder="Let's post!"
                multiline
                variant="filled"
                autoFocus={true}
                sx={{ width: "100%", height: "100%" }}
                maxRows={9}
                minRows={7}
            ></TextField>
            <Button variant="contained" endIcon={<SendIcon color="secondary" />}>
                Send
            </Button>
        </div>
    )
}