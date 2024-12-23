import { UserAgentProvider } from "@/components/providers/userAgentProvider";
import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const UserAgentRoot = () => {
  const userAgent = headers().get("user-agent") || "Unknown";
  return (
    <UserAgentProvider userAgent={userAgent}>
      <UserAgent />
    </UserAgentProvider>
  );
};

export default UserAgentRoot;
