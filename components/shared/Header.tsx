import Image from "next/image";

export default function Header() {
    return (
        <section className="flex flex-col gap-5 mt-6 md:mt-10">
            <div>
                <Image src="/logo.svg" alt="Hue Logo" width={40} height={40} />
            </div>
            <div className="space-y-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    # Build.
                </h1>
                <p className="text-sm font-light text-(--text-secondary)">
                    Select a palette. Structure your theme
                </p>
            </div>
        </section>
    )
}