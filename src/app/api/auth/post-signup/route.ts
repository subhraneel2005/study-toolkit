import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user?.id) {
    return redirect("/onboarding?error=no_session_after_signup");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true, accountCompleted: true },
    });

    // Check if the user is new (credits are 0 and account not completed)
    if (user && user.credits === 0 && user.accountCompleted === false) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          credits: 300,
          accountCompleted: true, // Mark as completed after initial setup
        },
      });
      //   console.log(`User ${session.user.id} granted 300 initial credits.`);
    } else if (!user) {
      console.error(
        "User not found in Prisma DB after social signup for ID:",
        session.user.id
      );
    } else {
      console.log(
        `User already has credits or account completed, skipping initial grant.`
      );
    }
  } catch (error) {
    console.error("Error in post-signup processing:", error);
    return redirect("/login?error=signup_processing_failed");
  }

  // Redirect the user to the main tools page after credit handling

  return redirect("/tools");
}
