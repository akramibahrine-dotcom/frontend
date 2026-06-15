import type { Metadata } from "next";
import { ThankYouClient } from "./ThankYouClient";

export const metadata: Metadata = {
  title: "تم استلام طلبك — بيت الصحة",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ orderId: string }> };

export default async function ThankYouPage({ params }: Props) {
  const { orderId } = await params;
  return <ThankYouClient orderId={orderId} />;
}
