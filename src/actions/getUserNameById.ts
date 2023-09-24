import prisma from "@/libs/prismadb";

interface IParams {
  userId?: string;
}

export default async function getUserNameById(
  params: IParams
) {
  try {
    const { userId } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    });

    return user?.name;
    
  } catch (error: any) {
    throw new Error(error);
  }
}

