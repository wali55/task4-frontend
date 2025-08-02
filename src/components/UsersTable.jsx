import { getDateDifferenceFromNow } from "../utils";

const UsersTable = ({users, selected, setSelected}) => {
  const TABLE_HEAD = ["Name", "Email", "Status", "Last Login"];

  const toggleSelectAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map((u) => u.id));
    }
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="max-w-7xl overflow-x-auto ml-4 mr-4 md:mx-auto">
      <table className="w-full min-w-[600px] mt-4 bg-neutral-100 rounded-lg">
        <thead className="border-b border-neutral-800">
          <tr className="text-left text-neutral-900 text-sm">
            <th className="p-3">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selected.length === users.length}
              />
            </th>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-3">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="text-left text-neutral-900 text-sm hover:bg-purple-50 cursor-pointer border-b-2 border-neutral-300"
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => toggleSelect(user.id)}
                />
              </td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {user?.status === "blocked" ? (
                  <div className="bg-orange-500 text-white text-center rounded-full w-fit px-2 py-0.5 text-xs font-medium">
                    Blocked
                  </div>
                ) : (
                  <div className="bg-green-500 text-white text-center rounded-full w-fit px-2 py-0.5 text-xs font-medium">
                    Active
                  </div>
                )}
              </td>
              <td className="p-3">{getDateDifferenceFromNow(user.lastLogin)} ago</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
