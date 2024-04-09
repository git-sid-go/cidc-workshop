import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";

type Props = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.userId;

  // fetch data
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  return {
    title: `${user?.name}'s profile`,
  };
}

export default async function UserDetails({
  params,
}: {
  params: { userId: string };
}) {
  const userDetails = await db.query.users.findFirst({
    where: eq(users.id, params.userId),
  });

  return (
    <main>
      <h1>{userDetails?.name}</h1>
      <p>{userDetails?.email}</p>
    </main>
  );
}
