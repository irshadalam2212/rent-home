import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { useGetAllUsers } from "../modules/users/hooks/user.hooks";
import capitalize from "../components/ui/utils/capitalize";

const Users = () => {
    const navigate = useNavigate()

    //----------------hooks---------------//
    const { data: GetAllUser, isLoading: GetAllUserIsLoading } = useGetAllUsers()

    return (
        <div className="mt-4 min-h-screen">
            <h3 className="mb-4">Users</h3>
            {
                (!GetAllUserIsLoading && GetAllUser?.data?.length) && (
                    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-3">
                        {GetAllUser?.data?.map((user, index) => (
                            <div key={index} className="p-4 border rounded-lg relative">
                                <span className="block">Name: {capitalize(user?.name)}</span>
                                <span className="block">Email: {user.email}</span>
                                {/* <span className="block">Username: {user.}</span> */}
                                <span className="block">Role: {capitalize(user?.userRole)}</span>
                                <div className="absolute top-2 right-6">
                                    <Dropdown
                                        renderTitle={
                                            <button className="p-2 bg-slate-100 rounded-full">
                                                <BsThreeDotsVertical />
                                            </button>
                                        }
                                    >
                                        <Dropdown.Item onClick={() => navigate('/users/edit-user', { state: { id: user?._id } })}>Edit</Dropdown.Item>
                                        <Dropdown.Item >Delete</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Users;
