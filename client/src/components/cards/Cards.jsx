import { memo, useState, useEffect } from "react";
import { useGetUsersQuery } from "../../context/api/userApi";
import Card from "../card/Card";
import "./cards.scss";
import Form from "../form/Form";
import Pagination from '@mui/material/Pagination';

const Cards = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, error, isLoading } = useGetUsersQuery({ limit, page });

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Fetch data whenever page changes
  }, [page]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="container cards__container">
      <div className="user__create-btn">
        <button onClick={() => setShow(true)}>Add to user</button>
      </div>
      <div className="cards">
        {data?.payload.map((user) => (
          <Card key={user._id} data={user} />
        ))}
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(data?.total / limit)}
          page={page}
          onChange={handleChange}
        />
      </div>
      {show && <Form close={setShow} />}
    </div>
  );
};

export default memo(Cards);
