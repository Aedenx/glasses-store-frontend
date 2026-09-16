import UtilityBar from "./utility-bar";
import Navbar from "./navbar";

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <UtilityBar />
      <Navbar />
    </div>
  );
}
