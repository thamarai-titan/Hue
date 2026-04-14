import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa6";

export default function Nav() {
    return (
        <nav className="py-10 px-4 flex items-center justify-end">
            <div className="flex gap-4 items-center">
                <Link
                    className="text-(--text-primary) hover:text-(--accent)"
                    href="https://ilotus.dev"
                >
                    <FaLink size={22} />
                </Link>
                <Link
                    className="text-(--text-primary)"
                    href="https://github.com/thamarai-titan/hue"
                >
                    <FaGithub size={22} />
                </Link>
            </div>
        </nav>
    )
}