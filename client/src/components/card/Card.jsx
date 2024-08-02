import male from "../../assets/male.svg";
import female from "../../assets/female.svg";
import { useDeleteUserMutation } from "../../context/api/userApi";

const Card = ({ data }) => {
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();

  const handleDelete = (id) => {
    if (window.confirm("are you sure ?")) {
      deleteUser(id);
    }
  };
  return (
    <div className="card">
      <div className="card__img">
        <img src={data?.gender === "male" ? male : female} alt={data?.title} />
      </div>
      <div className="card__info">
        <h3>
          {data.fname} {data?.lname}
        </h3>
        <p>username: {data?.username}</p>
        <p>password: {data?.password}</p>
        <p>age: {data?.age}</p>
        <p>gender: {data?.gender}</p>
        <p>budget: {data?.budget}</p>
        <p>isActive: {data?.isActive ? "Active" : "InActive"}</p>
        <div className="card__btns">
          <button>edit</button>
          <button onClick={() => handleDelete(data?._id)}>
            {isLoading ? "Loading..." : "delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
