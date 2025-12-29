import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import User from "../components/User";

const Users = () => {
  const [name, setName] = useState("");
  const { getUsers, users } = useUser();

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="users">
      <h1>Search users</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="userName"
          placeholder="Search user name"
        />
      </form>

      <div>
        <h1>The Users</h1>

        {users.filter(el => `${el.name}`.startsWith(name)).map(el => {
          return <User el={el} />
        })}
      </div>
    </div>
  );
};

export default Users;
