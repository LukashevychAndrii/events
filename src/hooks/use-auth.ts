import { useAppSelector } from "../utils/redux";

export const useAuth = () => {
  const userDATA = useAppSelector((state) => state.user);
  return {
    usAuth: !!userDATA.ID,
  };
};
