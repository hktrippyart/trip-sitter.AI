import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ module: string }>;
};

/** Legacy slide URLs → training hub */
export default async function LegacyTrainingModulePage({ params }: Props) {
  await params;
  redirect("/training");
}
