import colors from "colors";
import Homepage from "@components/Homepage";
import Layout from "@components/UI/Layout";
import { getAllRooms } from "store/actions/room/room";

import { wrapper } from "../store";

export default function Home() {
  return (
    <Layout>
      <Homepage />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllRooms());
  }
);
