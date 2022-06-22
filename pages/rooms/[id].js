import colors from "colors";
import Layout from "@components/UI/Layout";
import RoomDetails from "@components/Rooms/RoomDetails";

import { wrapper } from "@store/index";
import { getRoomDetails } from "@store/actions/room/room";

export default function Home() {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getRoomDetails(params.id));
    }
);
