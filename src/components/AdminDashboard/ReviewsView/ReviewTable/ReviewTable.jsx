import React, { useState, useEffect } from "react";

import PageHeader from "../../PageHeader/PageHeader";
import Controls from "../../controls/Controls";

import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";

import { Search, RateReview, CloseOutlined } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import useTable from "../../useTable/useTable";

import { useFetch } from "../../../../hooks/useFetch";
import getAllReviews from "../../../../services/reviews/getAllReviews";
import deleteReview from "../../../../services/reviews/deleteReview";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
    "& .MuiInputLabel-outlined": {
      fontSize: "1.65rem",
    },
    "& .MuiInputBase-root": {
      fontSize: "1.6rem",
    },
    "& .MuiSvgIcon-root": {
      width: "2.5rem",
      height: "2.5rem",
    },
  },
  tableCell: {
    padding: "8px",
    fontSize: "1.2rem",
  },
  actionsButton: {
    fontSize: "2rem",
  },
}));

const headCells = [
  { id: "rate", label: "Rate" },
  { id: "username", label: "Username" },
  { id: "name", label: "Town Name" },
  { id: "description", label: "Description" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function ReviewsTable() {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const { data, loading } = useFetch(getAllReviews);
  useEffect(() => {
    !loading && setRecords(data);
  }, [data]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target.value;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") {
          return items;
        } else {
          return items.filter((x) => {
            target = target.toLowerCase();
            return x.user.username.toLowerCase().includes(target);
          });
        }
      },
    });
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure to delete this record?",
      text: " You can't undo this operation?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          visible: true,
          text: "Cancel",
        },
        confirm: {
          text: "Yes, delete this record",
        },
      },
    }).then(async (willDeleteRecord) => {
      if (willDeleteRecord) {
        await deleteReview(id);
        const reviews = await getAllReviews();
        setRecords(reviews);
      }
    });
  };

  return (
    <>
      <PageHeader
        title={"Reviews"}
        subtitle={"Manage all reviews information"}
        icon={<RateReview fontSize={"large"} />}
        qty={records.length}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label={"Search Reviews"}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position={"start"}>
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {isLoading ? (
          <>
            <CircularProgress size={160} />
          </>
        ) : (
          <>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className={classes.tableCell}>
                      {review.rate}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {review.user.username}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {review.town.name}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {review.description}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Controls.ActionButton
                        color={"delete"}
                        variant={"outlined"}
                        onClick={() => {
                          handleDelete(review.id);
                        }}
                      >
                        <CloseOutlined className={classes.actionsButton} />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </>
        )}
      </Paper>
    </>
  );
}

export default ReviewsTable;
