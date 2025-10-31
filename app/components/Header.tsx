import { Zap } from "lucide-react";
import { APP_INFO, COST_INFO } from "../constants/text";
import { COMMON_CLASSES, FONTS } from "../constants/styles";

export default function Header() {
  return (
    <header className="text-center mb-8">
      <h1
        className="text-5xl font-bold text-amber-900 mb-2"
        style={FONTS.serif}
      >
        {APP_INFO.title}
      </h1>
      <p className="text-amber-700 text-lg">{APP_INFO.description}</p>
    </header>
  );
}
