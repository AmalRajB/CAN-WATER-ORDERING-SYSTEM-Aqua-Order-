import UserGuard from "@/components/UserGuard"

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <UserGuard>
            {children}
        </UserGuard>
    )
}
