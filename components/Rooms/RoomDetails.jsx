import colors from "colors";
import Head from "next/head";
import Image from "next/image";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { CLEAR_ROOM_ERROR } from "@store/actionLabels";

const RoomDetails = () => {
  const dispatch = useDispatch();
  const { room, errorMsg } = useSelector((state) => state.room);

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
    }
    return () => {
      dispatch({ type: CLEAR_ROOM_ERROR });
    };
  }, [errorMsg]);

  if (room.name === undefined) {
    return (
      <>
        <Head>
          <title>Error While Fetching Room Details</title>
        </Head>
        <div className="container container-fluid mt-5">
          <a href="#" className="ml-2 back-to-search">
            {" "}
            <i className="fa fa-arrow-left"></i> Back to Home
          </a>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{room.name}</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>
        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews})</span>
        </div>

        <Carousel hover="pause">
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: "100%", height: "440px" }}>
                  <Image
                    className="d-block m-auto"
                    src={image.url}
                    alt={room.name}
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>

            <div className="features mt-5">
              <h3 className="mb-4">Features:</h3>
              <div className="room-feature">
                <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
                <p>{room.guestCapacity} Guests</p>
              </div>

              <div className="room-feature">
                <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
                <p>{room.numOfBeds} Beds</p>
              </div>

              <div className="room-feature">
                <i
                  className={
                    room.breakfast
                      ? "fa fa-check text-success"
                      : "fa fa-times text-danger"
                  }
                  aria-hidden="true"
                ></i>
                <p>Breakfast</p>
              </div>

              <div className="room-feature">
                <i
                  className={
                    room.internet
                      ? "fa fa-check text-success"
                      : "fa fa-times text-danger"
                  }
                  aria-hidden="true"
                ></i>
                <p>Internet</p>
              </div>

              <div className="room-feature">
                <i
                  className={
                    room.airConditioned
                      ? "fa fa-check text-success"
                      : "fa fa-times text-danger"
                  }
                  aria-hidden="true"
                ></i>
                <p>Air Conditioned</p>
              </div>

              <div className="room-feature">
                <i
                  className={
                    room.petsAllowed
                      ? "fa fa-check text-success"
                      : "fa fa-times text-danger"
                  }
                  aria-hidden="true"
                ></i>
                <p>Pets Allowed</p>
              </div>

              <div className="room-feature">
                <i
                  className={
                    room.roomCleaning
                      ? "fa fa-check text-success"
                      : "fa fa-times text-danger"
                  }
                  aria-hidden="true"
                ></i>
                <p>Room Cleaning</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b> / night
              </p>

              <button className="btn btn-block py-3 booking-btn">Pay</button>
            </div>
          </div>
        </div>

        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>

          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
