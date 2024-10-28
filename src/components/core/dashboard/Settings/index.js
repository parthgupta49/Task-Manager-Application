import UpdateProfilePicture from "./UpdateProfilePicture";

import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./ChangePassword"
import DeleteAccount from './DeleteAccount'


export default function Settings(){
    return (
        <div className="text-white flex flex-col gap-8">
            <h1 className="text-3xl font-medium">Edit Profile</h1>
            <UpdateProfilePicture/>
            <UpdateProfile />
            <UpdatePassword />
            <DeleteAccount  />
        </div>
    )
}