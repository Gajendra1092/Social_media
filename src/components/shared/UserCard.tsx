import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useFollowUser, useUnfollowUser, useIsUserFollowing } from "@/lib/react-query/queries";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const { user: currentUser } = useUserContext();
  const { mutate: followUser, isLoading: isFollowingUser } = useFollowUser();
  const { mutate: unfollowUser, isLoading: isUnfollowingUser } = useUnfollowUser();
  const { data: isFollowing } = useIsUserFollowing(currentUser.id, user.$id);

  const handleFollowUser = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFollowing) {
      unfollowUser({ followerId: currentUser.id, followingId: user.$id });
    } else {
      followUser({ followerId: currentUser.id, followingId: user.$id });
    }
  };
  return (
    <div className="user-card">
      <Link to={`/profile/${user.$id}`}>
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-14 h-14"
        />

        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            {user.name}
          </p>
          <p className="small-regular text-light-3 text-center line-clamp-1">
            @{user.username}
          </p>
        </div>
      </Link>

      <Button
        type="button"
        size="sm"
        className="shad-button_primary px-5"
        onClick={handleFollowUser}
        disabled={isFollowingUser || isUnfollowingUser}
      >
        {isFollowingUser || isUnfollowingUser ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
