import Home from "@/components/home/Home";
import { ScrollProgress } from "@/components/ui/scroll-progress";
export default function page() {
  return (
    <div>
      <ScrollProgress className="top-[65px]" />
      <Home />

    </div>
  );
}
