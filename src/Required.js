import React  from "react";
import Box from "@mui/material/Box";

const Required = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <Box
          key={item.id}
          component="h3"
          sx={{ p: 2, border: "1px dashed grey" }}
        >
          <h3>{`Balance amount: Sh. ${item.data.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</h3>
          <h3>{`Daily amount: Sh. ${item.data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</h3>
          <p>{`Last at: ${new Date(item.data.time?.toDate()).toDateString()}`}</p>
        </Box>
      ))}
    </div>
  );
};

export default Required;
