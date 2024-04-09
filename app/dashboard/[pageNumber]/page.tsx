import ListPagination from "@/components/common/ListPagination";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { users } from "@/db/schema";
import { like } from "drizzle-orm";
import Link from "next/link";

export default async function Dashboard({
  params,
  searchParams,
}: {
  params: {
    pageNumber: string;
  };
  searchParams: {
    search?: string;
  };
}) {
  console.log({ page: params.pageNumber, search: searchParams?.search ?? "" });

  const searchQuery = searchParams?.search;

  const allUsers = await db.query.users.findMany({
    limit: 10,
    offset: (Number(params.pageNumber) - 1) * 10,
    where: searchQuery ? like(users.name, `%${searchQuery}%`) : undefined,
  });

  return (
    <main>
      <div className="grid grid-cols-3 gap-4">
        {allUsers.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <Link
              className={buttonVariants({ variant: "default" })}
              href={`/users/${user.id}`}
            >
              View profile
            </Link>
          </div>
        ))}
      </div>
      <ListPagination />
    </main>
  );
}
