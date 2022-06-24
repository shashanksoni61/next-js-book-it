import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { CLEAR_ROOM_ERROR } from "@store/actionLabels";

const Homepage = () => {
  const dispatch = useDispatch();
  const { rooms, errorMsg } = useSelector((state) => state.room);

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
    }
    return () => {
      dispatch({ type: CLEAR_ROOM_ERROR });
    };
  }, [errorMsg]);

  return (
    <section id="rooms" className="container mt-5">
      {/* <h2 className="mb-3 ml-2 stays-heading">Select Rooms To Book</h2> */}

      <p href="#" className="ml-2 back-to-search">
        {" "}
        Select Rooms To Book
      </p>
      <div className="row">
        {rooms &&
          rooms?.list &&
          rooms?.list.length > 0 &&
          rooms.list.map((item) => (
            <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={item._id}>
              <div className="card p-2">
                <Image
                  className="card-img-top mx-auto"
                  src={item.images[0].url}
                  height={170}
                  width={170}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link href={`/rooms/${item._id}`}>
                      <a>{item.name}</a>
                    </Link>
                  </h5>

                  <div className="ratings mt-auto mb-3">
                    <p className="card-text">
                      <b>${item.pricePerNight}</b> / night
                    </p>

                    <div className="rating-outer">
                      <div
                        className="rating-inner"
                        style={{ width: `${(item.ratings / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span id="no_of_reviews">
                      ({item.numOfReviews} Reviews)
                    </span>
                  </div>

                  <button className="btn btn-block view-btn">
                    <Link href={`/rooms/${item._id}`}>View Details</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Homepage;
