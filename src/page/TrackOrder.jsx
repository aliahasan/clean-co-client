import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { auth } from "../config/firebase.config";
import Container from "../components/ui/Container";
import toast from "react-hot-toast";

const TrackOrder = () => {
  const myAxios = useAxios();

  const queryClient = useQueryClient();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const email = auth?.currentUser?.email;
      const res = await myAxios.get(`/user/bookings?email=${email}`);
      return res;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["booking"],
    mutationFn: async (id) => {
      const res = await myAxios.delete(`/user/delete-booking/${id}`);
      return res;
    },
    onSuccess: () => {
      toast.success("delete success");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });

  return (
    <Container>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div>
          {bookings?.data?.map((item) => (
            <div className="border bottom-2" key={item._id}>
              <h1 className="my-2 py-1">{item?.service}</h1>
              <button
                onClick={() => mutate(item._id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default TrackOrder;
