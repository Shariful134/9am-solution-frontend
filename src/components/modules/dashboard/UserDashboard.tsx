import { useCurrentToken } from "../../../redux/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import type { TUser } from "../../../types/type";
import { verifyToken } from "../../../utils/VerifyToken";

export default function UserDashBoardPage() {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  console.log(user);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div>
      <h2>Welcome to your dashboard!</h2>
      <p>This is a basic placeholder dashboard.</p>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
