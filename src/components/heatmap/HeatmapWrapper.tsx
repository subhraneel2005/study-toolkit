import { getAllDates } from "@/app/actions/getAllDates";
import HeatmapBox from "./Heatmap";

export default async function HeatmapWrapper() {
  const data = await getAllDates();
  return <HeatmapBox data={data} />;
}
