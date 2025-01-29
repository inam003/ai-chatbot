import RecentChats from "@/components/dashboard/recent-chats";

const ChatInterface = () => {
  return (
    <div className="px-2 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold">Recent Chats</h1>
      <RecentChats />
    </div>
  );
};

export default ChatInterface;
