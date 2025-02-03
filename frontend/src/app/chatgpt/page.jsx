"use client";
import { useEdgeRuntime, AssistantRuntimeProvider } from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";

const MyApp = () => {
  const runtime = useEdgeRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider
      runtime={runtime}
      className="bg-[url('/color.jpg')] "
    >
      <div className=" h-[calc(100vh-64px)]  bg-[url('/color.jpg')]  ">
        {/* <ThreadList /> */}
        <Thread   className="bg-[url('/color.jpg')] " />
      </div>
    </AssistantRuntimeProvider>
  );
};

export default MyApp;
