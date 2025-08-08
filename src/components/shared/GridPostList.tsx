import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";
import { getFilePreview } from "@/lib/appwrite/api";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  // Normalize posts: ensure there's a usable image URL (fallback to preview from imageId)
  const normalizedPosts: Models.Document[] = (posts || [])
    .filter((post) => post && post.$id && (post.imageUrl || (post as any).imageId))
    .map((post) => {
      const originalUrl = post.imageUrl;
      const imageId = (post as any).imageId;

      // Check if imageUrl is a valid string URL
      let isValidUrl = false;
      let urlString = "";

      if (typeof originalUrl === "string" && originalUrl.length > 0 && !originalUrl.includes("[object")) {
        urlString = originalUrl;

        // Check if this is an old preview URL that needs to be converted to view URL
        if (urlString.includes('/preview?')) {
          // Extract the file ID from the preview URL and convert to view URL
          const fileIdMatch = urlString.match(/\/files\/([^\/]+)\/preview/);
          if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            // Replace the preview part with view, keeping the project parameter
            const baseUrl = urlString.split('/files/')[0];
            const projectMatch = urlString.match(/project=([^&]+)/);
            const projectParam = projectMatch ? `?project=${projectMatch[1]}` : '';
            urlString = `${baseUrl}/files/${fileId}/view${projectParam}`;
          }
        }

        isValidUrl = true;
      } else if (originalUrl && typeof originalUrl === "object" && originalUrl.toString && originalUrl.toString() !== "[object Object]") {
        // Handle URL objects
        urlString = originalUrl.toString();

        // Also check for preview URLs in URL objects
        if (urlString.includes('/preview?')) {
          const fileIdMatch = urlString.match(/\/files\/([^\/]+)\/preview/);
          if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            const baseUrl = urlString.split('/files/')[0];
            const projectMatch = urlString.match(/project=([^&]+)/);
            const projectParam = projectMatch ? `?project=${projectMatch[1]}` : '';
            urlString = `${baseUrl}/files/${fileId}/view${projectParam}`;
          }
        }

        isValidUrl = urlString.length > 0 && !urlString.includes("[object");
      }

      const computedUrl = isValidUrl
        ? urlString
        : (imageId ? getFilePreview(imageId) : "");

      return { ...(post as any), imageUrl: computedUrl } as unknown as Models.Document;
    })
    .filter((post) => (post as any).imageUrl);


  if (normalizedPosts.length === 0) {
    return (
      <div className="flex-center w-full h-full">
        <p className="text-light-4">No posts available</p>
      </div>
    );
  }

  return (
    <ul className="grid-container">
      {normalizedPosts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl as string}
              alt="post"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/assets/icons/profile-placeholder.svg";
              }}
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">
                  {post.creator?.name || "Unknown User"}
                </p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
